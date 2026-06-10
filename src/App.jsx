import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import PublicLayout from './components/layout/PublicLayout'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Loader from './components/ui/Loader'

// Import thunks kept in a map so we can prefetch them on idle.
const load = {
  home: () => import('./pages/Home'),
  about: () => import('./pages/About'),
  services: () => import('./pages/Services'),
  portfolio: () => import('./pages/Portfolio'),
  project: () => import('./pages/ProjectDetail'),
  testimonials: () => import('./pages/Testimonials'),
  blog: () => import('./pages/Blog'),
  blogPost: () => import('./pages/BlogPost'),
  contact: () => import('./pages/Contact'),
}

// Public pages
const Home = lazy(load.home)
const About = lazy(load.about)
const Services = lazy(load.services)
const Portfolio = lazy(load.portfolio)
const ProjectDetail = lazy(load.project)
const Testimonials = lazy(load.testimonials)
const Blog = lazy(load.blog)
const BlogPost = lazy(load.blogPost)
const Contact = lazy(load.contact)
const NotFound = lazy(() => import('./pages/NotFound'))

// Auth
const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'))
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword'))

// Dashboards
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'))
const Admin = lazy(() => import('./pages/admin/Admin'))

export default function App() {
  // Once the browser is idle after first paint, warm every public page chunk
  // so in-app navigation is instant (no network wait on first visit).
  useEffect(() => {
    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 200))
    const cancel = window.cancelIdleCallback || clearTimeout
    const id = idle(() => Object.values(load).forEach((fn) => fn()))
    return () => cancel(id)
  }, [])

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="portfolio/:slug" element={<ProjectDetail />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute requireAdmin>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}
