/** @format */

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Spinner from "../components/common/Spinner";
import WishlistBookCard from "../components/Wishlist/WishlistBookCard";
import useWishlist from "../hooks/useWishlist";
import { IoBookmarkOutline } from "react-icons/io5";

const Wishlist = () => {
  const { books, loading, error, removeFromWishlist } = useWishlist();

  return (
    <div className="flex max-h-screen">
      <Sidebar />

      <div className="p-3 flex-1 flex-col overflow-y-scroll">
        <div className="border-b border-slate-400 pb-2 flex items-center gap-2">
          <IoBookmarkOutline className="text-blue-900 text-2xl" />
          <h1 className="text-2xl md:text-3xl font-semibold text-blue-900">
            My Wishlist
          </h1>
        </div>

        <div className="mt-4 mb-2 flex items-center gap-3 bg-[#EEF4FF] border border-blue-100 rounded-xl p-4">
          <div>
            <p className="text-sm font-medium text-slate-500">Saved Books</p>
            <h2 className="text-3xl font-bold text-blue-900 mt-1">
              {books.length} Books
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Books you've saved to read later.
            </p>
          </div>
        </div>

        <div className="pb-16">
          {loading ? (
            <Spinner />
          ) : error ? (
            <p className="mt-6 text-center text-red-600 font-semibold">
              {error}
            </p>
          ) : (
            <WishlistBookCard books={books} onRemove={removeFromWishlist} />
          )}
        </div>
      </div>

      <Navbar />
    </div>
  );
};

export default Wishlist;
