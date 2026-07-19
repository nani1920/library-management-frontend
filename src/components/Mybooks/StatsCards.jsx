/** @format */
import { MdMenuBook } from "react-icons/md";
import { FaHistory } from "react-icons/fa";

const MyBooksStats = ({ borrowed, returned }) => {
  return (
    <div className="flex flex-wrap gap-4 mt-5">
      <div className="w-full sm:w-[180px] md:w-[220px] p-4 bg-blue-900 rounded-xl flex items-center gap-4 shadow-sm">
        <div className="h-12 w-12 rounded-full bg-blue-800 flex items-center justify-center">
          <MdMenuBook className="text-3xl text-white" />
        </div>

        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-white">{borrowed}</h2>
          <p className="text-xs font-medium text-blue-100">Borrowed</p>
        </div>
      </div>

      <div className="w-full sm:w-[180px] md:w-[220px] p-4 bg-white border border-slate-200 rounded-xl flex items-center gap-4 shadow-sm">
        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
          <FaHistory className="text-2xl text-green-700" />
        </div>

        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-slate-800">{returned}</h2>
          <p className="text-xs font-medium text-slate-500">Returned</p>
        </div>
      </div>
    </div>
  );
};

export default MyBooksStats;
