/** @format */

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Spinner from "../components/common/Spinner";
import useProfile from "../hooks/useProfile";
import useBooksHistory from "../hooks/useBooksHistory";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLogOut } from "react-icons/fi";
import { MdMenuBook } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { IoBookmarkOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Profile = () => {
  const { profile, loading, error } = useProfile();
  const { borrowed, returned } = useBooksHistory();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("LibraryAuthToken");
    navigate("/login");
  };

  const joinedDate = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="flex max-h-screen">
      <Sidebar />

      <div className="p-3 flex-1 overflow-y-scroll pb-20">
        <div className="border-b border-slate-400 pb-2 flex items-center gap-2">
          <FiUser className="text-blue-900 text-2xl" />
          <h1 className="text-2xl md:text-3xl font-semibold text-blue-900">
            My Profile
          </h1>
        </div>

        {loading ? (
          <Spinner />
        ) : error ? (
          <p className="mt-6 text-center text-red-600 font-semibold">{error}</p>
        ) : (
          <div className="mt-6 flex flex-col gap-6 max-w-2xl">
            <div className="flex items-center gap-5 p-5 border border-slate-200 rounded-xl bg-white shadow-sm">
              <div className="h-16 w-16 rounded-full bg-blue-900 flex items-center justify-center shrink-0">
                <span className="text-white text-2xl font-bold uppercase">
                  {profile.name?.charAt(0)}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {profile.name}
                </h2>
                <span className="mt-1 inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-900 capitalize">
                  {profile.role}
                </span>
                <p className="mt-1 text-xs text-slate-400">
                  Member since {joinedDate}
                </p>
              </div>
            </div>

            <div className="p-5 border border-slate-200 rounded-xl bg-white shadow-sm flex flex-col gap-4">
              <h3 className="font-semibold text-slate-700">
                Account Information
              </h3>
              <div className="flex items-center gap-3">
                <FiUser className="text-blue-900 text-lg shrink-0" />
                <div>
                  <p className="text-xs text-slate-400">Full Name</p>
                  <p className="font-semibold text-slate-700">{profile.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FiMail className="text-blue-900 text-lg shrink-0" />
                <div>
                  <p className="text-xs text-slate-400">Email Address</p>
                  <p className="font-semibold text-slate-700">
                    {profile.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 border border-slate-200 rounded-xl bg-white shadow-sm">
              <h3 className="font-semibold text-slate-700 mb-4">
                Reading Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-blue-900 rounded-xl">
                  <div className="h-10 w-10 rounded-full bg-blue-800 flex items-center justify-center">
                    <MdMenuBook className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{borrowed}</p>
                    <p className="text-xs text-blue-100">Borrowed</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <FaHistory className="text-green-700 text-lg" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-800">
                      {returned}
                    </p>
                    <p className="text-xs text-slate-500">Returned</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 border border-slate-200 rounded-xl bg-white shadow-sm">
              <h3 className="font-semibold text-slate-700 mb-4">Quick Links</h3>
              <div className="flex flex-col gap-2">
                <Link
                  to="/books"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition"
                >
                  <MdMenuBook className="text-blue-900 text-xl" />
                  <span className="font-semibold text-sm text-slate-700">
                    Browse Books
                  </span>
                </Link>
                <Link
                  to="/books/me"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition"
                >
                  <FaHistory className="text-blue-900 text-xl" />
                  <span className="font-semibold text-sm text-slate-700">
                    My Books
                  </span>
                </Link>
                <Link
                  to="/books/saved"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition"
                >
                  <IoBookmarkOutline className="text-blue-900 text-xl" />
                  <span className="font-semibold text-sm text-slate-700">
                    Wishlist
                  </span>
                </Link>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl border border-red-400 text-red-500 font-semibold hover:bg-red-50 transition cursor-pointer"
            >
              <FiLogOut className="text-lg" />
              Logout
            </button>
          </div>
        )}
      </div>

      <Navbar />
    </div>
  );
};

export default Profile;
