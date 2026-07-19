/** @format */
import { Link } from "react-router-dom";

const RecommendedBookCard = (props) => {
  const { bookDetails } = props;
  const imgUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJuIopukL-U4QIx8TOhSgOw1PvhWIeEYi6bW5NKXFuXw&s=10";

  return (
    <>
      <Link
        to={`/books/${bookDetails._id}`}
        className="mt-2 p-2 gap-1 w-[200px] flex flex-col justify-center items-center border border-slate-200 rounded-lg shadow-md cursor-pointer"
      >
        <div className="">
          <img
            src={bookDetails.imgUrl ? bookDetails.imgUrl : imgUrl}
            alt={bookDetails.title}
            className="h-[140px] w-[200px] object-cover"
          />
        </div>
        <div className="pl-2 w-[130px]">
          <h1 className="font-semibold text-md truncate">
            {bookDetails.title}
          </h1>
          <p className="font-normal text-xs text-slate-400">
            {bookDetails.author}
          </p>
        </div>
      </Link>
    </>
  );
};
export default RecommendedBookCard;
