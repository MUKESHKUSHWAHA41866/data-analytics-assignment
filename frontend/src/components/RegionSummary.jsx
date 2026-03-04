export default function RegionSummary({ data }) {
  return (
    <div>
      <h2>Regional Summary</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Region</th>
            <th>Customers</th>
            <th>Orders</th>
            <th>Total Revenue</th>
          </tr>
        </thead>

        <tbody>
          {data.map((r, index) => (
            <tr key={index}>
              <td>{r.region}</td>
              <td>{r.num_customers}</td>
              <td>{r.num_orders}</td>
              <td>{r.total_revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}