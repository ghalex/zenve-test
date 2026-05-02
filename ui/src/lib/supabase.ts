import { createClient } from '@supabase/supabase-js'
import config, { isSupabaseConfigured } from '@/config'

let supabaseClient: ReturnType<typeof createClient> | null = null

export function getSupabaseBrowserClient() {
  if (!isSupabaseConfigured) {
    return null
  }

  if (!supabaseClient) {
    supabaseClient = createClient(config.supabaseUrl, config.supabasePublishableKey, {
      auth: {
        autoRefreshToken: true,
        detectSessionInUrl: true,
        persistSession: true,
      },
    })
  }

  return supabaseClient
}
