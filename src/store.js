
import {composeWithDevTools} from '@redux-devtools/extension'

import {configureStore} from '@reduxjs/toolkit'
import productReducers from './reducers/productReducers'
import { productListReducer , productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, productReviewCreateReducer, productTopRatedReducer,} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import {thunk} from 'redux-thunk';
import { loadState, saveState } from './localStorage'

import {userLoginReducer, userRegisterReducer, userListReducer, userDeleteReducer, userDetailsReducer, userUpdateProfileReducer, userUpdateReducer, userCreateReducer} from '../src/reducers/userReducers';
import { categoryListReducer,categoryDetailsReducer, categoryProductsReducer, categoryDeleteReducer, categoryCreateReducer , categoryUpdateReducer} from './reducers/categoryReducers'




const persistedState = loadState()



const store = configureStore({
    // Automatically calls `combineReducers`
    reducer: {
        productList: productListReducer,
        productDetails: productDetailsReducer,
        productDelete: productDeleteReducer,
        productCreate: productCreateReducer,
        productUpdate: productUpdateReducer,
        productReviewCreate: productReviewCreateReducer,
        productTopRated: productTopRatedReducer,

        cart: cartReducer,
        ship: cartReducer,

        userLogin: userLoginReducer,
        userRegister: userRegisterReducer,
        userList:userListReducer,
        userDelete: userDeleteReducer,
        userDetails: userDetailsReducer,
        userUpdateProfile: userUpdateProfileReducer,
        userUpdate: userUpdateReducer,
        userCreate: userCreateReducer,

        
        categoryList: categoryListReducer,
        categoryDetails: categoryDetailsReducer,
        categoryProduct: categoryProductsReducer,
        categoryDelete: categoryDeleteReducer,
        categoryCreate: categoryCreateReducer,
        categoryUpdate: categoryUpdateReducer,
        

        
        orderCreate:orderCreateReducer,
        orderDetails:orderDetailsReducer,
        orderPay:orderPayReducer,
        orderListMy:orderListMyReducer,

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