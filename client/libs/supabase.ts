import { createClient } from "@supabase/supabase-js"

type SUPABASE_URL = string
type SUPABASE_ANON_KEY = string

export function createSupabaseClient(url: SUPABASE_URL, anon_key: SUPABASE_ANON_KEY) {
  return createClient(url, anon_key)
}
