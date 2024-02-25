import UserLayout from "../../layouts/UserLayouts";
import NotFoundPage from "../../pages/NotFoundPage";
import HomePage from "../../pages/users/HomePage";
import { Route, Routes } from "react-router-dom";
import UserLoginPage from "../../pages/users/UserLoginPage";

const UserRoutes = () => {
  return (
    <div>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/login" element={<UserLoginPage />}></Route>
          <Route path="/" element={<HomePage />}></Route>
        </Route>
        <Route path="/*" element={<NotFoundPage />}></Route>
      </Routes>
    </div>
  );
};

export default UserRoutes;
