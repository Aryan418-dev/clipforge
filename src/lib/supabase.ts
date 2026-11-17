export type WaitlistEntry = {
  id?: string;
  name: string;
  email: string;
  platform: string;
  niche: string;
  monthly_volume: string;
  biggest_challenge: string;
  consent: boolean;
  created_at?: string;
  source?: string;
};

/** Returns a Supabase client when env vars are set; otherwise null. */
export async function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  if (!supabaseUrl || !supabaseAnonKey) return null;

  try {
    const { createClient } = await import("@supabase/supabase-js");
    return createClient(supabaseUrl, supabaseAnonKey);
  } catch {
    return null;
  }
}
