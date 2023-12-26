import './CategoryTitle.styles.css'

const CategoryTitleComponent = ({ categories }) => {
  return (
    <div className='category-title-container'>
      {Array.isArray(categories.data) &&
        categories.data.map((category) => (
          <button
            className='category-title'
            key={category.id}
            style={{ color: category.text_color, background: category.background_color }}>
            {category.title}
          </button>
        ))}
    </div>
  )
}

export default CategoryTitleComponent
