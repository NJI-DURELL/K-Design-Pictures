import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

/**
 * When credentials are absent (local preview before Supabase is wired up),
 * `supabase` is null and the app falls back to bundled sample content.
 * `isSupabaseReady` lets components branch cleanly without throwing.
 */
export const isSupabaseReady = Boolean(url && anonKey)

export const supabase = isSupabaseReady
  ? createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null

if (!isSupabaseReady && import.meta.env.DEV) {
  // eslint-disable-next-line no-console
  console.info(
    '[K-Design] Supabase env vars not set — running on bundled sample content. ' +
      'Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env to go live.'
  )
}
