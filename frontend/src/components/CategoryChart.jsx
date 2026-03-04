import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export default function CategoryChart({ data }) {
  return (
    <div>
      <h2>Revenue by Category</h2>

      <BarChart width={600} height={300} data={data}>
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total_revenue" fill="#82ca9d" />
      </BarChart>
    </div>
  );
}