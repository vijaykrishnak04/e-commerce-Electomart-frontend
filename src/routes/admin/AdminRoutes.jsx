import React from 'react'
import { Route, Routes } from "react-router-dom";
import AdminLoginPage from '../../pages/admin/AdminLoginPage';
import NotFoundPage from '../../pages/NotFoundPage';
import AdminDashboardPage from '../../pages/admin/AdminDashboardPage';
import BannerPage from '../../pages/admin/BannerPage';
import AdminLayouts from '../../layouts/AdminLayouts';
import CategoryPage from '../../pages/admin/CategoryPage';
import SubCategory from '../../pages/admin/SubCatgegory';




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
                </Route>

                <Route path='/*' element={<NotFoundPage />}></Route>
            </Routes>



        </div>
    )
}

export default AdminRoutes
