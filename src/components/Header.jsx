/** @format */
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";

const Header = () => {
  return (
    <>
      <div className="fixed w-full bg-slate-50 p-2 md:left-[190px] md:w-[calc(100%-190px))] top-0  left-0  flex justify-between items-center md:justify-end  border-b border-gray-500">
        <h1 className="md:hidden font-bold text-blue-900 text-xl w-1/2">
          Lumina Library
        </h1>
        <div className=" flex justify-end items-center">
          <IoIosNotificationsOutline className="text-2xl m-2 cursor-pointer" />
          <FaRegUser className="text-lg m-2 cursor-pointer" />
        </div>
      </div>
    </>
  );
};
export default Header;
