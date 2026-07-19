/** @format */
import { PiBookOpenTextBold } from "react-icons/pi";
import { FaClockRotateLeft } from "react-icons/fa6";
import { IoBookmarkOutline } from "react-icons/io5";
import { MdMenuBook } from "react-icons/md";

const StatsCards = ({ borrowed, returned, wishlisted }) => {
  const stats = [
    {
      icon: PiBookOpenTextBold,
      iconColor: "text-blue-900",
      count: borrowed,
      label: "Books Borrowed",
    },
    {
      icon: FaClockRotateLeft,
      iconColor: "text-gray-900",
      count: returned,
      label: "Returned",
    },
    {
      icon: MdMenuBook,
      iconColor: "text-green-700",
      count: borrowed + returned,
      label: "Total Books",
    },
    {
      icon: IoBookmarkOutline,
      iconColor: "text-blue-900",
      count: wishlisted,
      label: "Wishlist",
    },
  ];

  return (
    <>
      <ul className="mt-6 grid grid-cols-2 gap-2 md:grid-cols-8">
        {stats.map((stats, index) => {
          return (
            <li
              key={index}
              className="border-2 border-gray-200 px-3 py-3 rounded-lg"
            >
              <stats.icon className={`text-lg ${stats.iconColor}`} />
              <p className="font-semibold text-2xl py-2">{stats.count}</p>
              <p className="font-semibold text-xs text-gray-500">
                {stats.label}
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default StatsCards;
