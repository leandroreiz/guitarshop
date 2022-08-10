import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import productListReducer from '../features/products/productListSlice';
import productDetailsReducer from '../features/products/productDetailsSlice';
import userLoginReducer from '../features/users/userLoginSlice';
import userRegisterReducer from '../features/users/userRegisterSlice';
import userProfileReducer from '../features/users/userProfileSlice';
import userProfileUpdateReducer from '../features/users/userProfileUpdateSlice';
import orderCreateReducer from '../features/orders/ordersSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  productDetails: productDetailsReducer,
  productList: productListReducer,
  userLogin: userLoginReducer,
  userProfile: userProfileReducer,
  userProfileUpdate: userProfileUpdateReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
});

export default rootReducer;
