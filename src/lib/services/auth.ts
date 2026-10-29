let customPin: string | null = null;

export function getActivePin(): string {
  return customPin || process.env.ADMIN_PIN || '271026';
}

export function setActivePin(newPin: string): void {
  customPin = newPin;
}

export async function verifyAdminPin(enteredPin: string): Promise<boolean> {
  const clean = enteredPin.trim();
  const target = getActivePin();

  if (clean.length !== target.length) {
    return false;
  }

  // Constant-time comparison to prevent timing attacks
  let mismatch = 0;
  for (let i = 0; i < clean.length; i++) {
    mismatch |= clean.charCodeAt(i) ^ target.charCodeAt(i);
  }

  return mismatch === 0;
}

export async function changeAdminPin(
  oldPin: string,
  newPin: string
): Promise<{ success: boolean; message: string }> {
  const isValidOld = await verifyAdminPin(oldPin);
  if (!isValidOld) {
    return { success: false, message: 'PIN lama yang Anda masukkan salah.' };
  }

  if (!/^\d{4,8}$/.test(newPin)) {
    return { success: false, message: 'PIN baru harus berupa 4 hingga 8 digit angka.' };
  }

  setActivePin(newPin);
  return { success: true, message: 'PIN admin berhasil diperbarui.' };
}

export function getDefaultPinHint(): string | null {
  // Only reveal default hint in development mode for safety
  if (process.env.NODE_ENV === 'development') {
    return getActivePin();
  }
  return null;
}
