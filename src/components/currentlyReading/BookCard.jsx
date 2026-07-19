/** @format */
import { Link } from "react-router-dom";
const BookCard = (props) => {
  const { bookDetails, handleBookSelect } = props;
  const { bookId: book } = bookDetails;
  const imgUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8bPquh2GukBG4XuVuzpG3t4zM_wpEAvZb5-7hOXPwyA&s=10";

  return (
    <>
      <li className="p-3 mt-3 border border-slate-200 shadow-md flex justify-around  rounded-lg md:w-full">
        <div className="w-1/3 flex justify-center items-center">
          <img
            src={book.imgUrl ? book.imgUrl : imgUrl}
            alt={book.title}
            className="h-[140px] w-[100px] object-cover"
          />
        </div>
        <div className="pl-2 w-full flex flex-1 flex-col gap-2">
          <div className="self-start bg-blue-100 px-2 py-1 rounded-lg ">
            <p className="text-xs font-semibold">{book.category}</p>
          </div>
          <h1 className="font-bold text-lg">{book.title}</h1>
          <p className="font-normal text-xs text-slate-400">{book.author}</p>
          <div className="flex gap-2">
            <button
              onClick={() => handleBookSelect(book._id)}
              className=" flex-1 mt-auto py-2 bg-blue-900 text-white font-semibold  rounded-lg cursor-pointer  outline-none"
            >
              Return
            </button>
            <Link
              to={`books/${book._id}`}
              className="flex-1 justify-center items-center mt-auto py-2 border border-blue-900 text-blue-900 font-semibold rounded-lg cursor-pointer hidden md:inline-flex "
            >
              Details
            </Link>
          </div>
        </div>
      </li>
    </>
  );
};
export default BookCard;
