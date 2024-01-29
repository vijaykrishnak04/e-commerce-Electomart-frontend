import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { bannerSlice } from '../slices/admin/adminBannerSlice';
import { CategorySlice } from '../slices/admin/adminCategorySlice';


const rootReducer = combineReducers({
    Banner: bannerSlice.reducer,
    Category: CategorySlice.reducer 
   
  });


export const store = configureStore({
    reducer: rootReducer
})