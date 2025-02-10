type SUPABASE_URL = string
type SUPABASE_ANON_KEY = string

export function useSupabase(url: SUPABASE_URL, anon_key: SUPABASE_ANON_KEY) {
  return {
    url,
    anon_key
  }
}
