import { customFetch } from '../utils/customFetch'
import { Login, CategoryTitleComponent, BlogPhoto, Navbar, Blogs } from '../components'
import { useContext, useState } from 'react'
import { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'

import { CategoriesContext } from '../contexts/CategoriesContext'
import { useLoaderData } from 'react-router-dom'

export const loader = async () => {
  try {
    let blogData

    const blogResponse = await customFetch.get('/blogs')

    blogData = blogResponse.data
    console.log(blogData)

    return { blogData: blogData }
  } catch (error) {
    console.log(error)
    return error
  }
}

const LandingPage = () => {
  const { categories } = useContext(CategoriesContext)
  const { blogData } = useLoaderData()

  const { setIsLoggedIn } = useAuth()

  useEffect(() => {
    const email = localStorage.getItem('email')

    if (email) {
      setIsLoggedIn(true)
    }
  }, [])
  const [showLogin, setShowLogin] = useState(false)
  const handleCloseLoginModal = () => setShowLogin(false)
  const handleOpenLoginModal = () => setShowLogin(true)

  return (
    <div>
      <Navbar handleOpenLoginModal={handleOpenLoginModal} />
      <BlogPhoto />
      {showLogin && <Login handleCloseLoginModal={handleCloseLoginModal} />}
      <CategoryTitleComponent categories={categories} />
      <Blogs blogs={blogData} />
    </div>
  )
}

export default LandingPage
