import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import productListReducer from '../features/products/productListSlice';
import productDetailsReducer from '../features/products/productDetailsSlice';
import userLoginReducer from '../features/users/userLoginSlice';
import userRegisterReducer from '../features/users/userRegisterSlice';
import userProfileReducer from '../features/users/userProfileSlice';
import userProfileUpdateReducer from '../features/users/userProfileUpdateSlice';
import orderCreateReducer from '../features/orders/orderCreateSlice';
import orderDetailsReducer from '../features/orders/orderDetailsSlice';
import orderPayReducer from '../features/orders/orderPaySlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  productDetails: productDetailsReducer,
  productList: productListReducer,
  userLogin: userLoginReducer,
  userProfile: userProfileReducer,
  userProfileUpdate: userProfileUpdateReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
});

export default rootReducer;
