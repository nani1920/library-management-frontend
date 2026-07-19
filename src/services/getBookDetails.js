/** @format */

const url = import.meta.env.VITE_API_URL;
const getBookDetails = async (bookId) => {
  const token = localStorage.getItem("LibraryAuthToken");
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url + `/books/${bookId}`, options);
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.error || "Failed to fetch book details");
  }
  return data.data;
};

export default getBookDetails;
