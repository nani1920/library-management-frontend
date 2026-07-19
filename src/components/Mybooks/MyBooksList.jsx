/** @format */

import MyBooksStats from "./StatsCards";
import Tabs from "./Tabs";
import BookCard from "./BookCard";
import { useState, useEffect } from "react";
import useBooksHistory from "../../hooks/useBooksHistory";
import Spinner from "../common/Spinner";
import ConfirmationModal from "../common/ConfirmationModal";
import postReturnBook from "../../services/postReturnBook";
const MyBooksList = () => {
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [returnedSuccess, setReturnedSuccess] = useState(false);
  const [returnedError, setReturnedError] = useState(null);
  const [activeTab, setActiveTab] = useState("ALL");
  const {
    books,
    borrowed,
    returned,
    loading,
    error,
    setBooks,
    updateExistingBook,
  } = useBooksHistory();
  const filteredBooks =
    activeTab === "ALL"
      ? books
      : books.filter((book) => book.status === activeTab.toLowerCase());
  const handleBookSelect = (bookId) => {
    setSelectedBookId(bookId);
    setShowModal(true);
  };
  const handleReturn = async () => {
    try {
      setIsReturning(true);
      await postReturnBook(selectedBookId);

      const book = books.find((book) => book.bookId._id === selectedBookId);
      updateExistingBook(book);
      setReturnedSuccess(true);
      setTimeout(() => {
        setReturnedSuccess(false);
        setReturnedError(null);
        setShowModal(false);
      }, 1500);
    } catch (error) {
      setReturnedError(error.message);
    } finally {
      setIsReturning(false);
    }
  };
  if (loading) return <Spinner />;
  // if (error) return <div>{error}</div>;
  return (
    <>
      <div className="pb-13">
        <MyBooksStats borrowed={borrowed} returned={returned} />
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <BookCard
          books={filteredBooks}
          activeTab={activeTab}
          handleBookSelect={handleBookSelect}
        />
      </div>
      <ConfirmationModal
        isOpen={showModal}
        title="Return Book"
        message="Are you sure you want to return this book?"
        confirmText="Return"
        onConfirm={handleReturn}
        onClose={() => {
          (setShowModal(false), setReturnedError(""));
        }}
        loading={isReturning}
        success={returnedSuccess}
        error={returnedError}
      />
    </>
  );
};
export default MyBooksList;
