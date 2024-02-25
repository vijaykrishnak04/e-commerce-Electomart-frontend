import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLoginPage from "../../pages/admin/AdminLoginPage";
import NotFoundPage from "../../pages/NotFoundPage";
import AdminDashboardPage from "../../pages/admin/AdminDashboardPage";
import BannerPage from "../../pages/admin/BannerPage";
import AdminLayouts from "../../layouts/AdminLayouts";
import CategoryPage from "../../pages/admin/CategoryPage";
import SubCategory from "../../pages/admin/SubCatgegory";
import AdminUserManagementPage from "../../pages/admin/AdminUserManagementPage";
import AdminOrderManagementPage from "../../pages/admin/AdminOrderManagementPage";
import CouponPage from "../../pages/admin/CouponPage";
import ProductPage from "../../pages/admin/ProductPage";
import AdminVerification from "../../verification/AdminVerification";

const AdminRoutes = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={
            <AdminVerification>
              <AdminLoginPage />
            </AdminVerification>
          }
        />

        <Route element={<AdminLayouts />}>
          <Route
            path="/dashboard"
            element={
              <AdminVerification>
                <AdminDashboardPage />
              </AdminVerification>
            }
          />
          <Route
            path="/banners"
            element={
              <AdminVerification>
                <BannerPage />
              </AdminVerification>
            }
          />
          <Route
            path="/categories"
            element={
              <AdminVerification>
                <CategoryPage />
              </AdminVerification>
            }
          />
          <Route
            path="/subcategories"
            element={
              <AdminVerification>
                <SubCategory />
              </AdminVerification>
            }
          />
          <Route
            path="/users"
            element={
              <AdminVerification>
                <AdminUserManagementPage />
              </AdminVerification>
            }
          />
          <Route
            path="/orders"
            element={
              <AdminVerification>
                <AdminOrderManagementPage />
              </AdminVerification>
            }
          />
          <Route
            path="/coupons"
            element={
              <AdminVerification>
                <CouponPage />
              </AdminVerification>
            }
          />
          <Route
            path="/products"
            element={
              <AdminVerification>
                <ProductPage />
              </AdminVerification>
            }
          />
        </Route>

        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default AdminRoutes;
