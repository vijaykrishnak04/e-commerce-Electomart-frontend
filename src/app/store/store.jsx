import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { bannerSlice } from '../slices/admin/adminBannerSlice';
import { CategorySlice } from '../slices/admin/adminCategorySlice';
import { subcategorySlice} from '../slices/admin/adminSubcategorySlice';
import { adminUserSlice } from '../slices/admin/adminUserManagementSlice';


const rootReducer = combineReducers({
  Banner: bannerSlice.reducer,
  Category: CategorySlice.reducer,
  Subcategory: subcategorySlice.reducer,
  userManagment: adminUserSlice.reducer
});


export const store = configureStore({
  reducer: rootReducer
})