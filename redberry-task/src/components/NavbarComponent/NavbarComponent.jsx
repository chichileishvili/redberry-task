import RedberryLogo from '../../assets/images/redberry-logo.svg'
import './NavBarComponent.styles.css'
import { useAuth } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'

const NavBarComponent = ({ handleOpenLoginModal }) => {
  const { isLoggedIn } = useAuth()

  console.log(isLoggedIn)

  return (
    <nav className='navbar'>
      <img className='logo' src={RedberryLogo} alt='logo' />
      {isLoggedIn ? (
        <Link to='/add-blog' className='nav-button'>
          დაამატე ბლოგი
        </Link>
      ) : (
        <button onClick={handleOpenLoginModal} className='nav-button'>
          შესვლა
        </button>
      )}
    </nav>
  )
}

export default NavBarComponent
