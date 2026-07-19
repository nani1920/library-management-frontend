/** @format */
const url = import.meta.env.VITE_API_URL;

const postBorrowBook = async (bookId) => {
  const token = localStorage.getItem("LibraryAuthToken");
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      bookId: bookId,
    }),
  };
  const response = await fetch(url + `/books/${bookId}/borrow`, options);
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to borrow book");
  }
  return data;
};
export default postBorrowBook;
