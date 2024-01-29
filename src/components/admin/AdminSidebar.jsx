import { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillEnvironment } from "react-icons/ai";
import { BsArrowLeftShort, BsChevronDown } from "react-icons/bs";
import Logo from "../../assets/images/site-logo.png";
import { MdOutlineDashboard } from "react-icons/md";
import { GiVerticalBanner } from "react-icons/gi";
import { MdCategory } from "react-icons/md";
import { LuBoxes } from "react-icons/lu";
import { MdOutlineCategory } from "react-icons/md";
import { CiDiscount1 } from "react-icons/ci";
import { BsBoxSeam } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";

const AdminSidebar = () => {
    const [open, setOpen] = useState(true);

    const Menu = [
        { title: "Dashboard", icon: <MdOutlineDashboard className="text-black" />, path: "/admin/dashboard" },
        { title: "Banners", icon: <GiVerticalBanner className="text-black" />, path: "/admin/banners" },
        { title: "Products", icon: <BsBoxSeam className="text-black" />, path: "/admin/products" },
        { title: "Categories", icon: <MdCategory className="text-black" />, path: "/admin/categories" },
        { title: "SubCategories", icon: <MdOutlineCategory className="text-black" />, path: "/admin/subcategories" },
        { title: "Users", icon: <FaUsers className="text-black" />, path: "/admin/users" },
        { title: "Coupons", icon: <CiDiscount1 className="text-black" />, path: "/admin/coupons" },
        { title: "Orders", icon: <LuBoxes className="text-black" />, path: "/admin/orders" },
    ];

    return (
        <div className="flex">
            <div
                className={`bg-white h-screen p-5 pt-8 ${open ? "w-64" : "w-20"
                    } duration-300 relative border-r  border-black border-opacity-50 shadow-md`}
            >
                <BsArrowLeftShort
                    className={`bg-white text-black text-3xl rounded-full ${!open && "rotate-180"
                        } absolute -right-3 top-9 border border-black cursor-pointer`}
                    onClick={() => setOpen(!open)}
                />
                <div className="inline-flex">
                    <img
                        src={Logo}
                        className={`bg-amber-300  w-10 h-10 text-4xl rounded cursor-pointer block float-left mr-2 duration-500  ${open && "rotate-[360deg]"
                            } `}
                        alt=""
                    />
                    <h1
                        className={`text-gray-700 origin-left text-2xl mt-1 ml-2 duration-300  font-poppins font-semibold ${!open && "scale-0"
                            }`}
                    >
                        Electromart
                    </h1>
                </div>
                <ul className="pt-2">
                    {Menu.map((menu, index) => (
                        <li
                            key={index}
                            className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-blue-100 rounded-md mt-2  `}
                        >
                            <Link to={menu.path} className="text-2xl block float-left">
                                {menu.icon}
                            </Link>
                            <Link
                                to={menu.path}
                                className={`text-base font-medium flex-1 text-black duration-500 ${!open && "hidden"} `}
                            >
                                {menu.title}
                            </Link>
                            {menu.submenu && <BsChevronDown className="" onClick={() => { }} />}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminSidebar;
