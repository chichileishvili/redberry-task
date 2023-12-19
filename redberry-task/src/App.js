import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { BlogPage } from './pages'
import { LandingPage } from './pages'
import { AddBlogPage } from './pages'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
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
