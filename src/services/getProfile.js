/** @format */

const url = import.meta.env.VITE_API_URL;

const getProfile = async () => {
  const token = localStorage.getItem("LibraryAuthToken");
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url + "/members/me", options);
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to fetch profile");
  }
  return data.data;
};

export default getProfile;
