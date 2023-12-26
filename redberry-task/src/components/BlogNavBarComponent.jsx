import RedberryLogo from '../assets/images/redberry-logo.svg'
import './BlogNavBarComponent.styles.css'

const BlogNavBarComponent = () => {
  return (
    <nav className='blog-navbar'>
      <img className='blog-navbar-logo' src={RedberryLogo} alt='logo' />
    </nav>
  )
}

export default BlogNavBarComponent
