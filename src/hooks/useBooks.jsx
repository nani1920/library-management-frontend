/** @format */
import { useState, useEffect } from "react";
import getBooks from "../services/getBooks";

const useBooks = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [books, setBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filterBooks = (input) => {
    const search = input.trim().toLowerCase();

    if (!search) {
      setBooks(allBooks);
      return;
    }

    setBooks(
      allBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(search) ||
          book.author.toLowerCase().includes(search),
      ),
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBooks(page);

        setBooks(data.books);
        setAllBooks(data.books);
        setTotalBooks(data.totalItems);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error(error);
        setError(error.message || "Failed to fetch books.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  return {
    books,
    totalBooks,
    loading,
    error,
    filterBooks,
    page,
    setPage,
    totalPages,
  };
};

export default useBooks;
