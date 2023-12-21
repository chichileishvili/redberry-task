import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { BlogPage } from './pages'
import { LandingPage } from './pages'
import { AddBlogPage } from './pages'
import { loader as LandingPageLoader } from './pages/LandingPage'
import { Login } from './components'
import { action as LoginAction } from './components/LoginComponent'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    loader: LandingPageLoader,
  },
  {
    path: '/blog',
    element: <BlogPage />,
  },
  {
    path: '/add-blog',
    element: <AddBlogPage />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
