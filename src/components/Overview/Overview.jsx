import { useMemo } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDashboardOverviewQuery } from "../../Api/dashboardApi";
import MonthlyRevenueTargetCard from "./MonthlyRevenueTargetCard";
import StatCard from "./StatCard";
import {
  formatCurrency,
  mapCustomerGrowth,
  mapRevenueTrend,
  mapTechnicians,
} from "./dashboardHelpers";

const hasNumericValue = (arr, key) =>
  Array.isArray(arr) && arr.some((item) => typeof item?.[key] === "number");

const chartValueFormatter = (value, name) => {
  const label = name === "value" ? "Revenue" : name === "target" ? "Prev Month" : name;
  if (typeof value !== "number") {
    return ["N/A", label];
  }
  return [formatCurrency(value), label];
};

const customerValueFormatter = (value) => {
  if (typeof value !== "number") {
    return ["N/A", "Customers"];
  }
  return [value, "Customers"];
};

const Overview = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useDashboardOverviewQuery();

  const dashboard = data || {};

  const revenueTrendData = useMemo(
    () => mapRevenueTrend(dashboard?.revenue_trend?.data || []),
    [dashboard?.revenue_trend?.data]
  );

  const customerTrendData = useMemo(
    () => mapCustomerGrowth(dashboard?.customer_growth?.data || []),
    [dashboard?.customer_growth?.data]
  );

  const techniciansData = useMemo(
    () => mapTechnicians(dashboard?.technicians_overview || []),
    [dashboard?.technicians_overview]
  );

  const hasRevenueTrend = hasNumericValue(revenueTrendData, "value");
  const hasCustomerTrend = hasNumericValue(customerTrendData, "value");
  const hasTechnicians = techniciansData.length > 0;

  const highlightMonth = revenueTrendData.find((item) => item.value !== null)?.month;

  const attentionNote =
    typeof dashboard?.attention_required?.need_action === "boolean"
      ? dashboard.attention_required.need_action
        ? "Need action"
        : "Stable"
      : "N/A";

  const CustomLabel = (props) => {
    const { viewBox } = props;
    return (
      <g>
        <rect
          x={viewBox.x + 10}
          y={viewBox.y - 65}
          width={180}
          height={55}
          rx={12}
          fill="#BCF328"
        />
        <text
          x={viewBox.x + 25}
          y={viewBox.y - 45}
          fill="#888888"
          className="text-sm"
        >
          Average year value
        </text>
        <text
          x={viewBox.x + 25}
          y={viewBox.y - 20}
          fill="#1f2937"
          className="text-lg font-bold"
        >
          {formatCurrency(dashboard?.total_revenue?.amount)}
        </text>
      </g>
    );
  };

  if (isLoading) {
    return <div className="p-6 text-gray-500">Loading dashboard...</div>;
  }

  if (isError) {
    return <div className="p-6 text-red-500">Failed to load dashboard data.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className=" mx-auto">
        <h1 className="text-3xl font-medium text-[#2A2A2A] mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <MonthlyRevenueTargetCard
            target={dashboard?.monthly_revenue_target?.target_amount}
            inProgress={dashboard?.monthly_revenue_target?.in_progress_amount}
            percentage={dashboard?.monthly_revenue_target?.in_progress_percentage}
          />

          <StatCard
            title="Total Revenue"
            value={formatCurrency(dashboard?.total_revenue?.amount)}
            growthPercentage={dashboard?.total_revenue?.growth_percentage}
            trend={dashboard?.total_revenue?.trend}
            variant="dark"
          />

          <StatCard
            title="Total jobs"
            value={dashboard?.total_jobs?.count}
            growthPercentage={dashboard?.total_jobs?.growth_percentage}
            trend={dashboard?.total_jobs?.trend}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-[32px] p-8 border border-[#E7E7E7] shadow-sm relative">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-2xl text-[#454545]">Revenue Trend</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E7E7E7] rounded-xl shadow-xl shadow-gray-100/50 text-teal-600 text-sm font-medium">
                Calendar <Calendar className="w-5 h-5" />
              </button>
            </div>
            <div className="h-80">
              {hasRevenueTrend ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueTrendData} margin={{ top: 70, right: 30, left: 20, bottom: 0 }}>
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#9ca3af", fontSize: 16 }}
                      dy={5}
                    />
                    <YAxis hide domain={["dataMin - 500", "dataMax + 1000"]} />
                    <Tooltip formatter={chartValueFormatter} />
                    {highlightMonth ? (
                      <ReferenceLine x={highlightMonth} stroke="#818cf8" strokeWidth={5} label={<CustomLabel />} />
                    ) : null}
                    <Line
                      type="natural"
                      dataKey="target"
                      stroke="#1A9C9C"
                      strokeWidth={4}
                      strokeDasharray="8 8"
                      dot={false}
                    />
                    <Line
                      type="natural"
                      dataKey="value"
                      stroke="#F68528"
                      strokeWidth={4}
                      dot={{ r: 3, fill: "#F68528", strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">N/A</div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 grid-rows-2 col-span-2 gap-6">
            <StatCard
              title="Active jobs"
              value={dashboard?.active_jobs?.count}
              growthPercentage={dashboard?.active_jobs?.growth_percentage}
              trend={dashboard?.active_jobs?.trend}
            />

            <StatCard
              title="Attention Required"
              value={dashboard?.attention_required?.count}
              trend={null}
              note={{
                text: attentionNote,
                isAlert: Boolean(dashboard?.attention_required?.need_action),
              }}
            />

            <StatCard
              title="Total customer"
              value={dashboard?.total_customers?.count}
              growthPercentage={dashboard?.total_customers?.growth_percentage}
              trend={dashboard?.total_customers?.trend}
            />

            <StatCard
              title="Total Technicians"
              value={dashboard?.total_technicians?.count}
              growthPercentage={dashboard?.total_technicians?.growth_percentage}
              trend={dashboard?.total_technicians?.trend}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-[32px] p-8 border border-[#E7E7E7] shadow-sm relative">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-2xl text-[#454545]">Customer Trend</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E7E7E7] rounded-xl shadow-xl shadow-gray-100/10 text-[#0D7E8A] text-sm font-medium">
                Calendar <Calendar className="w-5 h-5" />
              </button>
            </div>
            <div className="h-96">
              {hasCustomerTrend ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={customerTrendData} barSize={60} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#454545", fontSize: 16 }}
                      dy={10}
                    />
                    <YAxis hide />
                    <Tooltip cursor={{ fill: "transparent" }} formatter={customerValueFormatter} />
                    <Bar dataKey="value" fill="#1A9C9C" radius={[15, 15, 15, 15]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">N/A</div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-[32px] p-8 border border-[#E7E7E7] shadow-sm">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-[#F5F5F5]">
              <h3 className="text-2xl text-[#F68528]">Technicians overview</h3>
              <div className="flex items-center gap-8">
                <span className="text-gray-500 text-sm mr-10">Assigned jobs</span>
                <button className="text-gray-800 text-sm font-bold flex items-center gap-2">
                  Action
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {hasTechnicians ? (
                techniciansData.map((tech, idx) => (
                  <div key={`${tech.id || "na"}-${idx}`} className="flex items-center justify-between py-2">
                    <div className="flex flex-col">
                      <span className="text-gray-700 text-lg">{tech.name || "N/A"}</span>
                      <span className="text-gray-400 text-sm">{tech.id || "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-20">
                      <span className="text-gray-600 text-xl">{tech.jobs ?? "N/A"}</span>
                      <button
                        onClick={() =>
                          navigate(`/technicians/${String(tech.id).replace("#", "")}`, {
                            state: { selectedTechnicianName: tech.name || "N/A" },
                          })
                        }
                        className="bg-[#28A745] hover:bg-green-600 text-white px-8 py-2 rounded-xl text-sm shadow-lg shadow-green-100"
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-10 text-center text-gray-400">N/A</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
