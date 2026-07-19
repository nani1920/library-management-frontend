/** @format */
import { useState, useEffect } from "react";
import getBooksHistory from "../services/getBooksHistory";
const useBooksHistory = () => {
  const [books, setBooks] = useState([]);
  const [borrowed, setBorrowed] = useState(0);
  const [returned, setReturned] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const updateExistingBook = (updatedBook) => {
    setBooks((prevBooks) => {
      const updatedBooks = prevBooks.map((book) =>
        book.bookId._id === updatedBook.bookId._id
          ? { ...updatedBook, status: "returned" }
          : book,
      );

      const totalBorrowed = updatedBooks.filter(
        (book) => book.status === "borrowed",
      );
      setBooks(updatedBooks);
      setBorrowed(totalBorrowed.length);
      setReturned(updatedBooks.length - totalBorrowed.length);

      return updatedBooks;
    });
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksList = await getBooksHistory();
        setBooks(booksList);
        const totalBorrowed = booksList.filter(
          (book) => book.status === "borrowed",
        );
        setBorrowed(totalBorrowed.length);
        setReturned(booksList.length - totalBorrowed.length);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);
  return {
    books,
    borrowed,
    returned,
    loading,
    error,
    setBooks,
    updateExistingBook,
  };
};
export default useBooksHistory;
