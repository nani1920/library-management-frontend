/** @format */

import Header from "../components/Header";
import StatsCards from "../components/StatsCards";
import Tabs from "../components/Tabs";
import CurrentlyReading from "../components/currentlyReading/CurrentlyReading";
import RecommendedBooks from "../components/currentlyReading/RecommendedBook";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";

const SectionHeader = ({ title, action, nav }) => (
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-xl font-bold text-slate-900">{title}</h2>

    <Link
      to={nav}
      className="text-sm md:text-base font-semibold text-blue-900 hover:text-blue-700"
    >
      {action}
    </Link>
  </div>
);

const Home = () => {
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 overflow-y-auto pt-5 pb-20 scrollbar-hide">
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          <Header />

          <section className="mt-8">
            <p className="text-sm font-semibold text-slate-500">
              👋 Welcome Back! Nani
            </p>

            <h1 className="mt-1 text-3xl font-bold text-blue-900">
              Your Reading Desk
            </h1>
          </section>

          <section className="mt-6">
            <StatsCards />
          </section>

          <section className="mt-6">
            <Tabs />
          </section>

          <section className="mt-10">
            <SectionHeader
              title="Currently Reading"
              action="View All"
              nav="/books/me"
            />

            <CurrentlyReading />
          </section>

          <section className="mt-10">
            <SectionHeader
              title="Recommended For You"
              action="Explore"
              nav="/books"
            />

            <RecommendedBooks />
          </section>
        </div>
      </main>

      <Navbar />
    </div>
  );
};

export default Home;
