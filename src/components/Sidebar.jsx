/** @format */

import { IoHomeOutline, IoBookmarkOutline } from "react-icons/io5";
import { MdMenuBook } from "react-icons/md";
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
    name: "Books",
    icon: MdMenuBook,
    nav: "/books",
    end: true,
  },
  {
    name: "History",
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

const Sidebar = () => {
  return (
    <div className="hidden md:flex h-screen w-[190px] pt-4 flex-col justify-start">
      <div className="flex flex-col justify-center items-start pl-5">
        <h1 className="font-bold text-blue-900 text-xl">Lumina Library</h1>
        <p className="text-sm font-semibold text-slate-400">User Dashboard</p>
      </div>

      <ul className="mt-3 ml-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;

          return (
            <NavLink
              to={tab.nav}
              key={tab.name}
              end={tab.end}
              className={({ isActive }) =>
                `mt-4 p-3 flex justify-start items-center rounded-lg cursor-pointer transition-colors ${
                  isActive
                    ? "text-[#0048b2] bg-[#dfe9fa]"
                    : "text-slate-500 hover:text-[#0048b2] hover:bg-slate-100"
                }`
              }
            >
              <Icon className="text-xl font-semibold" />

              <p className="pl-2 font-bold text-sm">{tab.name}</p>
            </NavLink>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
