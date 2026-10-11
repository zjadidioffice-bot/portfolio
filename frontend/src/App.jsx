import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import About from "./pages/About"
import Projects from "./pages/Projects"
import Articles from "./pages/Articles"
import Contact from "./pages/Contact"
import MainLayout from './layouts/MainLayout'
import ArticleDetails from './pages/ArticleDetails'
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/about' element={<About />}></Route>
          <Route path='/projects' element={<Projects />}></Route>
          <Route path='/articles' element={<Articles />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/article/:id' element={<ArticleDetails/>}/>
        </Routes>

      </MainLayout>

    </BrowserRouter>

  );
}

export default App
