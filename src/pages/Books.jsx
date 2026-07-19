/** @format */
import Sidebar from "../components/Sidebar";
import { GoSearch } from "react-icons/go";
import { useState, useEffect } from "react";
import BookCard from "../components/BrowseBooks/BookCard";
import Navbar from "../components/Navbar";
import useBooks from "../hooks/useBooks";
import Spinner from "../components/common/Spinner";
import NotFoundItems from "../components/common/NotFound";
import Pagination from "../components/common/Pagination";

const Books = () => {
  const {
    books,
    totalBooks,
    loading,
    error,
    filterBooks,
    page,
    setPage,
    totalPages,
  } = useBooks();
  const handleSearchInput = (e) => {
    filterBooks(e.target.value);
  };
  if (loading) {
    return (
      <div className="flex h-screen pb-15">
        <Sidebar />
        <Spinner />;
        <Navbar />
      </div>
    );
  }
  if (error) {
    return <div>Error</div>;
  }
  return (
    <div className="flex h-screen pb-15">
      <Sidebar />
      <div className="px-5 py-3 flex-1 overflow-y-scroll">
        <h1 className="text-3xl font-bold py-3 text-blue-900">
          Browse Collections
        </h1>
        <div>
          <div className="flex items-center w-full md:max-w-md bg-[#eef4ff] rounded-lg px-4 py-3">
            <GoSearch className="text-gray-500 text-xl" />

            <input
              type="text"
              placeholder="Search title or author"
              className="ml-3 flex-1 bg-transparent outline-none text-sm sm:text-base"
              onChange={handleSearchInput}
            />
          </div>
        </div>
        <div className="mt-5 mb-6 flex flex-col md:flex-row md:items-center md:justify-between bg-[#EEF4FF] border border-blue-100 rounded-xl p-4">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Library Collection
            </p>

            <h2 className="text-3xl font-bold text-blue-900 mt-1">
              {totalBooks} Books
            </h2>

            <p className="mt-1 text-sm text-slate-600">
              Browse our complete collection of books across multiple categories
              and discover your next favorite read.
            </p>
          </div>

          <div className="mt-4 md:mt-0 md:text-right">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
              📚 Collection Available
            </div>
          </div>
        </div>
        {books.length === 0 ? (
          <NotFoundItems />
        ) : (
          <ul
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6
 gap-3 md:gap-6"
          >
            {books.map((book) => {
              return <BookCard key={book._id} bookDetails={book} />;
            })}
          </ul>
        )}
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
        <Navbar />
      </div>
    </div>
  );
};
export default Books;
