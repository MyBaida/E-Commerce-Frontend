
import {composeWithDevTools} from '@redux-devtools/extension'

import {configureStore} from '@reduxjs/toolkit'
import productReducers from './reducers/productReducers'
import { productListReducer , productDetailsReducer} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import {thunk} from 'redux-thunk';
import { loadState, saveState } from './localStorage'

const persistedState = loadState()



const store = configureStore({
    // Automatically calls `combineReducers`
    reducer: {
        productList: productListReducer,
        productDetails: productDetailsReducer,
        cart: cartReducer,
      
    },
        
    preloadedState: persistedState,
  })
  store.subscribe(() => {
    saveState(store.getState())
  })

  const cartItemsFromStorage = localStorage.getItem('cartItems') ? 
          JSON.parse(localStorage.getItem('cartItems')) : []


          const initialState = {
            cart: {cartItems: cartItemsFromStorage},
          }

          
export default store;