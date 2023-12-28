import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { BlogPage } from './pages'
import { LandingPage } from './pages'
import { AddBlogPage } from './pages'
import { loader as LandingPageLoader } from './pages/LandingPage'
import { action as AddBlogAction } from './pages/AddBlogPage'
import { loader as BlogPageLoader } from './pages/BlogPage'
import { CategoriesProvider } from './contexts/CategoriesContext'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    loader: LandingPageLoader,
  },
  {
    path: '/blog/:id',
    element: <BlogPage />,
    loader: BlogPageLoader,
  },
  {
    path: '/add-blog',
    element: <AddBlogPage />,
    action: AddBlogAction,
  },
])

function App() {
  return (
    <CategoriesProvider>
      <RouterProvider router={router} />
    </CategoriesProvider>
  )
}

export default App
