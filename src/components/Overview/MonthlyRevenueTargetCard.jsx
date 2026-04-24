import { useState } from "react";

const clampPercent = (value) => {
  if (typeof value !== "number" || Number.isNaN(value)) return 0;
  if (value < 0) return 0;
  if (value > 100) return 100;
  return value;
};

const hasValue = (value) => value !== null && value !== undefined && value !== "";

const MonthlyRevenueTargetCard = ({ target, inProgress, percentage }) => {
  const [showSetTarget, setShowSetTarget] = useState(false);
  const [tempTarget, setTempTarget] = useState(String(target || ""));
  const [localTarget, setLocalTarget] = useState(target);

  const normalizedPercent = clampPercent(percentage);
  const displayInProgress = hasValue(inProgress) ? `£${inProgress}` : "N/A";
  const displayTarget = hasValue(localTarget) ? `£${localTarget}` : "N/A";

  return (
    <div className="bg-white col-span-2 rounded-[32px] p-8 border border-[#E7E7E7] shadow-sm relative overflow-hidden">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl text-[#454545]">Monthly Revenue Target</h3>
        <button
          onClick={() => setShowSetTarget(!showSetTarget)}
          className="text-teal-600 hover:text-teal-700 flex items-center gap-1"
        >
          <span className="text-xl">+</span> Set Target
        </button>
      </div>

      <div className="grid grid-cols-2 mb-2">
        <div>
          <p className="text-gray-400 text-sm font-medium mb-1">In Progress</p>
          <p className="text-3xl text-orange-500">{displayInProgress}</p>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-sm font-medium mb-1">Target</p>
          <p className="text-3xl text-green-600">{displayTarget}</p>
        </div>
      </div>

      <div className="relative mt-4">
        <div className="w-full bg-black/20 rounded-full h-4 overflow-hidden">
          <div
            className="bg-[#1A9C9C] h-full rounded-full"
            style={{ width: `${normalizedPercent}%` }}
          />
        </div>

        <div
          className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-[#D9D9D9] rounded-full border-4 border-white shadow-md"
          style={{ left: `calc(${normalizedPercent}% - 20px)` }}
        />
      </div>

      {showSetTarget && (
        <div className="absolute inset-0 z-20 bg-[#EAFBFF] flex flex-col items-center justify-center p-6 animate-in fade-in duration-200">
          <h3 className="text-xl font-bold text-[#1A9C9C] mb-4">Set Monthly Revenue Target</h3>
          <input
            type="number"
            value={tempTarget}
            onChange={(e) => setTempTarget(e.target.value)}
            className="bg-transparent text-4xl text-center text-gray-500 font-medium outline-none mb-6 w-full"
            autoFocus
          />
          <button
            onClick={() => {
              const nextTarget = Number(tempTarget);
              if (!Number.isNaN(nextTarget)) {
                setLocalTarget(nextTarget);
              }
              setShowSetTarget(false);
            }}
            className="bg-[#1A9C9C] text-white px-10 py-2 rounded-xl text-xl font-medium hover:bg-[#158080] transition-colors shadow-lg shadow-teal-100"
          >
            save
          </button>
        </div>
      )}
    </div>
  );
};

export default MonthlyRevenueTargetCard;
