// ==============================================================================
// TELEMETRY COCKPIT — ENTERPRISE SECURITY & SESSION ENGINE
// Compatible with both Edge Runtime (Middleware) and Node.js
// ==============================================================================

const SECRET =
  process.env.ADMIN_SESSION_SECRET ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  'sahal-portfolio-telemetry-cockpit-secret-2026';

const encoder = new TextEncoder();

async function getCryptoKey(): Promise<CryptoKey> {
  return await crypto.subtle.importKey(
    'raw',
    encoder.encode(SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Creates a cryptographically signed HMAC-SHA256 session token.
 * Default TTL: 2 hours (7200 seconds).
 */
export async function createSessionToken(ttlSeconds: number = 7200): Promise<string> {
  const issuedAt = Date.now();
  const expiresAt = issuedAt + ttlSeconds * 1000;
  const payload = `${issuedAt}.${expiresAt}`;

  const key = await getCryptoKey();
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  const signatureHex = bufferToHex(signatureBuffer);

  return `${payload}.${signatureHex}`;
}

/**
 * Verifies the integrity, signature, and expiration of the session token.
 */
export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;

  const parts = token.split('.');
  if (parts.length !== 3) return false;

  const [issuedAtStr, expiresAtStr, signatureHex] = parts;
  const payload = `${issuedAtStr}.${expiresAtStr}`;
  const expiresAt = parseInt(expiresAtStr, 10);

  if (isNaN(expiresAt) || Date.now() > expiresAt) {
    return false;
  }

  try {
    const key = await getCryptoKey();
    const expectedBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
    const expectedHex = bufferToHex(expectedBuffer);

    if (signatureHex.length !== expectedHex.length) return false;

    // Constant-time string comparison to prevent timing attacks
    let mismatch = 0;
    for (let i = 0; i < signatureHex.length; i++) {
      mismatch |= signatureHex.charCodeAt(i) ^ expectedHex.charCodeAt(i);
    }
    return mismatch === 0;
  } catch {
    return false;
  }
}

// In-memory rate limiting map for brute-force defense
interface RateLimitRecord {
  attempts: number;
  lockUntil: number;
  lastAttempt: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

export function checkRateLimit(ip: string): {
  allowed: boolean;
  remainingAttempts: number;
  lockoutSeconds: number;
} {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    return { allowed: true, remainingAttempts: 5, lockoutSeconds: 0 };
  }

  if (record.lockUntil > now) {
    return {
      allowed: false,
      remainingAttempts: 0,
      lockoutSeconds: Math.ceil((record.lockUntil - now) / 1000),
    };
  }

  if (now - record.lastAttempt > 15 * 60 * 1000) {
    rateLimitMap.delete(ip);
    return { allowed: true, remainingAttempts: 5, lockoutSeconds: 0 };
  }

  const remaining = Math.max(0, 5 - record.attempts);
  return { allowed: remaining > 0, remainingAttempts: remaining, lockoutSeconds: 0 };
}

export function recordFailedAttempt(ip: string): {
  isLocked: boolean;
  remainingAttempts: number;
  lockoutSeconds: number;
} {
  const now = Date.now();
  const record = rateLimitMap.get(ip) || { attempts: 0, lockUntil: 0, lastAttempt: now };

  record.attempts += 1;
  record.lastAttempt = now;

  if (record.attempts >= 5) {
    record.lockUntil = now + 15 * 60 * 1000; // 15-minute lockout
    rateLimitMap.set(ip, record);
    return { isLocked: true, remainingAttempts: 0, lockoutSeconds: 15 * 60 };
  }

  rateLimitMap.set(ip, record);
  return { isLocked: false, remainingAttempts: 5 - record.attempts, lockoutSeconds: 0 };
}

export function resetRateLimit(ip: string): void {
  rateLimitMap.delete(ip);
}
