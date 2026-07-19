/** @format */

import { useState } from "react";
import Spinner from "../components/common/Spinner";
import postBorrowBook from "../services/postBorrowBook";
/** @format */

const useBorrowBook = (bookId) => {
  const [borrowed, setBorrowed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const borrowBook = async () => {
      try {
        const borrowed = await postBorrowBook(bookId);
        setBorrowed(borrowed);
      } catch (error) {
        setError(error.message || "Failed To Borrow Book");
      } finally {
        setLoading(false);
      }
    };
    borrowBook();
  }, []);
  return { borrowed, loading, error };
};
export default useBorrowBook;
