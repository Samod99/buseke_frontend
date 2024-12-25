import React from "react";
import { FaSearch, FaBookmark, FaCog, FaUser } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-[#2b241a] p-7 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center bg-white rounded-full px-6 py-2 shadow-md">
        {/* Logo Section */}
        <div className="flex items-center">
          <img
            src="https://godare.net/wp-content/uploads/2024/12/wahanalk-3-1.png" // Replace with your logo path
            alt="Wahanalk Logo"
            className="h-10 w-auto"
          />
        </div>

        <div className="flex items-center gap-5">
        {/* Navigation Links */}
        <nav className="flex items-center space-x-6">
          <a
            href="#home"
            className="text-[#2b241a] text-sm font-medium hover:underline"
          >
            Home
          </a>
          <a
            href="#categories"
            className="text-[#2b241a] text-sm font-medium hover:underline"
          >
            Categories
          </a>
          <a
            href="#new-releases"
            className="text-[#2b241a] text-sm font-medium hover:underline"
          >
            New releases
          </a>
        </nav>

        {/* Icon Section */}
        <div className="flex items-center space-x-4 text-[#2b241a]">
          <button>
            <FaSearch className="w-5 h-5" />
          </button>
          <button>
            <FaBookmark className="w-5 h-5" />
          </button>
          <button>
            <FaCog className="w-5 h-5" />
          </button>
          <button>
            <FaUser className="w-5 h-5" />
          </button>
        </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
