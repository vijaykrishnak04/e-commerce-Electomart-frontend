import { FaFacebook, FaInstagram, FaTwitter, FaCreditCard } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white md:mb-0 mb-16 pb-2">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-12 grid grid-cols-2 md:grid-cols-6 gap-8">
        {/* About Column */}
        <div className="col-span-1 md:col-span-1">
          <h6 className="uppercase font-bold mb-2.5">About</h6>
          <ul className="space-y-1.5">
            <li><a href="/contact-us" className="hover:underline">Contact Us</a></li>
            <li><a href="/about-us" className="hover:underline">About Us</a></li>
            <li><a href="/faq" className="hover:underline">FAQ</a></li>
          </ul>
        </div>

        {/* Help Column */}
        <div className="col-span-1 md:col-span-1">
          <h6 className="uppercase font-bold mb-2.5">Help</h6>
          <ul className="space-y-1.5">
            <li><a href="/payments" className="hover:underline">Payments</a></li>
            <li><a href="/shipping" className="hover:underline">Shipping</a></li>
            <li><a href="/returns" className="hover:underline">Cancellation & Returns</a></li>
          </ul>
        </div>

        {/* Social Column */}
        <div className="col-span-1 md:col-span-1">
          <h6 className="uppercase font-bold mb-2.5">Social</h6>
          <ul className="space-y-1.5">
            <li><a href="https://facebook.com" className="hover:underline">Facebook</a></li>
            <li><a href="https://instagram.com" className="hover:underline">Instagram</a></li>
            <li><a href="https://twitter.com" className="hover:underline">Twitter</a></li>
          </ul>
        </div>

        {/* Mail Us Column */}
        <div className="col-span-2 md:col-span-1 md:border-l md:border-gray-700 md:pl-4">
          <h6 className="uppercase font-bold mb-2.5">Mail Us</h6>
          <p className="mb-4">Eastelectronics@gmail.com</p>
          <h6 className="uppercase font-bold mb-2.5">Call Support</h6>
          <p>(974) 0000 - 0000</p>
        </div>

        {/* Follow Us Column */}
        <div className="md:ml-6 col-span-2 md:col-span-1 md:pl-4">
          <h6 className="uppercase font-bold mb-2.5">Follow Us On</h6>
          <div className="flex items-center space-x-4">
            <a href="https://facebook.com" className="text-white"><FaFacebook /></a>
            <a href="https://instagram.com" className="text-white"><FaInstagram /></a>
            <a href="https://twitter.com" className="text-white"><FaTwitter /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400 text-sm">
        <p>© 2023 Eastelectronics. All Rights Reserved</p>
        <div className="flex justify-center space-x-4 mt-2">
          <FaCreditCard className="text-xl" />
          <FaCreditCard className="text-xl" />
          <FaCreditCard className="text-xl" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
