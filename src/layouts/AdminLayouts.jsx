import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/admin/AdminNavbar";
import AdminSidebar from "../components/admin/AdminSidebar";

const AdminLayouts = () => {
  return (
    <div className="flex">
      <div className="hidden md:flex">
        <AdminSidebar />
      </div>
      <div className="flex-1">
        <AdminNavbar />
        <div className="p-4">
          <Outlet  />
        </div>
      </div>
    </div>
  );
};

export default AdminLayouts;
