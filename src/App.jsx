import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import PublicLayout from './components/layout/PublicLayout'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Loader from './components/ui/Loader'

// Public pages
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const Testimonials = lazy(() => import('./pages/Testimonials'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Contact = lazy(() => import('./pages/Contact'))
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
