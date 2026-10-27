import { createClient as createSupabaseClient, SupabaseClient } from '@supabase/supabase-js';

let cachedClient: SupabaseClient | null = null;

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(
    url &&
    url.startsWith('https://') &&
    !url.includes('placeholder') &&
    key &&
    key.length > 20
  );
}

export function getSupabase(): SupabaseClient {
  if (cachedClient) return cachedClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // Use service role if available on server, otherwise use anon key
  const key =
    (typeof window === 'undefined' ? process.env.SUPABASE_SERVICE_ROLE_KEY : undefined) ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error('Konfigurasi Supabase tidak ditemukan di environment.');
  }

  cachedClient = createSupabaseClient(url, key, {
    auth: {
      persistSession: false,
    },
  });

  return cachedClient;
}
