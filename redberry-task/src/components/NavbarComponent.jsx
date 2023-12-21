import RedberryLogo from '../assets/images/redberry-logo.svg'
import './NavBarComponent.styles.css'
import { useAuth } from '../contexts/AuthContext'
import { redirect } from 'react-router-dom'

const NavBarComponent = ({ handleOpenLoginModal }) => {
  const { isLoggedIn } = useAuth()

  return (
    <nav className='navbar'>
      <img className='logo' src={RedberryLogo} alt='logo' />
      {isLoggedIn ? (
        <button className='nav-button' onClick={() => redirect('/add-blog')}>
          დაამატე ბლოგი
        </button>
      ) : (
        <button onClick={handleOpenLoginModal} className='nav-button'>
          შესვლა
        </button>
      )}
    </nav>
  )
}

export default NavBarComponent
