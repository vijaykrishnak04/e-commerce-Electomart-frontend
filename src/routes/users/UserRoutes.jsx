import UserLayout from "../../layouts/UserLayouts";
import NotFoundPage from "../../pages/NotFoundPage";
import HomePage from "../../pages/users/HomePage";
import { Route, Routes } from "react-router-dom";

const UserRoutes = () => {
    return (
        <div>
            <Routes>
            <Route element={<UserLayout />}>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path='/*' element={<NotFoundPage />}></Route>
                </Route>
            </Routes>

        </div>
    )
}

export default UserRoutes;