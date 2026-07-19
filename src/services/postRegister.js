/** @format */

const postRegister = async (userData) => {
  const url = import.meta.env.VITE_API_URL + "/auth/register";
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  };
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to login");
  }
  return data.data;
};

export default postRegister;
