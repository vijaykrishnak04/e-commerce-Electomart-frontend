import React from 'react'
import { Route, Routes } from "react-router-dom";
import AdminLoginPage from '../../pages/admin/AdminLoginPage';
import NotFoundPage from '../../pages/NotFoundPage';
import AdminDashboardPage from '../../pages/admin/AdminDashboardPage';
import BannerPage from '../../pages/admin/BannerPage';
import AdminLayouts from '../../layouts/AdminLayouts';
import CategoryPage from '../../pages/admin/CategoryPage';
import SubCategory from '../../pages/admin/SubCatgegory';
import AdminUserManagementPage from '../../pages/admin/AdminUserManagementPage';
import AdminOrderManagementPage from '../../pages/admin/AdminOrderManagementPage';
import CouponPage from '../../pages/admin/CouponPage';
import ProductPage from '../../pages/admin/ProductPage';




const AdminRoutes = () => {
    return (
        <div >
            <Routes>
                <Route path="/login" element={<AdminLoginPage />}></Route>
                <Route element={<AdminLayouts />}>
                    <Route path="/dashboard" element={<AdminDashboardPage />}></Route>
                    <Route path="/banners" element={<BannerPage />}></Route>
                    <Route path="/categories" element={<CategoryPage />}></Route>
                    <Route path="/subcategories" element={<SubCategory />}></Route>
                    <Route path="/users" element={<AdminUserManagementPage />}></Route>
                    <Route path="/orders" element={<AdminOrderManagementPage />}></Route>
                    <Route path="/coupons" element={<CouponPage />}></Route>
                    <Route path="/products" element={<ProductPage />}></Route>
                </Route>

                <Route path='/*' element={<NotFoundPage />}></Route>
            </Routes>



        </div>
    )
}

export default AdminRoutes
