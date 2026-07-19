/** @format */
import { useState, useEffect } from "react";
import getCurrentlyReading from "../services/getCurrentlyReading";
const useCurrentlyReadingBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const booksList = await getCurrentlyReading();
        setBooks(booksList);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return { loading, error, books, setBooks };
};
export default useCurrentlyReadingBooks;
