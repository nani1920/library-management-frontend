/** @format */

import { FiBookOpen } from "react-icons/fi";

const NotFoundItems = ({
  title = "No Books Found",
  message = "We couldn't find any books matching your search.",
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 bg-white border border-slate-200 rounded-xl shadow-sm">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-50">
        <FiBookOpen className="text-4xl text-blue-700" />
      </div>

      <h2 className="mt-5 text-2xl font-semibold text-slate-800">{title}</h2>

      <p className="mt-2 max-w-md text-center text-slate-500">{message}</p>
    </div>
  );
};

export default NotFoundItems;
