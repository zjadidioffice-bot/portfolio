import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import About from "./pages/About"
import Projects from "./pages/Projects"
import Articles from "./pages/Articles"
import Contact from "./pages/Contact"
import MainLayout from './layouts/MainLayout'
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Navbar />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/about' element={<About />}></Route>
          <Route path='/projects' element={<Projects />}></Route>
          <Route path='/articles' element={<Articles />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
        </Routes>

      </MainLayout>

    </BrowserRouter>

  );
}

export default App
