import './App.css'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import About from './pages/About'
import Blog from './pages/Blogs'
import BlogDetail from './pages/BlogDetail'
import Projects from './pages/Projects'
import Services from './pages/Services'
import Pricing from './pages/Pricing'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsConditions from './pages/TermsConditions'
import NotFound from './pages/NotFound'
import ProjectDetailContainer from './pages/ProjectDetailContainer'

// Admin Imports
import AdminLogin from './admin/Login'
import AdminLayout from './admin/components/AdminLayout'
import Dashboard from './admin/pages/Dashboard'
import AdminContacts from './admin/pages/Contacts'
import Queries from './admin/pages/Queries'
import Clients from './admin/pages/Clients'
import Payments from './admin/pages/Payments'
import AdminBlogs from './admin/pages/Blogs'


function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="about" element={<About />} />
        <Route path="blog" element={<Blog />} />
        {/* Blog Detail Moved Outside */}
        <Route path="projects" element={<Projects />} />
        <Route path="services" element={<Services />} />
        <Route path="contact" element={<Contact />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms-conditions" element={<TermsConditions />} />
      </Route>

      {/* Detail Pages (No Navbar/Footer) */}
      <Route path="/projects/:id" element={<ProjectDetailContainer />} />
      <Route path="/blog/:slug" element={<BlogDetail />} />

      {/* Admin Routes */}
      <Route path="admin/login" element={<AdminLogin />} />
      <Route path="admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="contacts" element={<AdminContacts />} />
        <Route path="queries" element={<Queries />} />
        <Route path="clients" element={<Clients />} />
        <Route path="payments" element={<Payments />} />
        <Route path="blogs" element={<AdminBlogs />} />
      </Route>

      {/* 404 - Catch all unmatched routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
