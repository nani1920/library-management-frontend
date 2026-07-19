/** @format */

import { Navigate, Outlet } from "react-router-dom";
/** @format */

const ProtectedRoute = () => {
  const token = localStorage.getItem("LibraryAuthToken");
  if (!token) return <Navigate to="/login" replace />;
  return <Outlet />;
};

export default ProtectedRoute;
