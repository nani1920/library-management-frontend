/** @format */
import NotFoundItems from "../common/NotFound";
const imgUrl =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJuIopukL-U4QIx8TOhSgOw1PvhWIeEYi6bW5NKXFuXw&s=10";

const BookCard = ({ books, handleBookSelect }) => {
  return (
    <div>
      {books.length === 0 ? (
        <NotFoundItems />
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pt-2">
          {books.map((book) => (
            <li
              key={book._id}
              className="border border-slate-300 rounded-xl p-4 flex gap-4 bg-white hover:shadow-md transition"
            >
              <div className="shrink-0">
                <img
                  src={imgUrl}
                  alt={book.bookId.title}
                  className="
                h-[120px] w-[90px] md:h-[150px] md:w-[110px]lg:h-[170px] lg:w-[120px] object-fit rounded-lg transition-transform duration-200 hover:scale-105
                "
                />
              </div>

              <div className="flex flex-col gap-2 min-w-0">
                <h2 className="font-bold text-base md:text-lg text-slate-700 line-clamp-2">
                  {book.bookId.title}
                </h2>

                <p className="font-semibold text-xs md:text-sm text-slate-500">
                  {book.bookId.author}
                </p>

                <div className="self-start mt-1">
                  <span className="items-center px-3 py-1 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {book.bookId.category}
                  </span>
                </div>

                {book.status && (
                  <div className="mt-auto flex items-center gap-2 pt-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        book.status.toLowerCase() === "borrowed"
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {book.status}
                    </span>

                    {book.status.toLowerCase() === "borrowed" && (
                      <button
                        onClick={() => handleBookSelect(book.bookId._id)}
                        className="px-3  py-1 rounded-lg text-xs font-semibold border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white transition cursor-pointer"
                      >
                        Return
                      </button>
                    )}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookCard;
