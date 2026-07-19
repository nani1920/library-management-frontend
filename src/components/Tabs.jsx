/** @format */
import { FaRegCompass } from "react-icons/fa6";
import { MdOutlineHistoryToggleOff } from "react-icons/md";
import { IoBookmarkOutline } from "react-icons/io5";
import { FaMoneyBillAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const tabs = [
  { name: "Explore", icon: FaRegCompass, nav: "/books" },
  {
    name: "History",
    icon: MdOutlineHistoryToggleOff,
    nav: "/books/me",
  },
  { name: "Wishlist", icon: IoBookmarkOutline, nav: "/books/saved" },
  { name: "Fines", icon: FaMoneyBillAlt, nav: "/fines" },
];
const Tabs = () => {
  return (
    <>
      <ul className="mt-5 mx-2 flex justify-between items-center md:hidden">
        {tabs.map((tab, index) => {
          return (
            <Link
              to={tab.nav}
              key={index}
              className="flex flex-col justify-center items-center"
            >
              <div className="bg-[#dce1ff] h-[45px] w-[45px] rounded-lg flex justify-center items-center">
                <tab.icon className="text-2xl text-gray-800" />
              </div>
              <h1 className="font-bold text-xs pt-2">{tab.name}</h1>
            </Link>
          );
        })}
      </ul>
    </>
  );
};
export default Tabs;
