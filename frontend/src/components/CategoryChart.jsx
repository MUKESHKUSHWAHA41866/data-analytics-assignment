import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";

export default function CategoryChart({ data }) {
  const totalRevenue = data.reduce((sum, item) => sum + item.total_revenue, 0);

  return (
    <div className="card bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
      <div className="mb-6">
        <h2 className="card-title mb-2">📊 Revenue by Category</h2>
        <p className="text-sm text-gray-700">
          Total: <span className="font-bold text-blue-600">${(totalRevenue / 1000).toFixed(1)}K</span>
        </p>
      </div>

      <div className="w-full -ml-2">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="category" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "2px solid #10b981",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
                formatter={(value) => `$${value.toLocaleString()}`}
              />
              <Legend />
              <Bar dataKey="total_revenue" fill="#10b981" name="Revenue" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-72 text-gray-400">
            <p className="text-center">No data available</p>
          </div>
        )}
      </div>
    </div>
  );
}