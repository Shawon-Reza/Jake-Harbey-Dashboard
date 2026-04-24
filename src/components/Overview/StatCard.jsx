import { ArrowDownRight, ArrowUpRight } from "lucide-react";

const TrendIcon = ({ trend, className }) => {
  if (trend === "down") {
    return <ArrowDownRight className={className} />;
  }

  return <ArrowUpRight className={className} />;
};

const StatCard = ({
  title,
  value,
  growthPercentage,
  trend,
  variant = "light",
  footerText = "From last week",
  note,
}) => {
  const isDark = variant === "dark";
  const isDown = trend === "down";
  const hasGrowth = typeof growthPercentage === "number" && !Number.isNaN(growthPercentage);
  const displayValue =
    value !== null && value !== undefined && value !== "" ? value : "N/A";
  const displayTrend = trend === "up" || trend === "down" ? trend : null;

  return (
    <div
      className={
        isDark
          ? "bg-[#0D7E8A] rounded-[32px] p-6 flex flex-col justify-between text-white shadow-md relative overflow-hidden"
          : "bg-white rounded-[32px] p-6 flex flex-col justify-between border border-[#E7E7E7] shadow-sm"
      }
    >
      <div className="flex justify-between items-start mb-6">
        <h3 className={isDark ? "text-lg opacity-90" : "text-gray-500 text-lg"}>
          {title}
        </h3>
        {displayTrend ? (
          <TrendIcon
            trend={displayTrend}
            className={isDark ? "w-6 h-6 opacity-80" : "w-5 h-5 text-gray-400"}
          />
        ) : null}
      </div>

      <div className="flex items-end justify-between gap-2">
        <p className={isDark ? "text-4xl font-medium" : "text-4xl font-medium text-[#2A2A2A]"}>
          {displayValue}
        </p>

        {hasGrowth ? (
          <div className="flex flex-col items-end">
            <span
              className={`text-sm font-semibold flex items-center ${
                isDown ? "text-red-500" : isDark ? "text-emerald-200" : "text-green-600"
              }`}
            >
              {displayTrend ? <TrendIcon trend={displayTrend} className="w-4 h-4" /> : null}
              {Math.abs(growthPercentage)}%
            </span>
            <span className={isDark ? "text-white/60 text-xs" : "text-gray-400 text-xs"}>
              {footerText}
            </span>
          </div>
        ) : (
          <p className={note?.isAlert ? "text-red-500 text-sm font-medium" : "text-gray-500 text-sm font-medium"}>
            {note?.text || "N/A"}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
