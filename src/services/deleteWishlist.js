/** @format */

const url = import.meta.env.VITE_API_URL;

const deleteWishlist = async (bookId) => {
  const token = localStorage.getItem("LibraryAuthToken");
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url + `/wishlist/${bookId}`, options);
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to remove book from wishlist");
  }
  return data.data;
};

export default deleteWishlist;
