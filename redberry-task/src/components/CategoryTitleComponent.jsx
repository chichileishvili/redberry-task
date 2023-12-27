import './CategoryTitle.styles.css'

const CategoryTitleComponent = ({ categories, onCategoryChange }) => {
  return (
    <div className='category-title-container'>
      {Array.isArray(categories.data) &&
        categories.data.map((category) => (
          <button
            onClick={() => onCategoryChange(category.id)}
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
