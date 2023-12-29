import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import React, { Suspense } from 'react'
import { loader as LandingPageLoader } from './pages/LandingPage/LandingPage'
import { action as AddBlogAction } from './pages/AddBlogPage/AddBlogPage'
import { loader as BlogPageLoader } from './pages/BlogPage/BlogPage'
import { CategoriesProvider } from './contexts/CategoriesContext'

const LandingPage = React.lazy(() => import('./pages/LandingPage/LandingPage'))
const BlogPage = React.lazy(() => import('./pages/BlogPage/BlogPage'))
const AddBlogPage = React.lazy(() => import('./pages/AddBlogPage/AddBlogPage'))

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LandingPage />
      </Suspense>
    ),
    loader: LandingPageLoader,
  },
  {
    path: '/blog/:id',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <BlogPage />
      </Suspense>
    ),
    loader: BlogPageLoader,
  },
  {
    path: '/add-blog',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <AddBlogPage />
      </Suspense>
    ),
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
