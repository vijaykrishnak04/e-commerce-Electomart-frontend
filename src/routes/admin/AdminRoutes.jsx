import React from 'react'
import { Route, Routes } from "react-router-dom";
import AdminLogin from '../../pages/admin/AdminLogin';
import NotFoundPage from '../../pages/NotFoundPage';




const AdminRoutes = () =>{
    return(
        <div>
            <Routes>
                <Route path="/login" element={<AdminLogin/>}></Route>



                
                <Route path='/*' element={<NotFoundPage/>}></Route>
            </Routes>

           

        </div>
    )
}

export default AdminRoutes
