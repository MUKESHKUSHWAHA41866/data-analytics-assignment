import { useState, useMemo } from "react";

export default function TopCustomersTable({ data }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "total_spend", direction: "desc" });

  const filteredData = useMemo(() => {
    let filtered = data.filter((c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.region.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [data, searchTerm, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) return <span className="text-gray-300 text-lg">↕</span>;
    return <span className="text-blue-600 font-bold text-lg">{sortConfig.direction === "asc" ? "↑" : "↓"}</span>;
  };

  return (
    <div className="card bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
      <h2 className="card-title mb-4">👥 Top Customers</h2>

      {/* Search Box */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or region..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 transition-colors hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b-2 border-gray-300">
            <tr>
              <th
                onClick={() => handleSort("name")}
                className="px-4 py-3 font-bold text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                Name <SortIcon column="name" />
              </th>
              <th
                onClick={() => handleSort("region")}
                className="px-4 py-3 font-bold text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                Region <SortIcon column="region" />
              </th>
              <th
                onClick={() => handleSort("total_spend")}
                className="px-4 py-3 font-bold text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors flex items-center gap-2 text-right"
              >
                Total Spend <SortIcon column="total_spend" />
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((c, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-blue-50 transition-colors duration-150"
                >
                  <td className="px-4 py-3 font-semibold text-gray-900">{c.name}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                      {c.region}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-gray-900">
                    ${c.total_spend?.toLocaleString() || 0}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-4 py-8 text-center text-gray-600 font-medium">
                  No customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Results Info */}
      <div className="mt-4 text-sm text-gray-700 font-medium">
        Showing <span className="font-bold text-blue-600">{filteredData.length}</span> of{" "}
        <span className="font-bold text-blue-600">{data.length}</span> customers
      </div>
    </div>
  );
}