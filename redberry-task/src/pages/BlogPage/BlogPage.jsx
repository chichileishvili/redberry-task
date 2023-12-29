import { Link, useLoaderData } from 'react-router-dom'
import { customFetch } from '../../utils/customFetch'
import { useAuth } from '../../contexts/AuthContext'
import { useEffect, useState } from 'react'
import './BlogPage.styles.css'
import { Navbar } from '../../components'
import LeftArror from '../../assets/images/leftArrow.svg'
import BlogLeftArrow from '../../assets/images/blog-left-arrow.svg'
import BlogRightArrow from '../../assets/images/blog-right-arrow.svg'
import LinkArrow from '../../assets/images/link-arrow.svg'

export const loader = async ({ params }) => {
  console.log(params)
  const { data } = await customFetch.get(`/blogs/${params.id}`)
  const blogData = await customFetch.get('/blogs')
  try {
    return { data: data, blogData: blogData }
  } catch (error) {
    return error
  }
}

const BlogPage = () => {
  const { data, blogData } = useLoaderData()
  console.log(data.categories.map((category) => category.id))
  const { setIsLoggedIn } = useAuth()
  const [currentIndex, setCurrentIndex] = useState(0)
  const blogsPerSlide = 3
  console.log('current index', currentIndex)
  const filterRelatedBlogs = (currentBlog, allBlogs) => {
    if (!currentBlog.categories || !Array.isArray(allBlogs.data)) return []

    const currentBlogCategoryIds = new Set(currentBlog.categories.map((cat) => cat.id))
    return allBlogs.data.filter(
      (blog) =>
        blog.id !== currentBlog.id && // Exclude the current blog
        blog.categories.some((category) => currentBlogCategoryIds.has(category.id))
    )
  }
  const filtered = filterRelatedBlogs(data, blogData.data)
  const currentFilteredBlogs = filtered.slice(currentIndex, currentIndex + blogsPerSlide)

  useEffect(() => {
    const email = localStorage.getItem('email')
    if (email) {
      setIsLoggedIn(true)
    }
  }, [setIsLoggedIn])

  const sliderStyle = {
    transform: `translateX(-${(100 / blogsPerSlide) * currentIndex}%)`,
  }
  const goToNextSlide = () => {
    if (currentIndex < filtered.length - blogsPerSlide) {
      setCurrentIndex(currentIndex + blogsPerSlide)
    }
  }

  const goToPreviousSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - blogsPerSlide)
    }
  }

  return (
    <div>
      <Navbar />
      <div className='blogPage-parrent-container'>
        <Link to='/'>
          <img src={LeftArror} alt='ToTheLandingPage Arrow' className='blogPage-back-link' />
        </Link>

        <div className='blogPage-container'>
          <img src={data.image} alt='blogPage-image' className='blogPage-image' />
          <p className='blogPage-author'> {data.author}</p>

          <p className='blogPage-publish-date'>
            {data.publish_date} • {data.email}
          </p>

          <h2 className='blogPage-title'>{data.title}</h2>
          <div className='blogPage-categories-container'>
            {data.categories.map((category) => (
              <p
                style={{ color: category.text_color, background: category.background_color }}
                className='blogPage-category'
                key={category.id}>
                {category.title}
              </p>
            ))}
          </div>
          <p className='blogPage-description'>{data.description}</p>
        </div>
      </div>
      <div className='related-blogs-container'>
        <div className='related-blogs-title-container'>
          <h2>მსგავსი სტატიები</h2>
          <div>
            <img
              src={BlogLeftArrow}
              alt='RelatedBlogLeftArrow'
              className='related-blog-left-arrow'
              onClick={goToPreviousSlide}
            />
            <img
              src={BlogRightArrow}
              alt='RelatedBlogRightArrow'
              className='related-blog-right-arrow'
              onClick={goToNextSlide}
            />
          </div>
        </div>
        <div className='blogs-blogPage-container'>
          {Array.isArray(currentFilteredBlogs) &&
            currentFilteredBlogs.map((blog) => (
              <div className='blog-blogPage-container' key={blog.id}>
                <img src={blog.image} alt='blog-landingPage-image' />
                <div>
                  <p className='blog-landingPage-author'>{blog.author}</p>
                  <p className='blog-landingPage-date'> {blog.publish_date}</p>
                </div>
                <h2 className='blog-landingPage-title'>{blog.title}</h2>
                <div className='blog-categories-container'>
                  {blog.categories.map((category) => (
                    <p
                      style={{
                        color: category.text_color,
                        background: category.background_color,
                      }}
                      className='blog-category'
                      key={category.id}>
                      {category.title}
                    </p>
                  ))}
                </div>
                <div>
                  <p className='landingPage-description-blog'>{blog.description}</p>
                </div>
                <Link to={`/blog/${blog.id}`} className='blog-landingPage-link'>
                  იხილეთ ვრცლად
                  <img src={LinkArrow} alt='link-arrow' className='blog-landingPage-link-arrow' />
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default BlogPage
