/** @format */

const url = import.meta.env.VITE_API_URL;
const getRecommendedBooks = async () => {
  const token = localStorage.getItem("LibraryAuthToken");
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url + "/books?page=1&limit=5", options);
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to fetch books");
  }
  return data.data;
};
export default getRecommendedBooks;
