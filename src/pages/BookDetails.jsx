/** @format */

import Sidebar from "../components/Sidebar";
import BookDetailsCard from "../components/BookDetails/BookDetailsCard";
const BookDetails = () => {
  return (
    <div className="flex">
      <Sidebar />
      <BookDetailsCard />
    </div>
  );
};
export default BookDetails;
