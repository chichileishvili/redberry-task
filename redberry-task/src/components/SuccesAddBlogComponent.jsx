import greenTick from '../assets/images/green-tick.svg'
import './SuccesLoginComponent.styles.css'
const SuccesAddBlogComponent = ({ handleCloseLoginModal, handleDashboardRedirectModal }) => {
  return (
    <div className='modal'>
      <div className='modal-content'>
        <button className='close-button' onClick={handleCloseLoginModal}>
          &times;
        </button>
        <img src={greenTick} alt='greenTick' className='green-tick' />
        <h2 className='modal-title'> ჩანაწი წარმატებით დაემატა</h2>
        <button className='modal-submit-button' onClick={handleDashboardRedirectModal}>
          მთავარ გვერდზე დაბრუნება
        </button>
      </div>
    </div>
  )
}

export default SuccesAddBlogComponent
