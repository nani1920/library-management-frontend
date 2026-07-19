/** @format */

const url = import.meta.env.VITE_API_URL;
const getBooksHistory = async () => {
  const token = localStorage.getItem("LibraryAuthToken");
  const options = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url + "/members/me/history", options);
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to fetch books history");
  }
  return data.data;
};
export default getBooksHistory;
