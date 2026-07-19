/** @format */
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MyBooksList from "../components/Mybooks/MyBooksList";
const MyBooks = () => {
  return (
    <div className="flex max-h-screen">
      <Sidebar />
      <div className="p-3 flex-1 flex-col overflow-y-scroll">
        <div className="border-b border-slate-400 ">
          <h1 className="text-2xl md:text-3xl font-semibold text-blue-900">
            My Books
          </h1>
        </div>
        <MyBooksList />
      </div>
      <Navbar />
    </div>
  );
};

export default MyBooks;
