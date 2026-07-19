/** @format */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../pages/register";
import Login from "../pages/login";
import Home from "../pages/home";
import Books from "../pages/Books";
import BookDetails from "../pages/BookDetails";
import MyBooks from "../pages/MyBooks";
import Wishlist from "../pages/Wishlist";
import Profile from "../pages/Profile";
import PageNotFound from "../pages/PageNotFound";
import ProtectedRoute from "../components/common/ProtectedRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/books" element={<Books />}></Route>
          <Route path="/books/me" element={<MyBooks />}></Route>
          <Route path="/books/saved" element={<Wishlist />}></Route>
          <Route path="/books/:bookId" element={<BookDetails />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Route>

        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
