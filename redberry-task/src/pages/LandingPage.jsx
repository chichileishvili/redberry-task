import { customFetch } from '../utils/customFetch'
import { Login, CategoryTitleComponent, BlogPhoto, Navbar, Blogs } from '../components'
import { useContext, useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { CategoriesContext } from '../contexts/CategoriesContext'
import { useLoaderData } from 'react-router-dom'

export const loader = async () => {
  try {
    const blogResponse = await customFetch.get('/blogs')
    return { blogData: blogResponse.data }
  } catch (error) {
    console.error('Error loading blogs:', error)
    return { blogData: [] } // Return an empty array in case of an error
  }
}

const LandingPage = () => {
  const { categories } = useContext(CategoriesContext)
  const { blogData } = useLoaderData()
  const blogs = blogData.data // Assuming this is the correct data structure
  const [selectedCategory, setSelectedCategory] = useState(null)
  const { setIsLoggedIn } = useAuth()

  useEffect(() => {
    const email = localStorage.getItem('email')
    if (email) {
      setIsLoggedIn(true)
    }
  }, [setIsLoggedIn])

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId)
  }

  const filterBlogs = (blogs, categoryId) => {
    if (!Array.isArray(blogs) || !categoryId) return blogs
    return blogs.filter((blog) => blog.categories.some((category) => category.id === categoryId))
  }

  const [showLogin, setShowLogin] = useState(false)
  const handleCloseLoginModal = () => setShowLogin(false)
  const handleOpenLoginModal = () => setShowLogin(true)

  return (
    <div>
      <Navbar handleOpenLoginModal={handleOpenLoginModal} />
      <BlogPhoto />
      {showLogin && <Login handleCloseLoginModal={handleCloseLoginModal} />}
      <CategoryTitleComponent categories={categories} onCategoryChange={handleCategoryChange} />
      <Blogs blogs={filterBlogs(blogs, selectedCategory)} />
    </div>
  )
}

export default LandingPage
