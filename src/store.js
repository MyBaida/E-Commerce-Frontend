
import {composeWithDevTools} from '@redux-devtools/extension'

import {configureStore} from '@reduxjs/toolkit'
import productReducers from './reducers/productReducers'
import { productListReducer , productDetailsReducer, productDeleteReducer, productCreateReducer} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import {thunk} from 'redux-thunk';
import { loadState, saveState } from './localStorage'
import {userLoginReducer, userRegisterReducer, userListReducer, userDeleteReducer, userDetailsReducer, userUpdateProfileReducer} from '../src/reducers/userReducers';
import { orderCreateReducer, orderDetailsReducer } from './reducers/orderReducers'


const persistedState = loadState()



const store = configureStore({
    // Automatically calls `combineReducers`
    reducer: {
        productList: productListReducer,
        productDetails: productDetailsReducer,
        cart: cartReducer,
        ship: cartReducer,
        userLogin: userLoginReducer,
        userRegister: userRegisterReducer,
        userList:userListReducer,
        userDelete: userDeleteReducer,
        userDetails: userDetailsReducer,
        userUpdateProfile: userUpdateProfileReducer,
        productDelete: productDeleteReducer,
        productCreate: productCreateReducer,
        orderCreate:orderCreateReducer,
        orderDetails:orderDetailsReducer

    },
        
    preloadedState: persistedState,
  })
  store.subscribe(() => {
    saveState(store.getState())
  })

  const cartItemsFromStorage = localStorage.getItem('cartItems') ? 
          JSON.parse(localStorage.getItem('cartItems')) : []
  
  const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? 
          JSON.parse(localStorage.getItem('shippingAddress')) : {}

          const userInfoFromStorage = localStorage.getItem('userInfo') ? 
          JSON.parse(localStorage.getItem('userInfo')) : []



          const initialState = {
        cart: {cartItems: cartItemsFromStorage, 
        shippingAddress: shippingAddressFromStorage
      },
      userLogin:{userInfo: userInfoFromStorage}

        

          }

          
export default store;