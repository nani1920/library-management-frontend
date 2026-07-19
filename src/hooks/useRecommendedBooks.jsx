/** @format */
import { useState, useEffect } from "react";
import getRecommendedBooks from "../services/getRecommendedBooks";
const useRecommendedBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const booksList = await getRecommendedBooks();
        const { books } = booksList;
        setBooks(books);
      } catch (error) {
        console.error("Error fetching books:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return { loading, error, books };
};
export default useRecommendedBooks;
