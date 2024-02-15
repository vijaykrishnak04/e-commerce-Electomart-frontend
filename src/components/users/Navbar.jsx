import React from "react";
import Logo from "../../assets/images/logo.jpg";
import InputField from "../InputField";
import { TiArrowSortedDown } from "react-icons/ti";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-white px-10 py-2 shadow-md">
      <div className="flex items-center">
        <img src={Logo} className="w-10 h-10" alt="logo loading" />
        <div className="ml-10 flex-grow">
          <div className="relative">
            <InputField
              type="text"
              className="w-[50rem] h-10 p-3 pl-10 border border-gray-400 rounded-md outline-none"
              placeholder="Search for Products, Brands and More"
            />
            <div className="px-6 absolute left-[48rem] top-1  rounded py-4 bg-gray-200">
              <IoSearchOutline className="absolute w-5 h-5 top-2 right-3 font-bold  text-gray-700" />
            </div>

          </div>
        </div>
      </div>

      <div className="flex gap-x-16">
        <div className="hidden md:flex flex-col text-white mr-2">
          <h3 className="text-gray-500 text-sm">Hello, user</h3>
          <h1 className="text-black font-semibold text-sm font-poppins">Account & List</h1>
        </div>

        <div className="bg-white h-12 hidden md:flex flex-col text-white  px-10">
          <h3 className="text-gray-500 text-sm">Returns</h3>
          <h1 className="text-black font-semibold text-sm font-poppins">& Orders</h1>
        </div>

        <div className="bg-white flex items-center">
          <h1 className="hidden md:block font-semibold border-r pr-2">Cart</h1>
          <div className="relative">
            <IoCartOutline className="w-8 h-8" />
            <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs -top-2 left-4 absolute">
              0
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
