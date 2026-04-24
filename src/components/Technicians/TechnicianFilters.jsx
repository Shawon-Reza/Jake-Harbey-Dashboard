const tabs = ["All", "Available", "On Job"];

const TechnicianFilters = ({ filterTab, setFilterTab, searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-8 flex flex-col gap-6 md:flex-row">
      <div className="group relative flex-1">
        <input
          type="text"
          placeholder="Search by name, specialty..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="w-1/2 rounded-xl border border-[#E7E7E7] bg-[#F9FBFC] py-3 pl-16 pr-8 text-lg font-medium transition-all focus:border-[#1A9C9C]/20 focus:outline-none focus:ring-4 focus:ring-[#1A9C9C]/5"
        />
      </div>

      <div className="flex gap-4 rounded-xl border border-[#E7E7E7] bg-[#F9FBFC] p-1.5">
        {tabs.map((tab) => {
          const tabValue = tab.toLowerCase().replace(" ", "-");
          return (
            <button
              key={tab}
              onClick={() => setFilterTab(tabValue)}
              className={`rounded-xl px-6 py-3 text-lg transition-all ${
                filterTab === tabValue
                  ? "bg-[#1A9C9C] text-white shadow-lg shadow-teal-100"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TechnicianFilters;
