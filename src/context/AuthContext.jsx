import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { supabase, isSupabaseReady } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadProfile = useCallback(async (currentUser) => {
    if (!currentUser || !supabase) {
      setProfile(null)
      return
    }
    const { data } = await supabase
      .from('profiles')
      .select('id, full_name, role, avatar_url')
      .eq('id', currentUser.id)
      .single()
    setProfile(
      data ?? {
        id: currentUser.id,
        full_name: currentUser.user_metadata?.full_name ?? '',
        role: 'user',
        avatar_url: null,
      }
    )
  }, [])

  useEffect(() => {
    if (!isSupabaseReady) {
      setLoading(false)
      return
    }
    let active = true

    supabase.auth.getSession().then(async ({ data }) => {
      if (!active) return
      const sessionUser = data.session?.user ?? null
      setUser(sessionUser)
      await loadProfile(sessionUser)
      setLoading(false)
    })

    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const sessionUser = session?.user ?? null
      setUser(sessionUser)
      await loadProfile(sessionUser)
    })

    return () => {
      active = false
      sub.subscription.unsubscribe()
    }
  }, [loadProfile])

  const value = useMemo(
    () => ({
      user,
      profile,
      loading,
      isSupabaseReady,
      isAdmin: profile?.role === 'admin',
      displayName: profile?.full_name || user?.email?.split('@')[0] || 'Guest',
      email: user?.email ?? '',

      async signUp({ email, password, fullName }) {
        if (!supabase) return { error: notConfigured() }
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } },
        })
        return { data, error }
      },

      async signIn({ email, password }) {
        if (!supabase) return { error: notConfigured() }
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        return { data, error }
      },

      async signOut() {
        if (!supabase) return
        await supabase.auth.signOut()
        setUser(null)
        setProfile(null)
      },

      async resetPassword(email) {
        if (!supabase) return { error: notConfigured() }
        return supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        })
      },

      async updatePassword(password) {
        if (!supabase) return { error: notConfigured() }
        return supabase.auth.updateUser({ password })
      },

      async updateEmail(email) {
        if (!supabase) return { error: notConfigured() }
        return supabase.auth.updateUser({ email })
      },
    }),
    [user, profile, loading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function notConfigured() {
  return {
    message:
      'Authentication is not configured yet. Add your Supabase keys to .env to enable accounts.',
  }
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
