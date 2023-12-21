import { Navbar, SuccesLogin } from '../components'
import { BlogPhoto } from '../components'
import customFetch from '../utils/customFetch'
import { Login } from '../components'
import { useState } from 'react'
import { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'

export const loader = async () => {
  try {
    const token = await customFetch.get('/token')

    const data = await customFetch.get('/blogs', token.data.token)
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
    return error
  }
}

const LandingPage = () => {
  const { setIsLoggedIn } = useAuth()
  useEffect(() => {
    const sessionToken = localStorage.getItem('token')
    console.log(sessionToken)

    if (sessionToken) {
      setIsLoggedIn(true)
    }
  }, [])
  const [showLogin, setShowLogin] = useState(false)
  console.log(showLogin)
  const handleCloseLoginModal = () => setShowLogin(false)
  const handleOpenLoginModal = () => setShowLogin(true)

  return (
    <div>
      <Navbar handleOpenLoginModal={handleOpenLoginModal} />
      <BlogPhoto />
      {showLogin && <Login handleCloseLoginModal={handleCloseLoginModal} />}

      <h1>landing page</h1>
    </div>
  )
}

export default LandingPage
