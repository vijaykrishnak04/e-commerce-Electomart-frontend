import React from 'react'
import { Route, Routes } from "react-router-dom";
import AdminLoginPage from '../../pages/admin/AdminLoginPage';
import NotFoundPage from '../../pages/NotFoundPage';
import AdminDashboardPage from '../../pages/admin/AdminDashboardPage';
import BannerPage from '../../pages/admin/BannerPage';
import AdminLayouts from '../../layouts/AdminLayouts';




const AdminRoutes = () =>{
    return(
        <div >
            <Routes>
                <Route element={<AdminLayouts/>}>
                <Route path="/login" element={<AdminLoginPage/>}></Route>
                <Route path="/dashboard" element={<AdminDashboardPage/>}></Route>
                <Route path="/banners" element={<BannerPage/>}></Route>
               </Route>


                
                <Route path='/*' element={<NotFoundPage/>}></Route>
            </Routes>

           

        </div>
    )
}

export default AdminRoutes
