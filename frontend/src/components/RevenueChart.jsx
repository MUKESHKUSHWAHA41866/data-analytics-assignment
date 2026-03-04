import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function RevenueChart({ data }) {
  const [dateRange, setDateRange] = useState("all");

  const filteredData = useMemo(() => {
    if (!data || data.length === 0) return [];

    const sorted = [...data].sort((a, b) =>
      a.order_year_month.localeCompare(b.order_year_month)
    );

    if (dateRange === "all") return sorted;

    const months = parseInt(dateRange);
    return sorted.slice(Math.max(0, sorted.length - months));
  }, [data, dateRange]);

  const totalRevenue = filteredData.reduce((sum, item) => sum + item.amount, 0);
  const avgRevenue = filteredData.length > 0 ? totalRevenue / filteredData.length : 0;

  return (
    <div className="card bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h2 className="card-title mb-2">💹 Monthly Revenue Trend</h2>
          <p className="text-sm text-gray-700">
            Total: <span className="font-bold text-blue-600">${(totalRevenue / 1000).toFixed(1)}K</span> | Average:{" "}
            <span className="font-bold text-blue-600">${(avgRevenue / 1000).toFixed(1)}K</span>
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <label htmlFor="dateRange" className="text-gray-700 font-semibold text-sm">
            Filter:
          </label>
          <select
            id="dateRange"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border-2 border-gray-300 rounded-lg bg-white text-gray-900 text-sm font-medium transition-colors hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
          >
            <option value="all">All Time</option>
            <option value="3">Last 3 Months</option>
            <option value="6">Last 6 Months</option>
            <option value="12">Last 12 Months</option>
          </select>
        </div>
      </div>

      <div className="w-full -ml-2">
        {filteredData.length > 0 ? (
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={filteredData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="order_year_month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "2px solid #3b82f6",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
                formatter={(value) => `$${value.toLocaleString()}`}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ fill: "#2563eb", r: 5 }}
                activeDot={{ r: 7 }}
                name="Revenue"
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-80 text-gray-400">
            <p className="text-center">No data available</p>
          </div>
        )}
      </div>
    </div>
  );
}
