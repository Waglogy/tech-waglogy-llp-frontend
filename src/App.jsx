import './App.css'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import About from './pages/About'
import Blog from './pages/Blogs'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="about" element={<About />} /> 
        <Route path = "blog" element={<Blog/>}/>

      </Route>
    </Routes>
  )
}

export default App
