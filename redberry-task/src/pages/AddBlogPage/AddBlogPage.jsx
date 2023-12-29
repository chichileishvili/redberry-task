import { Form, Link, useActionData, useNavigate } from 'react-router-dom'
import { customFetch } from '../../utils/customFetch'
import { BlogNavbar, SuccesAddBlog } from '../../components'
import LeftArror from '../../assets/images/leftArrow.svg'
import { CategoriesContext } from '../../contexts/CategoriesContext'
import { useContext } from 'react'
import './AddBlogPage.styles.css'
import { useState, useEffect } from 'react'
import DropdownImg from '../../assets/images/dropdown.svg'
import FolderAdd from '../../assets/images/folder-add.svg'
import IMGicon from '../../assets/images/img-icon.svg'

export const action = async ({ request }) => {
  const formData = await request.formData()

  console.log(formData)

  try {
    await customFetch.post('/blogs', formData, {
      'Content-Type': 'multipart/form-data',
    })
    return { success: true }
  } catch (error) {
    console.log(error)
    return { success: false, error: error }
  }
}

const AddBlogPage = () => {
  const { categories } = useContext(CategoriesContext)
  const [dropdown, setDropdown] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState([])
  const [fileName, setFileName] = useState('')
  const [succesPopup, setSuccesPopup] = useState(false)
  const [hasStartedTypingAuthor, setHasStartedTypingAuthor] = useState(false)
  const [hasStartedTypingTitle, setHasStartedTypingTitle] = useState(false)
  const [hasStartedTypingDescription, setHasStartedTypingDescription] = useState(false)
  const [hasStartedTypingEmail, setHasStartedTypingEmail] = useState(false)
  const [authorValidation, setAuthorValidation] = useState(
    localStorage.getItem('authorValidation') || ''
  )
  const [titleValidation, setTitleValidation] = useState(
    localStorage.getItem('titleValidation') || ''
  )
  const [descriptionValidation, setDescriptionValidation] = useState(
    localStorage.getItem('descriptionValidation') || ''
  )
  const [publishDate, setPublishDate] = useState(localStorage.getItem('publishDate') || '')
  const [email, setEmail] = useState(localStorage.getItem('email') || '')
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false)
  const actionData = useActionData()
  const navigate = useNavigate()

  const isFormValid = () => {
    const isDateValid = publishDate !== ''
    const isCategoriesValid = selectedOptions.length > 0
    const emailRegex = /^[^\s@]+@redberry\.ge$/
    const isEmailValid = emailRegex.test(email)
    const isDescriptionValid = descriptionValidation.length >= 2
    const isAuthorValid =
      authorValidation.length >= 4 &&
      /^[ა-ჰ\s]+$/.test(authorValidation) &&
      authorValidation.split(' ').filter((word) => word.trim() !== '').length >= 2
    const isTitleValid = titleValidation.length >= 2

    return (
      isAuthorValid &&
      isTitleValid &&
      isDescriptionValid &&
      isDateValid &&
      isCategoriesValid &&
      isEmailValid
    )
  }

  useEffect(() => {
    setIsSubmitEnabled(isFormValid())
    localStorage.setItem('authorValidation', authorValidation)
    localStorage.setItem('titleValidation', titleValidation)
    localStorage.setItem('descriptionValidation', descriptionValidation)
    localStorage.setItem('publishDate', publishDate)
    localStorage.setItem('email', email)
  }, [
    authorValidation,
    titleValidation,
    descriptionValidation,
    publishDate,
    selectedOptions,
    email,
  ])

  const dataInputValidation = () => {
    if (publishDate == '') return 'date-input'

    return 'title-input-green'
  }

  const categoriesInputValidation = () => {
    if (selectedOptions.length === 0) return 'select'

    return 'select-green'
  }

  const titleInputValidation = () => {
    return !hasStartedTypingTitle
      ? 'title-input'
      : titleValidation.length < 2
      ? 'title-input-red'
      : 'title-input-green'
  }

  const handleDateChange = (e) => {
    setPublishDate(e.target.value)
  }

  const handleEmailChange = (e) => {
    setHasStartedTypingEmail(true)
    setEmail(e.target.value)
  }

  const titleOnChange = (event) => {
    setHasStartedTypingTitle(true)

    const newValue = event.target.value
    setTitleValidation(newValue)
  }

  const authorOnChange = (event) => {
    setHasStartedTypingAuthor(true)

    const newValue = event.target.value
    setAuthorValidation(newValue)
  }

  useEffect(() => {
    if (actionData && actionData.success) {
      setSuccesPopup(true)
      const timer = setTimeout(() => navigate('/'), 3000)
      return () => clearTimeout(timer)
    }
  }, [actionData, navigate])

  const isGeorgian = (text) => {
    if (!hasStartedTypingAuthor) return {}

    const georgianRegex = /^[ა-ჰ\s]+$/
    const isGeorgian = georgianRegex.test(text)

    return { color: isGeorgian ? 'green' : 'red' }
  }

  const isTwoWordsOrMore = (inputString) => {
    if (!hasStartedTypingAuthor) return {}

    const words = inputString.split(' ').filter((word) => word.trim() !== '')
    return { color: words.length >= 2 ? 'green' : 'red' }
  }

  const getListItemStyleAuthor = () => {
    if (!hasStartedTypingAuthor) return 'author-input'
    return authorValidation.length < 4 ||
      isGeorgian(authorValidation).color === 'red' ||
      isTwoWordsOrMore(authorValidation).color === 'red'
      ? 'author-input-red'
      : 'author-input-green'
  }
  const getListItemStyle = (num) => {
    if (!hasStartedTypingAuthor) return {}
    return {
      color: authorValidation.length < num ? 'red' : 'green',
    }
  }

  const getListItemStyleTitle = () => {
    if (!hasStartedTypingTitle) return 'title-validation'
    return titleValidation.length < 2 ? 'title-validation-red' : 'title-validation-green'
  }

  const descriptionOnChange = (event) => {
    setHasStartedTypingDescription(true)
    const newValue = event.target.value
    setDescriptionValidation(newValue)
  }
  const getListItemStyleDescription = () => {
    if (!hasStartedTypingDescription) return 'title-validation'
    return descriptionValidation.length < 2 ? 'title-validation-red' : 'title-validation-green'
  }

  const getListItemStyleEmail = () => {
    if (!hasStartedTypingEmail) return 'form-email'
    const emailRegex = /^[^\s@]+@redberry\.ge$/
    const isEmailValid = emailRegex.test(email)
    return !isEmailValid ? 'title-input-red' : 'title-input-green'
  }
  console.log(getListItemStyleEmail())
  const getListItemStyleDescriptionInput = () => {
    if (!hasStartedTypingDescription) return 'description-input'
    return descriptionValidation.length < 2 ? 'description-input-red' : 'description-input-green'
  }

  const handleDashboardRedirectModal = () => {
    setSuccesPopup(false)
    navigate('/')
  }
  const handleCloseLoginModal = () => {
    setSuccesPopup(false)
  }

  if (succesPopup) {
    return (
      <SuccesAddBlog
        handleDashboardRedirectModal={handleDashboardRedirectModal}
        handleCloseLoginModal={handleCloseLoginModal}
      />
    )
  }

  const removeOptionHandler = (option, event) => {
    event.stopPropagation()
    setSelectedOptions(selectedOptions.filter((selectedOption) => selectedOption.id !== option.id))
  }

  const handleFileDrop = (event) => {
    event.preventDefault()
    const files = event.dataTransfer.files
    if (files.length > 0) {
      setFileName(files[0].name)
    }
  }
  const dropdownValueHandler = (category) => {
    if (selectedOptions.some((option) => option.id === category.id)) {
      setSelectedOptions(
        selectedOptions.filter((selectedOption) => selectedOption.id !== category.id)
      )
    } else {
      setSelectedOptions([
        ...selectedOptions,
        {
          title: category.title,
          id: category.id,
          text_color: category.text_color,
          background_color: category.background_color,
        },
      ])
    }
  }

  const dropdownHandler = () => {
    setDropdown(!dropdown)
  }
  return (
    <div>
      <BlogNavbar />

      <Link to='/'>
        {' '}
        <img src={LeftArror} alt='logo' className='arrow-img' />
      </Link>

      <Form method='post' className='addblog-form' encType='multipart/form-data'>
        <div>
          <h1 className='addblog-title'>ბლოგის დამატება</h1>
        </div>
        <label htmlFor='image'>ატვირთე ფოტო</label>
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFileDrop}
          className={fileName.length === 0 ? 'uploadfile-container' : ' uploadfile-container-empty'}
          onClick={() => document.querySelector('.img-upload').click()}>
          {fileName.length > 0 ? (
            <div className='img-paragraph-container'>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={IMGicon} alt='imgicon' className='icon-img' />
                <p>{fileName}</p>
              </div>
              <>
                <span
                  style={{ cursor: 'pointer', paddingRight: 16 }}
                  onClick={() => setFileName('')}>
                  x
                </span>
              </>
            </div>
          ) : (
            <>
              <img src={FolderAdd} alt='addfolderimage' />
              <p className='uploadfile-text'>
                ჩააგდეთ ფაილი აქ ან{' '}
                <span style={{ textDecorationLine: 'underline' }}>აირჩიეთ ფაილი</span>
              </p>
            </>
          )}

          <input
            hidden
            type='file'
            className='img-upload'
            name='image'
            required
            accept='image/png, image/jpeg'
            onChange={({ target: { files } }) => {
              setFileName(files[0].name)
            }}
          />
        </div>

        <div className='form-row'>
          <div className='author-container'>
            <label htmlFor='author'>ავტორი*</label>
            <input
              onChange={authorOnChange}
              type='text'
              className={getListItemStyleAuthor()}
              name='author'
              required
              placeholder='შეიყვანეთ ავტორი'
              defaultValue={authorValidation}
            />
            <ul className='author-validation'>
              <li style={getListItemStyle(4)}>მინიმუმ 4 სიმბოლო</li>
              <li style={isTwoWordsOrMore(authorValidation)}>მინიმუმ 2 სიტყვა</li>
              <li style={isGeorgian(authorValidation)}>მხოლოდ ქართული სიმბოლოები</li>
            </ul>
          </div>

          <div className='title-container'>
            <label htmlFor='title'>სათაური*</label>
            <input
              defaultValue={titleValidation}
              onChange={titleOnChange}
              type='text'
              className={titleInputValidation()}
              placeholder='შეიყვანეთ სათაური'
              name='title'
              required
            />
            <p className={getListItemStyleTitle()}>მინიმუმ 2 სიმბოლო</p>
          </div>
        </div>

        <div className='description-container'>
          <label htmlFor='description'>აღწერა*</label>
          <textarea
            defaultValue={descriptionValidation}
            onChange={descriptionOnChange}
            name='description'
            className={getListItemStyleDescriptionInput()}
            placeholder='შეიყვანეთ აღწერა'></textarea>
          <p className={getListItemStyleDescription()}>მინიმუმ 2 სიმბოლო</p>
        </div>

        <div className='form-row'>
          <div className='publish-date-container'>
            <label htmlFor='publish_date'>გამოქვეყნების თარიღი</label>
            <input
              defaultValue={publishDate}
              type='date'
              className={dataInputValidation()}
              name='publish_date'
              onChange={handleDateChange}
              required
            />
          </div>

          <div className='dropdown'>
            <label htmlFor='categories'>კატეგორია*</label>
            <div className={categoriesInputValidation()} onClick={dropdownHandler}>
              {selectedOptions.length === 0 && (
                <span className='placeholder'>შეიყვანეთ სათაური</span>
              )}
              <div className='addBlog-tag-container'>
                {selectedOptions.map((option) => (
                  <span
                    className='tag'
                    style={{ color: option.text_color, background: option.background_color }}
                    key={option.id}>
                    {option.title}
                    <span
                      className='tag-close-icon'
                      onClick={(event) => removeOptionHandler(option, event)}>
                      ×
                    </span>
                  </span>
                ))}
              </div>
              <img src={DropdownImg} alt='dropdown' className='dropdown-img' />
            </div>
            <ul
              className={dropdown ? 'menu-open' : 'menu'}
              name='categories[]'
              value={selectedOptions}>
              {selectedOptions.map((option) => (
                <input type='hidden' name='categories[]' value={option.id} key={option.id} />
              ))}

              {Array.isArray(categories.data) &&
                categories.data.map((category) => (
                  <li
                    key={category.id}
                    value={selectedOptions}
                    data-category-id={category.id}
                    onClick={() => dropdownValueHandler(category)}
                    className='custom-option'
                    style={{ color: category.text_color, background: category.background_color }}>
                    {category.title}
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className='email-container'>
          <label htmlFor='email'>ელ-ფოსტა</label>
          <input
            type='email'
            required
            name='email'
            className={getListItemStyleEmail()}
            defaultValue={email}
            onChange={handleEmailChange}
          />
          {getListItemStyleEmail() === 'title-validation-red' && (
            <p className='email-validation'>ელ-ფოსტა უნდა მთავრდებოდეს redberry.ge</p>
          )}
        </div>

        <button
          type='submit'
          className={!isSubmitEnabled ? 'disabled-submit-button' : 'submit-button'}
          disabled={!isSubmitEnabled}>
          გამოქვეყნება
        </button>
      </Form>
    </div>
  )
}

export default AddBlogPage
