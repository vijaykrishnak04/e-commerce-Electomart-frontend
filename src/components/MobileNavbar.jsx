import { useState } from 'react';
import { FaHome, FaTags, FaUser, FaShoppingCart } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';
import Cart from './users/Cart';

const MobileNavbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white drop-shadow-2xl md:hidden z-40">
      <div className="flex justify-between items-center text-gray-800 px-4">
        <a href="#home" className="flex flex-col items-center flex-grow text-center py-2">
          <FaHome className="text-2xl" />
          <span className="text-xs">Home</span>
        </a>
        <a href="#categories" className="flex flex-col items-center flex-grow text-center py-2">
          <MdCategory className="text-2xl" />
          <span className="text-xs">Categories</span>
        </a>
        <a href="#offers" className="flex flex-col items-center flex-grow text-center py-2">
          <FaTags className="text-2xl" />
          <span className="text-xs">Offers</span>
        </a>
        <a href="#account" className="flex flex-col items-center flex-grow text-center py-2">
          <FaUser className="text-2xl" />
          <span className="text-xs">My Account</span>
        </a>
        <a className="flex flex-col items-center flex-grow text-center py-2 relative" onClick={toggleCart}>
          <FaShoppingCart className="text-2xl" />
          <span className="text-xs">Cart</span>
          <span className="absolute -top-1 -right-3 bg-red-600 text-white text-xs rounded-full px-2 py-1">0</span>
        </a>
      </div>
      {isCartOpen && <Cart open={isCartOpen} setOpen={setIsCartOpen} />}
    </div>
  );
};

export default MobileNavbar;
