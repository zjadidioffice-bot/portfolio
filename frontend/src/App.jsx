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
import MessagesManagement from './admin/MessagesManagement'
import AdminLogin from './admin/AdminLogin'
import AdminRoute from './admin/AdminRoute'
import AdminLayout from './admin/AdminLayout'
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
          path='/articles/:slug' element=
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
          path="/admin/login"
          element={<AdminLogin />}
        />
        <Route
          path="/admin/articles"
          element={
            <AdminRoute>
              <AdminLayout>
                <ArticlesManagement />
              </AdminLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/projects"
          element={
            <AdminRoute>
              <AdminLayout>
                <ProjectManagement />
              </AdminLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/messages"
          element={
            <AdminRoute>
              <AdminLayout>
                <MessagesManagement />
              </AdminLayout>
            </AdminRoute>
          }
        />
      </Routes>


    </BrowserRouter>

  );
}

export default App
