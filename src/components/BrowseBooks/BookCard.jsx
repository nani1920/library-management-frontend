/** @format */
import { Link } from "react-router-dom";
import ConfirmationModal from "../common/ConfirmationModal";
import { useState } from "react";
import postBorrowBook from "../../services/postBorrowBook";
const imgUrl =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJuIopukL-U4QIx8TOhSgOw1PvhWIeEYi6bW5NKXFuXw&s=10";

const Card = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [isBorrowing, setIsBorrowing] = useState(false);
  const [borrowedSuccess, setBorrowedSuccess] = useState(false);
  const [borrowedError, setBorrowedError] = useState(false);
  const { bookDetails: book } = props;

  const handleBorrow = async () => {
    try {
      setIsBorrowing(true);
      setBorrowedError("");

      await postBorrowBook(book._id);

      setBorrowedSuccess(true);

      setTimeout(() => {
        setBorrowedSuccess(false);
        setShowModal(false);
      }, 1500);
    } catch (error) {
      console.log(error);
      setBorrowedError(error.message || "Failed to borrow book");
    } finally {
      setIsBorrowing(false);
    }
  };

  return (
    <>
      <Link to={`/books/${book._id}`}>
        <div className="bg-gray-200 w-full rounded-xl overflow-hidden">
          <img
            src={book.imgUrl ? book.imgUrl : imgUrl}
            alt={book.title}
            className="h-[120px] md:h-[230px] w-full object-cover transition-all duration-200 hover:scale-110 cursor-pointer"
          />
        </div>

        <div className="py-2 flex flex-col gap-1">
          <div className="self-start bg-blue-100 px-2 py-1 rounded-lg">
            <p className="text-xs font-semibold">{book.category}</p>
          </div>

          <h2 className="font-semibold text-[18px] truncate text-blue-900">
            {book.title}
          </h2>

          <p className="text-[10px] text-gray-500">by {book.author}</p>
        </div>
      </Link>

      <hr className="text-slate-100" />

      <div className="flex gap-2">
        <Link
          to={`/books/${book._id}`}
          className="hidden md:inline-flex flex-1 justify-center items-center mt-1 text-md font-semibold border border-blue-900 text-blue-900 px-2 py-1 rounded cursor-pointer"
        >
          Details
        </Link>

        <button
          onClick={() => setShowModal(true)}
          className="flex-1 mt-1 text-md font-semibold bg-blue-900 text-white px-2 py-1 rounded cursor-pointer"
        >
          Borrow
        </button>
      </div>

      <ConfirmationModal
        isOpen={showModal}
        title="Borrow Book"
        message={`Do you want to borrow the book ${book.title}`}
        confirmText="Borrow"
        onClose={() => {
          setShowModal(false);
          setBorrowedError("");
        }}
        onConfirm={handleBorrow}
        loading={isBorrowing}
        success={borrowedSuccess}
        error={borrowedError}
      />
    </>
  );
};
const BookCard = ({ bookDetails }) => {
  return (
    <>
      <div className="block md:hidden border border-gray-200 rounded-lg p-3 my-3 transition-all duration-200 hover:shadow-lg">
        <Card bookDetails={bookDetails} />
      </div>

      {/* Desktop-View*/}
      <div className="hidden md:block border border-gray-200 rounded-lg p-3 my-3 transition-all duration-200 hover:shadow-lg">
        <Card bookDetails={bookDetails} />
      </div>
    </>
  );
};
export default BookCard;
