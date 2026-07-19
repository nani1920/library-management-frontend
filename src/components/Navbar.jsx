/** @format */

import { IoHomeOutline, IoSearch, IoBookmarkOutline } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const tabs = [
  {
    name: "Home",
    icon: IoHomeOutline,
    nav: "/",
    end: true,
  },
  {
    name: "Search",
    icon: IoSearch,
    nav: "/books",
    end: true,
  },
  {
    name: "MyBooks",
    icon: FaHistory,
    nav: "/books/me",
    end: true,
  },
  {
    name: "Wishlist",
    icon: IoBookmarkOutline,
    nav: "/books/saved",
    end: true,
  },
  {
    name: "Profile",
    icon: FiUser,
    nav: "/profile",
    end: true,
  },
];

const Navbar = () => {
  return (
    <nav className="fixed z-10 bottom-0 left-0 right-0 bg-white shadow-lg border-t border-slate-300 rounded-t-xl w-full py-1 md:hidden">
      <ul className="flex justify-around items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;

          return (
            <NavLink
              to={tab.nav}
              end={tab.end}
              key={tab.name}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg flex flex-col items-center justify-center transition-all duration-200 ${
                  isActive ? "text-white bg-blue-900" : "text-gray-500"
                }`
              }
            >
              <Icon className="text-xl" />
              <p className="text-xs font-light">{tab.name}</p>
            </NavLink>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
