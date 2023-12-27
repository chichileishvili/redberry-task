import './BlogsContainer.styles.css'

const BlogsContainer = ({ blogs }) => {
  console.log(blogs)
  return (
    <div className='blogs-container'>
      {Array.isArray(blogs.data) &&
        blogs.data.map((blog) => (
          <div className='blog-container' key={blog.id}>
            <p className='blog-author'>{blog.author}</p>
            <p className='blog-data'> {blog.publish_data}</p>
            <img src={blog.image} alt='blog-image' />
            <div className='blog-categories-container'>
              {' '}
              {blog.categories.map((category) => {
                return (
                  <p
                    style={{ color: category.text_color, background: category.background_color }}
                    className='blog-category'
                    key={category.id}>
                    {' '}
                    {category.title}{' '}
                  </p>
                )
              })}
              <p className='blog-description'> {blog.description}</p>
            </div>
          </div>
        ))}
    </div>
  )
}

export default BlogsContainer
