/** @format */

import { FiAlertTriangle, FiHome } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-lg text-center bg-white rounded-2xl border border-slate-200 p-10 shadow-sm">
        <div className="flex justify-center">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-50">
            <FiAlertTriangle className="text-5xl text-blue-700" />
          </div>
        </div>

        <h1 className="mt-6 text-7xl font-bold text-slate-800">404</h1>

        <h2 className="mt-3 text-2xl font-semibold text-slate-700">
          Page Not Found
        </h2>

        <p className="mt-3 text-slate-500">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800 transition cursor-pointer"
        >
          <FiHome />
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
