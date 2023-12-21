import greenTick from '../assets/images/green-tick.svg'
import './SuccesLoginComponent.styles.css'

const SuccesLoginComponent = ({ handleCloseLoginModal }) => {
  return (
    <div className='modal'>
      <div className='modal-content'>
        <button className='close-button' onClick={handleCloseLoginModal}>
          &times;
        </button>
        <img src={greenTick} alt='greenTick' className='green-tick' />
        <h2 className='modal-title'>წარმატებული ავტორიზაცია</h2>
        <button className='submit-button' onClick={handleCloseLoginModal}>
          კარგი
        </button>
      </div>
    </div>
  )
}

export default SuccesLoginComponent
