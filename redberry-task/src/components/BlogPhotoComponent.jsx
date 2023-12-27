import blogPhoto from '../assets/images/blogPhoto.svg'
import './BlogPhotoComponent.styles.css'

const BlogPhotoComponent = () => {
  return (
    <div className='photo-blog-container'>
      <h1 className='blog-title'>ბლოგი</h1>

      <img src={blogPhoto} alt='blogPhoto' className='blog-svg' />
    </div>
  )
}

export default BlogPhotoComponent
