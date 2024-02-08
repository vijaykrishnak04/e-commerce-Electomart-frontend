import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { bannerSlice } from '../slices/admin/adminBannerSlice';
import { CategorySlice } from '../slices/admin/adminCategorySlice';
import { subcategorySlice} from '../slices/admin/adminSubcategorySlice';
import { adminUserSlice } from '../slices/admin/adminUserManagementSlice';
import { adminOrderSlice } from '../slices/admin/adminOrderSlice';
import { adminCouponSlice } from '../slices/admin/adminCouponSlice';
import { adminProductSlice } from '../slices/admin/adminProductSlice';


const rootReducer = combineReducers({
  Banner: bannerSlice.reducer,
  Category: CategorySlice.reducer,
  Subcategory: subcategorySlice.reducer,
  userManagement: adminUserSlice.reducer,
  adminOrders:adminOrderSlice.reducer,
  adminCoupons:adminCouponSlice.reducer,
  adminProducts:adminProductSlice.reducer
});


export const store = configureStore({
  reducer: rootReducer
})