import {createStore, combineReducers, applyMiddleware} from 'redux'

import {composeWithDevTools} from '@redux-devtools/extension'

import {configureStore} from '@reduxjs/toolkit'
import productReducers from './reducers/productReducers'
import { productListReducer , productDetailsReducer} from './reducers/productReducers'




const initialState = {}



const store = configureStore({
    // Automatically calls `combineReducers`
    reducer: {
        productList: productListReducer,
        productDetails: productDetailsReducer,
      
    }
  })

export default store;