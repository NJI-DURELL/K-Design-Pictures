import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  LayoutGrid,
  Film,
  Image,
  Quote,
  Users2,
  Wrench,
  Newspaper,
  UserCog,
} from 'lucide-react'
import DashboardShell from '../../components/dashboard/DashboardShell'
import Overview from './Overview'
import AdminProjects from './AdminProjects'
import AdminMedia from './AdminMedia'
import AdminTestimonials from './AdminTestimonials'
import AdminTeam from './AdminTeam'
import AdminServices from './AdminServices'
import AdminPosts from './AdminPosts'
import AdminUsers from './AdminUsers'

const NAV = [
  { to: '/admin', label: 'Overview', icon: LayoutGrid, end: true },
  { to: '/admin/projects', label: 'Projects', icon: Film },
  { to: '/admin/media', label: 'Media', icon: Image },
  { to: '/admin/testimonials', label: 'Testimonials', icon: Quote },
  { to: '/admin/team', label: 'Team', icon: Users2 },
  { to: '/admin/services', label: 'Services', icon: Wrench },
  { to: '/admin/blog', label: 'Journal', icon: Newspaper },
  { to: '/admin/users', label: 'Users', icon: UserCog },
]

export default function Admin() {
  return (
    <>
      <Helmet>
        <title>Admin Console | K-Design Pictures</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Routes>
        <Route element={<DashboardShell nav={NAV} label="Admin console" />}>
          <Route index element={<Overview />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="media" element={<AdminMedia />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="team" element={<AdminTeam />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="blog" element={<AdminPosts />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Routes>
    </>
  )
}
