import './App.css'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import About from './pages/About'
import Blog from './pages/Blogs'
import Projects from './pages/Projects'
import Services from './pages/Services'
import Pricing from './pages/Pricing'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsConditions from './pages/TermsConditions'


function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="about" element={<About />} /> 
        <Route path = "blog" element={<Blog/>}/>
        <Route path = "projects" element={<Projects/>}/>
        <Route path = "services" element={<Services/>}/>
        <Route path = "contact" element={<Contact/>}/>
        <Route path = "pricing" element={<Pricing/>}/>
        <Route path = "privacy-policy" element={<PrivacyPolicy/>}/>
        <Route path = "terms-conditions" element={<TermsConditions/>}/>
      </Route>
    </Routes>
  )
}

export default App
