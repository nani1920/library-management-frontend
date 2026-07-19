/** @format */
import { PiBookOpenTextBold } from "react-icons/pi";
import { FaRegCalendarTimes } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
import { IoStar } from "react-icons/io5";

const stats = [
  {
    icon: PiBookOpenTextBold,
    iconColor: "text-blue-900",
    count: "4",
    label: "Books Borrowed",
  },
  {
    icon: FaRegCalendarTimes,
    iconColor: "text-orange-600",
    count: "1",
    label: "Over Due",
  },
  {
    icon: FaClockRotateLeft,
    iconColor: "text-gray-900",
    count: "12",
    label: "Returned",
  },
  {
    icon: IoStar,
    iconColor: "text-blue-900",
    count: "4.5",
    label: "Member Rank",
  },
];

const Cards = () => {
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

export default Cards;
