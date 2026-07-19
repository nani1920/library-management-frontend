/** @format */

import { useState, useEffect } from "react";
import getWishlist from "../services/getWishlist";
import deleteWishlist from "../services/deleteWishlist";

const useWishlist = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const data = await getWishlist();
        setBooks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  const removeFromWishlist = async (bookId) => {
    await deleteWishlist(bookId);
    setBooks((prev) => prev.filter((item) => item.bookId._id !== bookId));
  };

  return { books, loading, error, removeFromWishlist };
};

export default useWishlist;
