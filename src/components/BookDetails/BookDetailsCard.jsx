/** @format */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";
import { GrStorage } from "react-icons/gr";
import { ImSphere } from "react-icons/im";
import { MdOutlineShoppingCart } from "react-icons/md";
import { CiBookmark } from "react-icons/ci";
import { IoBookmark } from "react-icons/io5";
import useBookDetails from "../../hooks/useBookDetails";
import Spinner from "../common/Spinner";
import ConfirmationModal from "../common/ConfirmationModal";
import postBorrowBook from "../../services/postBorrowBook";
import postWishlist from "../../services/postWishlist";
import deleteWishlist from "../../services/deleteWishlist";
import getWishlist from "../../services/getWishlist";

const imgUrl =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJuIopukL-U4QIx8TOhSgOw1PvhWIeEYi6bW5NKXFuXw&s=10";
const description = `When seventeen-year-old Lyra Vale discovers a hidden city beneath the ruins of her forgotten homeland, she uncovers a secret that could change the fate of the world. Asteria was never destroyed by war, as history claims—it was erased to protect a power that was never meant to be found.

As old alliances break and a forgotten magic begins to awaken, Lyra must decide whether she will save a world that abandoned her—or let it burn with the lies that created it.`;

const BookDetailsCard = () => {
  const [showModal, setShowModal] = useState(false);
  const [isBorrowing, setIsBorrowing] = useState(false);
  const [borrowedSuccess, setBorrowedSuccess] = useState(false);
  const [borrowedError, setBorrowedError] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [wishlistMsg, setWishlistMsg] = useState("");
  const navigate = useNavigate();
  const { bookId } = useParams();
  const { book, loading, error } = useBookDetails(bookId);

  useEffect(() => {
    const checkWishlist = async () => {
      try {
        const data = await getWishlist();
        const alreadyWishlisted = data.some(
          (item) => item.bookId._id === bookId,
        );
        setIsWishlisted(alreadyWishlisted);
      } catch {}
    };
    if (bookId) checkWishlist();
  }, [bookId]);

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <div>{error}</div>;
  }
  const handleWishlist = async () => {
    try {
      setWishlistLoading(true);
      setWishlistMsg("");
      if (isWishlisted) {
        await deleteWishlist(bookId);
        setIsWishlisted(false);
        setWishlistMsg("Removed from wishlist");
      } else {
        await postWishlist(bookId);
        setIsWishlisted(true);
        setWishlistMsg("Added to wishlist!");
      }
    } catch (error) {
      setWishlistMsg(error.message);
    } finally {
      setWishlistLoading(false);
      setTimeout(() => setWishlistMsg(""), 2500);
    }
  };

  const handleBorrow = async () => {
    try {
      setIsBorrowing(true);
      await postBorrowBook(bookId);
      setBorrowedSuccess(true);
      setTimeout(() => {
        setBorrowedSuccess(false);
        setBorrowedError("");
        setShowModal(false);
      }, 1500);
    } catch (error) {
      setBorrowedError(error.message);
    } finally {
      setIsBorrowing(false);
    }
  };
  return (
    <div className="p-4 flex-1">
      <div className="flex items-center flex-1 cursor-pointer">
        <IoChevronBackOutline className="font-semibold text-2xl text-blue-900  cursor-pointer" />
        <p
          className="font-semibold text-xl text-blue-900 cursor-pointer"
          onClick={() => {
            navigate(-1);
          }}
        >
          Go Back
        </p>
      </div>
      <div className="mt-4">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/3 p-2 flex justify-center items-center">
            <img
              src={book.imgUrl ? book.imgUrl : imgUrl}
              alt={book.title}
              className="h-[300px] w-full md:w-[60%] lg:w-[80%] md:h-[330px]  object-fit cursor-pointer "
            />
          </div>
          <div className="w-full  md:w-1/3">
            <hr className="my-4 text-slate-300 md:hidden" />
            <div className="flex flex-col gap-2 md:p-4 ">
              <div className="flex gap-2">
                {book.availableQuantity > 0 ? (
                  <div className="bg-green-100 self-start py-1 rounded-lg px-3 mt-auto">
                    <p className="font-semibold text-sm">Available</p>
                  </div>
                ) : (
                  <div className="bg-orange-400 text-white self-start py-1 rounded-lg px-3 mt-auto">
                    <p className="font-semibold text-sm">Not Available</p>
                  </div>
                )}
                <div className="bg-blue-100 self-start py-1 rounded-lg px-3 mt-auto">
                  <p className="text-sm font-semibold">{book.category}</p>
                </div>
              </div>
              <div>
                <h1 className="font-bold text-2xl md:text-3xl text-gray-900">
                  {book.title}
                </h1>
                <p className="text-lg text-gray-600">by {book.author}</p>
                <p className="text-lg text-gray-600 font-bold">
                  ISBN:{" "}
                  <span className="font-semibold text-sm">{book.isbn}</span>
                </p>
              </div>
              <div className="my-4 grid grid-cols-2 md:gap-1  gap-3 sm:gap-4">
                <div className="h-[110px] rounded-xl border border-slate-300 bg-[#EEF4FF] shadow-md flex flex-col justify-center items-center gap-1">
                  <GrStorage className="text-xl text-blue-900" />
                  <p className="text-2xl sm:text-3xl font-semibold text-slate-600">
                    {book.availableQuantity} / {book.quantity}
                  </p>
                  <p className="text-xs font-semibold text-slate-400">
                    Quantity
                  </p>
                </div>
                <div className="h-[110px] rounded-xl border border-slate-300 bg-[#EEF4FF] shadow-md flex flex-col justify-center items-center gap-1">
                  <ImSphere className="text-xl text-blue-900" />
                  <p className="text-xl sm:text-2xl font-semibold text-slate-600">
                    English
                  </p>
                  <p className="text-xs font-semibold text-slate-400">
                    Language
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <h1 className="font-semibold text-xl ">Description</h1>
          <p className="text-gray-700  text-sm whitespace-pre-line">
            {description}
          </p>
        </div>
        <div className="my-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 transition cursor-pointer"
          >
            <MdOutlineShoppingCart className="text-xl" />
            Borrow Book
          </button>

          <button
            onClick={handleWishlist}
            disabled={wishlistLoading}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 border font-semibold rounded-lg transition cursor-pointer ${
              isWishlisted
                ? "bg-blue-900 border-blue-900 text-white hover:bg-blue-800"
                : "border-blue-900 text-blue-900 hover:bg-blue-50"
            } disabled:opacity-60`}
          >
            {isWishlisted ? (
              <IoBookmark className="text-xl" />
            ) : (
              <CiBookmark className="text-xl" />
            )}
            {wishlistLoading ? "..." : isWishlisted ? "Wishlisted" : "Wishlist"}
          </button>
        </div>
        {wishlistMsg && (
          <p
            className={`text-sm font-semibold ${
              wishlistMsg.includes("Added")
                ? "text-green-600"
                : wishlistMsg.includes("Removed")
                  ? "text-slate-500"
                  : "text-red-600"
            }`}
          >
            {wishlistMsg}
          </p>
        )}
      </div>
      <ConfirmationModal
        isOpen={showModal}
        title="Borrow Book"
        message={`Are you sure you want to borrow "${book.title}"?`}
        confirmText="Borrow"
        onClose={() => {
          (setShowModal(false), setBorrowedError(""));
        }}
        onConfirm={handleBorrow}
        loading={isBorrowing}
        success={borrowedSuccess}
        error={borrowedError}
      />
    </div>
  );
};

export default BookDetailsCard;
