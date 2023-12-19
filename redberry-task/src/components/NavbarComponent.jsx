import RedberryLogo from '../assets/images/redberry-logo.svg'
import './NavBarComponent.styles.css'
const NavBarComponent = () => {
  return (
    <nav className='navbar'>
      <img className='logo' src={RedberryLogo} alt='logo' />
      <button className='nav-button'>შესვლა</button>
    </nav>
  )
}

export default NavBarComponent
