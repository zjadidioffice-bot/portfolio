import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import About from "./pages/About"
import Projects from "./pages/Projects"
import Articles from "./pages/Articles"
import Contact from "./pages/Contact"
import MainLayout from './layouts/MainLayout'
import ArticleDetails from './pages/ArticleDetails'
import ArticlesManagement from './admin/ArticlesManagement'
import ProjectManagement from './admin/ProjectManagement'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* صفحات عمومی سایت */}
        <Route
          path='/' element=
          {
            <MainLayout>
              <Home />
            </MainLayout>
          }
        >
        </Route>
        <Route
          path='/about' element=
          {
            <MainLayout>
              <About />
            </MainLayout>
          }
        >
        </Route>
        <Route
          path='/projects' element=
          {
            <MainLayout>
              <Projects />
            </MainLayout>
          }
        >
        </Route>
        <Route
          path='/articles' element=
          {
            <MainLayout>
              <Articles />
            </MainLayout>
          }
        >
        </Route>
        <Route
          path='/articles/:id' element=
          {
            <MainLayout>
              <ArticleDetails />
            </MainLayout>
          }
        >
        </Route>
        <Route
          path='/contact' element=
          {
            <MainLayout>
              <Contact />
            </MainLayout>
          }
        >
        </Route>
        {/* صفحات مدیریت */}
        <Route
          path="/admin/articles"
          element={<ArticlesManagement />}
        />
        <Route
          path="/admin/projects"
          element={<ProjectManagement />}
        />
      </Routes>


    </BrowserRouter>

  );
}

export default App
