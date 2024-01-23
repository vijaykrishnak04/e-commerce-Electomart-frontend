import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { HiMenuAlt2 } from "react-icons/hi";
import { Link } from "react-router-dom";  // Import Link from React Router
import Logo from "../../assets/images/avatar-admin.jpg";

const AdminNavbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showMenuList, setShowMenuList] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const toggleMenuList = () => {
        setShowMenuList(!showMenuList);
    };

    const handleSearch = () => {
        console.log("Searching...");
    };

    const Menu = [
        { title: "Dashboard", path: "/admin/dashboard" },
        { title: "Banners", path: "/admin/banners" },
        { title: "Products", path: "/admin/products" },
        { title: "Categorys", path: "/admin/categories" },
        { title: "SubCategorys", path: "/admin/subcategories" },
        { title: "Users", path: "/admin/users" },
        { title: "Coupons", path: "/admin/coupons" },
        { title: "Orders", path: "/admin/orders" },
    ];

    return (
        <nav className="flex items-center justify-between bg-white border border-black border-opacity-20 shadow-md p-4">
            <div className="flex items-center space-x-4">
                <div className="md:hidden">
                    <HiMenuAlt2 className="text-blue-400 w-10 h-10" onClick={toggleMenuList} />
                    <div className="relative md:hidden">
                        {showMenuList && (
                            <ul className="absolute bg-white rounded shadow mt-2">
                                {Menu.map((item, index) => (
                                    <li
                                        key={index}
                                        className="relative px-4 py-2 hover:bg-blue-100 transition duration-300 ease-in-out transform hover:scale-105"
                                    >
                                        <Link to={item.path} className="text-black">
                                            {item.title}
                                        </Link>
                                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-px w-full bg-gray-300"></span>
                                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-px w-3/4 bg-gray-300"></span>
                                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-px w-1/2 bg-gray-300"></span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <div className="relative flex justify-content-between md:mx-auto">
                    <div className="relative md:ml-10">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-white text-black border border-black rounded p-2 pl-10 focus:outline-none focus:ring focus:border-blue-300"
                        />
                        <FaSearch className="absolute left-3 top-3 text-blue-400" />
                    </div>
                </div>
            </div>

            <div className="relative">
                <div className="text-white">
                    <img
                        src={Logo}
                        alt=""
                        className="text-2xl cursor-pointer w-10 h-10 rounded-full"
                        onClick={toggleDropdown}
                    />
                    {showDropdown && (
                        <ul className="absolute right-0 mt-2 bg-white text-black p-2 rounded shadow-md md:hidden">
                            <li className="font-poppins text-sm cursor-pointer">Logout</li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;
