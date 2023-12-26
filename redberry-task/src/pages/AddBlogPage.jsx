import { Form, Link, redirect, useActionData } from 'react-router-dom'
import { customFetch } from '../utils/customFetch'
import { BlogNavbar } from '../components'
import LeftArror from '../assets/images/leftArrow.svg'
import { CategoriesContext } from '../contexts/CategoriesContext'
import { useContext } from 'react'
import './AddBlogPage.styles.css'
import { useState } from 'react'
import DropdownImg from '../assets/images/dropdown.svg'
import FolderAdd from '../assets/images/folder-add.svg'
import IMGicon from '../assets/images/img-icon.svg'

export const action = async ({ request }) => {
  const formData = await request.formData()
  console.log(formData)

  try {
    await customFetch.post('/blogs', formData, {
      'Content-Type': 'multipart/form-data',
    })
    return redirect('/')
  } catch (error) {
    console.log(error)
    return error
  }
}

const AddBlogPage = () => {
  const { categories } = useContext(CategoriesContext)
  const [dropdown, setDropdown] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState([])
  const [fileName, setFileName] = useState('')
  console.log(fileName)

  console.log(selectedOptions)

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
  console.log(categories)
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
              {' '}
              <img src={FolderAdd} alt='addfolderimage' />
              <p className='uploadfile-text'>
                ჩააგდეთ ფაილი აქ ან{' '}
                <span style={{ textDecorationLine: 'underline' }}>აირჩიეთ ფაილი</span>
              </p>{' '}
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
              type='text'
              className='author-input'
              name='author'
              required
              placeholder='შეიყვანეთ ავტორი'
            />
            <ul className='author-validation'>
              <li>მინიმუმ 4 სიმბოლო</li>
              <li>მინიმუმ 2 სიტყვა</li>
              <li>მხოლოდ ქართული სიმბოლოები</li>
            </ul>
          </div>

          <div className='title-container'>
            <label htmlFor='title'>სათაური*</label>
            <input
              type='text'
              className='title-input'
              placeholder='შეიყვანეთ სათაური'
              name='title'
              required
            />
            <p className='title-validation'>მინიმუმ 2 სიმბოლო</p>
          </div>
        </div>

        <div className='description-container'>
          <label htmlFor='description'>აღწერა*</label>
          <textarea
            name='description'
            className='description-input'
            placeholder='შეიყვანეთ აღწერა'></textarea>
        </div>

        <div className='form-row'>
          <div className='publish-date-container'>
            <label htmlFor='publish_date'>გამოქვეყნების თარიღი</label>
            <input type='date' className='date-input' name='publish_date' required />
          </div>

          <div className='dropdown'>
            <label htmlFor='categories'>კატეგორია*</label>
            <div className='select' onClick={dropdownHandler}>
              {selectedOptions.length === 0 && (
                <span className='placeholder'>შეიყვანეთ სათაური</span>
              )}
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
          <input type='email' required name='email' className='form-email' />
        </div>

        <button type='submit' className='submit-button'>
          გამოქვეყნება
        </button>
      </Form>
    </div>
  )
}

export default AddBlogPage
