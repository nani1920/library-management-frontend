/** @format */

/** @format */
import { Link, useNavigate } from "react-router-dom";
import BookCard from "./BookCard";
import { useState, useEffect } from "react";
import { FaRegCompass } from "react-icons/fa6";
import { MdOutlineHistoryToggleOff } from "react-icons/md";
import { IoBookmarkOutline } from "react-icons/io5";
import useCurrentlyReadingBooks from "../../hooks/useCurrentlyReading";
import Spinner from "../common/Spinner";
import ConfirmationModal from "../common/ConfirmationModal";
import postReturnBook from "../../services/postReturnBook";
import NotFoundItems from "../common/NotFound";

const CurrentlyReading = () => {
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [returnedSuccess, setReturnedSuccess] = useState(false);
  const [returnedError, setReturnedError] = useState("");
  const { loading, error, books, setBooks } = useCurrentlyReadingBooks();
  const navigate = useNavigate();
  const handleBookSelect = (bookId) => {
    setSelectedBookId(bookId);
    setShowModal(true);
  };
  const handleReturn = async () => {
    try {
      setIsReturning(true);
      await postReturnBook(selectedBookId);
      setReturnedSuccess(true);
      setBooks(books.filter((book) => book.bookId._id !== selectedBookId));
      setTimeout(() => {
        setReturnedSuccess(false);
        setReturnedError("");
        setShowModal(false);
      }, 1500);
    } catch (error) {
      setReturnedError(error.message);
    } finally {
      setIsReturning(false);
    }
  };
  if (loading) return <Spinner />;
  // if (error)
  //   return (
  //     <NotFoundItems
  //       title="No Books Found"
  //       message="You are not borrowed any books."
  //     />
  //   );
  return (
    <>
      <div className="flex">
        <ul className="mt-5 flex-3">
          {books.length === 0 ? (
            <NotFoundItems />
          ) : (
            books.map((book) => (
              <BookCard
                key={book._id}
                bookDetails={book}
                handleBookSelect={handleBookSelect}
              />
            ))
          )}
        </ul>
        <div className="flex-2 hidden md:inline-flex flex-col gap-2 items-center">
          <div className="mt-7 p-5 bg-[#1e3a8a] w-[300px] rounded-lg">
            <h1 className="text-white text-xl font-semibold">Quick Actions</h1>
            <div className="mt-2 flex flex-col gap-2  ">
              <Link
                to="/books"
                className="flex justify-start items-center bg-blue-900 text-[#90a8ff] px-6 py-2 rounded-lg border border-[#5368a6] cursor-pointer"
              >
                <FaRegCompass className="text-[#90a8ff] mx-2 text-xl" /> Borrow
                Book
              </Link>
              <Link
                to="/books/me"
                className="flex justify-start items-center bg-blue-900 text-[#90a8ff] px-6 py-2 rounded-lg border border-[#5368a6] cursor-pointer"
              >
                <MdOutlineHistoryToggleOff className="text-[#90a8ff] mx-2 text-2xl" />{" "}
                History
              </Link>
              <Link
                to="/saved"
                className="flex justify-start items-center bg-blue-900 text-[#90a8ff] px-6 py-2 rounded-lg border border-[#5368a6] cursor-pointer"
              >
                <IoBookmarkOutline className="text-[#90a8ff] mx-2 text-2xl" />{" "}
                Wishlist
              </Link>
            </div>
          </div>
          <div className="mt-7 p-5 border border-slate-200 w-[300px] rounded-lg">
            <h1 className="font-semibold text-xl">New Books</h1>
            <div className="flex flex-col justify-between items-start gap-2 mt-2">
              <button
                onClick={() => navigate("/books")}
                className="m-auto border border-[#1e3a8a] w-full rounded-lg py-1 text-md font-semibold text-[#1e3a8a] cursor-pointer"
              >
                Educated
              </button>
              <button
                onClick={() => navigate("/books")}
                className="m-auto border border-[#1e3a8a] w-full rounded-lg py-1 text-md font-semibold text-[#1e3a8a] cursor-pointer"
              >
                The Power of Knowledge
              </button>
              <button
                onClick={() => navigate("/books")}
                className="m-auto border border-[#1e3a8a] w-full rounded-lg py-1 text-md font-semibold text-[#1e3a8a] cursor-pointer"
              >
                Deep Work
              </button>
            </div>
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={showModal}
        title="Return Book"
        message="Are you sure you want to return this book?"
        confirmText="Return"
        onConfirm={handleReturn}
        onClose={() => setShowModal(false)}
        loading={isReturning}
        success={returnedSuccess}
        error={returnedError}
      />
    </>
  );
};
export default CurrentlyReading;
