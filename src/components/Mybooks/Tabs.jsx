/** @format */

const tabsList = [
  {
    id: "ALL",
    displayText: "All Books",
  },
  { id: "borrowed", displayText: "Borrowed" },
  { id: "returned", displayText: "Returned" },
];
const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="mt-6 border-b border-slate-200">
      <ul className="flex justify-center md:justify-start gap-2 md:gap-6 overflow-x-auto">
        {tabsList.map((tab) => (
          <li key={tab.id}>
            <button
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm md:text-base font-semibold whitespace-nowrap transition-all duration-200 border-b-2 outline-none cursor-pointer ${
                activeTab === tab.id
                  ? "border-blue-900 text-blue-900"
                  : "border-transparent text-slate-500 hover:text-blue-900 hover:border-slate-300"
              }`}
            >
              {tab.displayText}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tabs;
