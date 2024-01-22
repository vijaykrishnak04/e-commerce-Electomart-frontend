import { useState } from "react";
import { AiFillEnvironment } from 'react-icons/ai'
import { BsArrowLeftShort } from "react-icons/bs";


const AdminSidebar = () => {
    const [open, setOpen] = useState(true);
    return (
        <div className={`bg-green-800 min-h-screen ${open ? "w-72" : "w-20"} duration-300 p-5 pt-8 relative  `}>
            <svg
                className={`absolute ${!open && "rotate-180"} w-7 cursor-pointer -right-3 top-9 bg-white border-2 border-green-800 rounded-full`}
                onClick={() => setOpen(!open)}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <div className="flex gap-x-4 items-center">
                <div className={`w-20 cursor-pointer duration-500 flex justify-center bg-white rounded ${!open && "rotate-180"} border-blue-600`}>
                    <img src='' alt="logo" className={`w-16 cursor-pointer duration-500`} />
                </div>
                <h2 className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`}>Admin Panel</h2>
            </div>
            <ul className="pt-6">

                <li className="mt-80">
                    <div className={`flex justify-start items-center gap-x-4 p-2 cursor-default`}>
                        <span className={`w-7 text-white cursor-pointer hover:text-black`}></span>
                        <span className={`${!open && "hidden"} cursor-default origin-left duration-200 text-white hover:text-black`}></span>
                    </div>
                </li>
            </ul>

        </div>
    );
};

export default AdminSidebar;
