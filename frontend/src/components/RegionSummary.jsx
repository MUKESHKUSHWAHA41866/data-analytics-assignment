import { useState } from "react";

export default function RegionSummary({ data }) {
  const [sortBy, setSortBy] = useState("total_revenue");

  const sortedData = [...data].sort((a, b) => {
    if (sortBy === "total_revenue") {
      return b.total_revenue - a.total_revenue;
    } else if (sortBy === "num_customers") {
      return b.num_customers - a.num_customers;
    } else if (sortBy === "num_orders") {
      return b.num_orders - a.num_orders;
    }
    return 0;
  });

  const totalRevenue = data.reduce((sum, item) => sum + item.total_revenue, 0);
  const totalCustomers = data.reduce((sum, item) => sum + item.num_customers, 0);
  const totalOrders = data.reduce((sum, item) => sum + item.num_orders, 0);

  return (
    <div className="card bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
        <div>
          <h2 className="card-title mb-2">🌍 Regional Summary</h2>
          <p className="text-sm text-gray-700">Performance metrics by region</p>
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border-2 border-gray-300 rounded-lg bg-white text-gray-900 text-sm font-medium transition-colors hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          <option value="total_revenue">Sort by Revenue</option>
          <option value="num_customers">Sort by Customers</option>
          <option value="num_orders">Sort by Orders</option>
        </select>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div>
          <p className="text-gray-600 text-xs font-bold uppercase tracking-widest">Total Revenue</p>
          <p className="text-xl font-bold text-gray-900 mt-1">${(totalRevenue / 1000).toFixed(1)}K</p>
        </div>
        <div>
          <p className="text-gray-600 text-xs font-bold uppercase tracking-widest">Total Customers</p>
          <p className="text-xl font-bold text-gray-900 mt-1">{totalCustomers}</p>
        </div>
        <div>
          <p className="text-gray-600 text-xs font-bold uppercase tracking-widest">Total Orders</p>
          <p className="text-xl font-bold text-gray-900 mt-1">{totalOrders}</p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b-2 border-gray-300">
            <tr>
              <th className="px-4 py-3 font-bold text-gray-900">Region</th>
              <th className="px-4 py-3 font-bold text-gray-900 text-right">Customers</th>
              <th className="px-4 py-3 font-bold text-gray-900 text-right">Orders</th>
              <th className="px-4 py-3 font-bold text-gray-900 text-right">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.length > 0 ? (
              sortedData.map((r, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-blue-50 transition-colors duration-150"
                >
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
                      {r.region}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-gray-900">{r.num_customers}</td>
                  <td className="px-4 py-3 text-right font-bold text-gray-900">{r.num_orders}</td>
                  <td className="px-4 py-3 text-right font-bold text-blue-600">
                    ${r.total_revenue?.toLocaleString() || 0}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-8 text-center text-gray-600 font-medium">
                  No regions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}