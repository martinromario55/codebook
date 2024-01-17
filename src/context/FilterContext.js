import { createContext, useContext, useReducer } from 'react'
import { filterReducer } from '../reducers'

const filterInitailState = {
  productList: [],
  onlyInStock: false,
  bestSellerOnly: false,
  sortBy: null,
  ratings: null,
}

const FilterContext = createContext(filterInitailState)

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, filterInitailState)

  // All Products
  function initialProductList(products) {
    dispatch({
      type: 'PRODUCT_LIST',
      payload: {
        products: products,
      },
    })
  }

  // Best Seller
  function bestSeller(products) {
    return state.bestSellerOnly
      ? products.filter(product => product.best_seller === true)
      : products
  }

  //   In Stock
  function instock(products) {
    return state.onlyInStock
      ? products.filter(product => product.in_stock === true)
      : products
  }

  //   Sort
  function sort(products) {
    if (state.sortBy === 'lowtohigh') {
      return products.sort((a, b) => Number(a.price) - Number(b.price))
    }
    if (state.sortBy === 'hightolow') {
      return products.sort((a, b) => Number(b.price) - Number(a.price))
    }
    return products
  }

  //   rating
  function rating(products) {
    if (state.ratings === '4STARSABOVE') {
      return products.filter(product => product.rating >= 4)
    }
    if (state.ratings === '3STARSABOVE') {
      return products.filter(product => product.rating >= 3)
    }
    if (state.ratings === '2STARSABOVE') {
      return products.filter(product => product.rating >= 2)
    }
    if (state.ratings === '1STARSABOVE') {
      return products.filter(product => product.rating >= 1)
    }
    return products
  }

  const filteredProductList = sort(
    rating(instock(bestSeller(state.productList)))
  )

  const value = {
    state,
    dispatch,
    initialProductList,
    products: filteredProductList,
  }

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  )
}

export const useFilter = () => useContext(FilterContext)
