const config = {
  appName: import.meta.env.VITE_APP_NAME || 'Zenve UI',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '',
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
  supabasePublishableKey:
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || '',
}

export const isSupabaseConfigured = Boolean(config.supabaseUrl && config.supabasePublishableKey)

export default config
