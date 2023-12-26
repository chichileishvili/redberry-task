import React, { useEffect, useState } from 'react'
import './LoginComponent.styles.css'
import { SuccesLogin } from '.'
import {customFetch} from '../utils/customFetch'
import errorSign from '../assets/images/error-sign.svg'
import { useAuth } from '../contexts/AuthContext'

const LoginComponent = ({ handleCloseLoginModal }) => {
  const { isLoggedIn, setIsLoggedIn } = useAuth()
  const [errors, setErrors] = useState({ msg: '' })

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    try {
      const response = await customFetch.post('/login', data)

      if (response.status === 204) {
        localStorage.setItem('email', data.email)

        setIsLoggedIn(true)
      } else {
        setErrors({ ...errors, msg: response.message })
      }
    } catch (error) {
      console.error(error)
      setErrors({ ...errors, msg: 'ელ-ფოსტა არ მოიძებნა' })
    }
  }

  if (isLoggedIn) {
    return <SuccesLogin handleCloseLoginModal={handleCloseLoginModal} />
  }

  return (
    <div className='modal'>
      <form className='modal-content' method='post' onSubmit={handleSubmit}>
        <button type='button' className='close-button' onClick={handleCloseLoginModal}>
          &times;
        </button>
        <h2 className='modal-title'>შესვლა</h2>
        <label htmlFor='email-input' className='input-label'>
          ელ-ფოსტა
        </label>
        <input
          type='email'
          id='email-input'
          placeholder='Example@redberry.ge'
          className={errors.msg === '' ? 'modal-email-input' : 'modal-input-error'}
          name='email'
        />
        {errors.msg && (
          <div className='error-container'>
            <img src={errorSign} alt='errorSign' className='error-sign' />
            <p className='error'>{errors.msg}</p>
          </div>
        )}
        <button
          type='submit'
          className='modal-submit-button'
          onClick={() => isLoggedIn && handleCloseLoginModal()}>
          შესვლა
        </button>
      </form>
    </div>
  )
}

export default LoginComponent
