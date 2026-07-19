/** @format */

import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import NotFoundItems from "../common/NotFound";
import ConfirmationModal from "../common/ConfirmationModal";
import postBorrowBook from "../../services/postBorrowBook";
import { useState } from "react";

const fallbackImg =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJuIopukL-U4QIx8TOhSgOw1PvhWIeEYi6bW5NKXFuXw&s=10";

const WishlistBookCard = ({ books, onRemove }) => {
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [showBorrowModal, setShowBorrowModal] = useState(false);
  const [isBorrowing, setIsBorrowing] = useState(false);
  const [borrowSuccess, setBorrowSuccess] = useState(false);
  const [borrowError, setBorrowError] = useState("");

  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [removeSuccess, setRemoveSuccess] = useState(false);
  const [removeError, setRemoveError] = useState("");

  const handleBorrowClick = (bookId) => {
    setSelectedBookId(bookId);
    setBorrowError("");
    setShowBorrowModal(true);
  };

  const handleBorrow = async () => {
    try {
      setIsBorrowing(true);
      await postBorrowBook(selectedBookId);
      setBorrowSuccess(true);
      setTimeout(() => {
        setBorrowSuccess(false);
        setShowBorrowModal(false);
      }, 1500);
    } catch (error) {
      setBorrowError(error.message || "Failed to borrow book");
    } finally {
      setIsBorrowing(false);
    }
  };

  const handleRemoveClick = (bookId) => {
    setSelectedBookId(bookId);
    setRemoveError("");
    setShowRemoveModal(true);
  };

  const handleRemove = async () => {
    try {
      setIsRemoving(true);
      await onRemove(selectedBookId);
      setRemoveSuccess(true);
      setTimeout(() => {
        setRemoveSuccess(false);
        setShowRemoveModal(false);
      }, 1500);
    } catch (error) {
      setRemoveError(error.message || "Failed to remove from wishlist");
    } finally {
      setIsRemoving(false);
    }
  };

  if (books.length === 0) {
    return (
      <NotFoundItems
        title="Your Wishlist is Empty"
        message="Browse books and add them to your wishlist to save them for later."
      />
    );
  }

  return (
    <>
      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pt-2">
        {books.map((item) => {
          const book = item.bookId;
          return (
            <li
              key={item._id}
              className="border border-slate-300 rounded-xl p-4 flex gap-4 bg-white hover:shadow-md transition"
            >
              <div className="shrink-0">
                <img
                  src={book.imgUrl ? book.imgUrl : fallbackImg}
                  alt={book.title}
                  className="h-[120px] w-[90px] md:h-[150px] md:w-[110px] object-cover rounded-lg transition-transform duration-200 hover:scale-105"
                />
              </div>

              <div className="flex flex-col gap-2 min-w-0 flex-1">
                <Link to={`/books/${book._id}`}>
                  <h2 className="font-bold text-base md:text-lg text-slate-700 line-clamp-2 hover:text-blue-900 transition">
                    {book.title}
                  </h2>
                </Link>

                <p className="font-semibold text-xs md:text-sm text-slate-500">
                  {book.author}
                </p>

                <div className="self-start">
                  <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {book.category}
                  </span>
                </div>

                {book.availableQuantity > 0 ? (
                  <span className="self-start px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                    Available
                  </span>
                ) : (
                  <span className="self-start px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-600">
                    Not Available
                  </span>
                )}

                <div className="mt-auto flex gap-2 pt-1">
                  <button
                    onClick={() => handleBorrowClick(book._id)}
                    className="flex-1 flex justify-center items-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold bg-blue-900 text-white hover:bg-blue-800 transition cursor-pointer"
                  >
                    <MdOutlineShoppingCart className="text-sm" />
                    Borrow
                  </button>

                  <button
                    onClick={() => handleRemoveClick(book._id)}
                    className="flex justify-center items-center px-3 py-2 rounded-lg text-xs font-semibold border border-red-400 text-red-500 hover:bg-red-50 transition cursor-pointer"
                  >
                    <MdDeleteOutline className="text-base" />
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <ConfirmationModal
        isOpen={showBorrowModal}
        title="Borrow Book"
        message="Are you sure you want to borrow this book?"
        confirmText="Borrow"
        onConfirm={handleBorrow}
        onClose={() => {
          setShowBorrowModal(false);
          setBorrowError("");
        }}
        loading={isBorrowing}
        success={borrowSuccess}
        error={borrowError}
      />

      <ConfirmationModal
        isOpen={showRemoveModal}
        title="Remove from Wishlist"
        message="Are you sure you want to remove this book from your wishlist?"
        confirmText="Remove"
        onConfirm={handleRemove}
        onClose={() => {
          setShowRemoveModal(false);
          setRemoveError("");
        }}
        loading={isRemoving}
        success={removeSuccess}
        error={removeError}
      />
    </>
  );
};

export default WishlistBookCard;
