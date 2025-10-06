import { FaInstagram, FaFacebook, FaHeart } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright and Love Message */}
          <div className="flex items-center gap-2 text-gray-700">
            <span className="font-semibold">© 2025 Company, Inc</span>
            <span className="hidden md:flex items-center gap-1">
              <span>• Made with</span>
              <FaHeart className="text-red-500 animate-pulse w-4 h-4" />
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href="#"
              aria-label="Instagram"
              className="text-gray-600 hover:text-blue-600 transform hover:scale-110 transition-all duration-300"
            >
              <FaInstagram className="w-6 h-6" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="text-gray-600 hover:text-blue-600 transform hover:scale-110 transition-all duration-300"
            >
              <FaFacebook className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
