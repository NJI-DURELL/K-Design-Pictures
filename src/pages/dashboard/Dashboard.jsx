import { Routes, Route } from 'react-router-dom'
import { LayoutDashboard, Bookmark, Bell, Shield } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import DashboardShell from '../../components/dashboard/DashboardShell'
import Profile from './Profile'
import Saved from './Saved'
import Notifications from './Notifications'
import Security from './Security'

const NAV = [
  { to: '/dashboard', label: 'Profile', icon: LayoutDashboard, end: true },
  { to: '/dashboard/saved', label: 'Saved projects', icon: Bookmark },
  { to: '/dashboard/notifications', label: 'Notifications', icon: Bell },
  { to: '/dashboard/security', label: 'Security', icon: Shield },
]

export default function Dashboard() {
  return (
    <>
      <Helmet>
        <title>Dashboard — K-Design Pictures</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Routes>
        <Route element={<DashboardShell nav={NAV} label="Your account" />}>
          <Route index element={<Profile />} />
          <Route path="saved" element={<Saved />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="security" element={<Security />} />
        </Route>
      </Routes>
    </>
  )
}
