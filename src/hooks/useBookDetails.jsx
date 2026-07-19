/** @format */
import { useState, useEffect } from "react";
import getBookDetails from "../services/getBookDetails";
const useBookDetails = (bookId) => {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const book = await getBookDetails(bookId);
        setBook(book);
      } catch (error) {
        console.log("error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (bookId) {
      fetchData();
    }
  }, [bookId]);

  return { book, loading, error };
};

export default useBookDetails;
