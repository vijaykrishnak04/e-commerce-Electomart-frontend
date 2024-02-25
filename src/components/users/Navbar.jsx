import { useState } from "react";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";
import { TiArrowSortedDown } from "react-icons/ti";
import { HiMenu } from "react-icons/hi"; // Assuming you want a hamburger menu icon for mobile view
import Logo from "../../assets/images/logo.jpg"; // Update the path to where your logo is located
import Cart from "./Cart";
import Dropdown from "../Dropdown";

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const allProductsOptions = [
    { value: "accessories", label: "Accessories" },
    { value: "back_in_stock", label: "Back In Stock" },
    { value: "components", label: "Components" },
    { value: "gaming_mobiles", label: "Gaming Mobiles" },
    { value: "laptops", label: "Laptops" },
    { value: "monitors", label: "Monitors" },
    // ... include other categories as needed
  ];

  // Default label for the dropdown when no option is selected
  const defaultOptionLabel = "All products";

  // A state hook to keep track of the selected option
  const [selectedCategory, setSelectedCategory] = useState("");

  // A handler function to be called when the dropdown value changes
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="">
      {/* Top Navbar - Fixed */}
      <div className="bg-white flex items-center justify-around px-4 py-2 shadow-md sticky top-0 right-0 left-0 z-40">
        <div className="flex items-center space-x-2 md:space-x-4">
          <HiMenu className="text-2xl md:hidden cursor-pointer" />
          <img src={Logo} className="w-12 h-12" alt="Company Logo" />
        </div>
        <div className="flex justify-center md:w-1/2 w-9/12">
          <div className="relative w-full">
            <input
              type="text"
              className="w-full h-10 pl-4 pr-12 rounded-md border-2 border-gray-300 focus:border-[#ffaf0e] outline-none"
              placeholder="Search for Products, Brands and More"
              style={{ boxShadow: "0 4px 6px 0 rgba(0, 0, 0, 0.1)" }} // Custom shadow
            />
            <button
              className="absolute inset-y-0 right-0 flex items-center justify-center w-12 rounded-r-md bg-[#ffaf0e]"
              type="button"
            >
              <IoSearchOutline className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-10">
          <div className="flex flex-col items-end">
            <span className="text-gray-500 text-sm">Hello, SignIn</span>
            <div className="flex items-center text-sm font-semibold cursor-pointer">
              <span>Account & List</span>
              <TiArrowSortedDown className="ml-1" />
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-gray-500 text-sm">Return</span>
            <span className="text-sm font-semibold">& Orders</span>
          </div>
          <div className="relative cursor-pointer">
            <IoCartOutline className="w-8 h-8" onClick={toggleCart} />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-1">
              5
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Navbar - Scrollable */}
      <div className="bg-[#ffaf0e] text-white px-4 py-2 overflow-x-auto whitespace-nowrap font-bold flex items-center">
        <Dropdown
          selectedOption={selectedCategory}
          onChange={handleCategoryChange}
          options={allProductsOptions}
          defaultLabel={defaultOptionLabel}
        />
        <a href="#mobiles" className="mx-2 md:mx-4 hover:underline">
          Mobiles
        </a>
        <a href="#laptops" className="mx-2 md:mx-4 hover:underline">
          Laptops
        </a>
        <a href="#cloths" className="mx-2 md:mx-4 hover:underline">
          Cloths
        </a>
        <a href="#accessories" className="mx-2 md:mx-4 hover:underline">
          Accessories
        </a>
      </div>
      {isCartOpen && <Cart open={isCartOpen} setOpen={setIsCartOpen} />}
    </div>
  );
};

export default Navbar;
