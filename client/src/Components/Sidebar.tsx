import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChartBar, FaMapMarkerAlt, FaAddressBook } from "react-icons/fa"; // Import icons from react-icons

// Sidebar component definition
const Sidebar: React.FC = () => {
  // State to control whether the sidebar is minimized or not
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  // Function to toggle the sidebar state
  const toggleSidebar = () => {
    setIsSidebarMinimized(!isSidebarMinimized);
  };

  // JSX rendering
  return (
    <div
      className={`bg-gray-800 h-2000 transition-all ${
        isSidebarMinimized ? "w-20" : "w-64"
      }`}
    >
      <div className="flex flex-col h-full p-4">
        {/* Top section with app name and toggle button */}
        <div className="flex items-center justify-between">
          <span
            className={`text-xl font-semibold ${
              isSidebarMinimized ? "hidden" : ""
            }`}
            style={{ color: "#FFF" }}
          >
            ContactMeeno
          </span>
          <button
            onClick={toggleSidebar}
            className="block p-2 focus:outline-none"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-6 w-6 fill-current"
              style={{ color: "#FFF" }}
            >
              <path d="M2 6H22V8H2zM2 11H22V13H2zM2 16H22V18H2z" />
            </svg>
          </button>
        </div>
        {/* Sidebar navigation links */}
        <ul className="mt-2">
          {/* User profile image */}
          <img
            src="https://modernize-nuxt.adminmart.com/images/profile/user-1.jpg"
            alt="Profile"
            className={`w-20 h-20 rounded-full mx-auto mb-2 ${
              isSidebarMinimized ? "hidden" : "block"
            }`}
          />
          {/* Dashboard link */}
          <li className="mb-2">
            <Link
              to="/"
              className="flex items-center p-3 hover:bg-gray-700 transition-colors"
              style={{ color: "#FFD700" }}
            >
              <FaChartBar className={`w-5 h-5 inline-block mr-2`} />
              {!isSidebarMinimized && "Dashboard"}
            </Link>
          </li>
          {/* Contacts link */}
          <li className="mb-2">
            <Link
              to="/contacts"
              className="flex items-center p-3 hover:bg-gray-700 transition-colors"
              style={{ color: "#FFD700" }}
            >
              <FaAddressBook className={`w-5 h-5 inline-block mr-2`} />
              {!isSidebarMinimized && "Contacts"}
            </Link>
          </li>
          {/* Charts & Maps link */}
          <li className="mb-2">
            <Link
              to="/charts-and-maps"
              className="flex items-center p-3 hover:bg-gray-700 transition-colors"
              style={{ color: "#FFD700" }}
            >
              <FaMapMarkerAlt className={`w-5 h-5 inline-block mr-2`} />
              {!isSidebarMinimized && "Charts & Maps"}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
