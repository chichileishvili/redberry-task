import { Link } from 'react-router-dom'
import './BlogsContainer.styles.css'
import LinkArrow from '../assets/images/link-arrow.svg'

const BlogsContainer = ({ blogs }) => {
  return (
    <div className='blogs-container'>
      {Array.isArray(blogs) &&
        blogs.map((blog) => (
          <div className='blog-container' key={blog.id}>
            <img src={blog.image} alt='blog-landingPage-image' />
            <div>
              <p className='blog-landingPage-author'>{blog.author}</p>
              <p className='blog-landingPage-date'> {blog.publish_date}</p>
            </div>
            <h2 className='blog-landingPage-title'>{blog.title}</h2>
            <div className='blog-categories-container'>
              {blog.categories.map((category) => (
                <p
                  style={{ color: category.text_color, background: category.background_color }}
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
  )
}

export default BlogsContainer
