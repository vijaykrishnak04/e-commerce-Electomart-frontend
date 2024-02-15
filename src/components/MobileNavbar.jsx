import { IoMenu, IoSearchOutline } from "react-icons/io5";
import Logo from '../assets/images/logo.jpg';
import { RxAvatar } from "react-icons/rx";
import { IoCartOutline } from "react-icons/io5";
import InputField from "./InputField";

const MobileNavbar = () => {
    return (
        <div>
            <div className="bg-white px-4 py-2 h-14  flex items-center justify-between">
                <div className="flex items-center gap-x-5">
                    <IoMenu className="w-8 h-8" />
                    <img src={Logo} className="w-18 h-14" alt="logo loading" />
                </div>

                <div className="flex items-center gap-x-3">
                    <RxAvatar className="text-2xl" />
                    <h3 className="text-gray-800 text-sm">Login</h3>
                    <div className="bg-white flex items-center">
                        <h1 className="hidden md:block font-semibold border-r">Cart</h1>
                        <div className="relative">
                            <IoCartOutline className="w-8 h-8" />
                            <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs -top-2 left-4 absolute">
                                0
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative px-5 h-16 p-2  ">
                <input
                    type="text"
                    placeholder="Search for Products, Brands and More"
                    className="w-full h-12 p-3 pl-10 bg-[#dcf2fa] rounded-md outline-none"
                />
                <IoSearchOutline className="absolute font-bold left-8 top-5 w-5 h-5 text-gray-800" />
            </div>
        </div>

    );
};

export default MobileNavbar;
