import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { BlogPage } from './pages'
import { LandingPage } from './pages'
import { AddBlogPage } from './pages'
import { loader as LandingPageLoader } from './pages/LandingPage'
import { action as AddBlogAction } from './pages/AddBlogPage'
import { CategoriesProvider } from './contexts/CategoriesContext'

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
