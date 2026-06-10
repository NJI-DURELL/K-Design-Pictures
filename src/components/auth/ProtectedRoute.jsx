import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Loader from '../ui/Loader'

/**
 * Gate for authenticated areas. `requireAdmin` additionally checks the role.
 * Role-based routing: users land on /dashboard, admins on /admin, both from
 * the same login page.
 */
export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { user, isAdmin, loading, isSupabaseReady } = useAuth()
  const location = useLocation()

  if (loading) return <Loader />

  // Allow previewing the dashboards before Supabase is wired up.
  if (!isSupabaseReady) return children

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}
