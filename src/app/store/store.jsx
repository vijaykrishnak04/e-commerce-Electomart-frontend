import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { bannerSlice } from '../slices/admin/adminBannerSlice';


const rootReducer = combineReducers({
    Banner: bannerSlice.reducer, 
   
  });


export const store = configureStore({
    reducer: rootReducer
})