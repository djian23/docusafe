import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL || typeof SUPABASE_URL !== 'string') {
  throw new Error(
    'VITE_SUPABASE_URL is missing. Check your .env file.'
  );
}

if (!SUPABASE_PUBLISHABLE_KEY || typeof SUPABASE_PUBLISHABLE_KEY !== 'string') {
  throw new Error(
    'VITE_SUPABASE_PUBLISHABLE_KEY is missing. Check your .env file.'
  );
}

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});

/**
 * Lightweight health check: pings the Supabase REST endpoint.
 * Does NOT consume auth rate limits.
 */
export async function checkSupabaseConnection(): Promise<boolean> {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/`, {
      method: 'HEAD',
      headers: { apikey: SUPABASE_PUBLISHABLE_KEY },
    });
    return response.ok;
  } catch {
    return false;
  }
}