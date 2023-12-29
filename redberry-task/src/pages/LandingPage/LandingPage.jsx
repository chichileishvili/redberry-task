import { customFetch } from '../../utils/customFetch'
import { Login, CategoryTitleComponent, BlogPhoto, Navbar, Blogs } from '../../components'
import { useContext, useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { CategoriesContext } from '../../contexts/CategoriesContext'
import { useLoaderData } from 'react-router-dom'

export const loader = async () => {
  try {
    const blogResponse = await customFetch.get('/blogs')
    return { blogData: blogResponse.data }
  } catch (error) {
    console.error('Error loading blogs:', error)
    return { blogData: [] }
  }
}

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false)
  const { categories } = useContext(CategoriesContext)
  const { blogData } = useLoaderData()
  const [selectedCategory, setSelectedCategory] = useState(null)
  const { setIsLoggedIn } = useAuth()

  useEffect(() => {
    const email = localStorage.getItem('email')
    const storedCategoryId = localStorage.getItem('selectedCategoryId')

    if (storedCategoryId) {
      setSelectedCategory(parseInt(storedCategoryId, 10))
    }
    if (email) {
      setIsLoggedIn(true)
    }
  }, [setIsLoggedIn])

  const handleCategoryChange = (categoryId) => {
    const storedCategoryId = localStorage.getItem('selectedCategoryId')

    if (storedCategoryId && storedCategoryId === categoryId.toString()) {
      localStorage.removeItem('selectedCategoryId')
      setSelectedCategory(null)
    } else {
      localStorage.setItem('selectedCategoryId', categoryId)
      setSelectedCategory(categoryId)
    }
  }

  const filterBlogs = (blogs, categoryId) => {
    if (!Array.isArray(blogs) || !categoryId) return blogs
    return blogs.filter((blog) => blog.categories.some((category) => category.id === categoryId))
  }

  const handleCloseLoginModal = () => setShowLogin(false)

  const handleOpenLoginModal = () => setShowLogin(true)

  return (
    <div>
      <Navbar handleOpenLoginModal={handleOpenLoginModal} />
      <BlogPhoto />
      {showLogin && <Login handleCloseLoginModal={handleCloseLoginModal} />}
      <CategoryTitleComponent categories={categories} onCategoryChange={handleCategoryChange} />
      <Blogs blogs={filterBlogs(blogData.data, selectedCategory)} />
    </div>
  )
}

export default LandingPage
