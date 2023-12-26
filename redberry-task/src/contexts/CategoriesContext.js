import { createContext, useState, useEffect } from 'react'
import {customFetch} from '../utils/customFetch'

export const CategoriesContext = createContext()

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
      
          const response = await customFetch.get('/categories')
          if (response.status === 200) {
            setCategories(response.data)
          } else {
            throw new Error(`Error fetching categories: ${response.status}`)
          }
      } catch (error) {
        console.error('Failed to load categories', error)
      }
    }

    fetchCategories()
  }, [])

  return <CategoriesContext.Provider value={{ categories }}>{children}</CategoriesContext.Provider>
}
