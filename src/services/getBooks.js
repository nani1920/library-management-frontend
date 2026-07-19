/** @format */

const url = import.meta.env.VITE_API_URL;

const getBooks = async (page, limit = 10) => {
  const token = localStorage.getItem("LibraryAuthToken");
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(
    url + `/books?page=${page}&limit=${limit}`,
    options,
  );
  const data = await response.json();
  if (!response.ok || data.success === "false") {
    throw new Error(data.message || "Failed to Fetch Books");
  }
  return data.data;
};

export default getBooks;
