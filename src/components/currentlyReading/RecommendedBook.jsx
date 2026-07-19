/** @format */
import useRecommendedBooks from "../../hooks/useRecommendedBooks";
import RecommendedBookCard from "./RecommendedBookCard";
import { useState, useEffect } from "react";
import Spinner from "../common/Spinner";
import NotFoundItems from "../common/NotFound";
const RecommendedBooks = () => {
  const { loading, error, books } = useRecommendedBooks();

  if (loading) return <Spinner />;
  if (error) return <div>{error}</div>;
  return (
    <>
      <ul className="mt-3 py-4 flex overflow-x-auto scroll-smooth gap-3 ">
        {books.length === 0 ? (
          <NotFoundItems />
        ) : (
          books.map((book) => (
            <RecommendedBookCard key={book._id} bookDetails={book} />
          ))
        )}
      </ul>
    </>
  );
};
export default RecommendedBooks;
