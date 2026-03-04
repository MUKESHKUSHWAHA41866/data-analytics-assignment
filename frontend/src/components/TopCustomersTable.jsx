export default function TopCustomersTable({ data }) {
  return (
    <div>
      <h2>Top Customers</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Region</th>
            <th>Total Spend</th>
          </tr>
        </thead>

        <tbody>
          {data.map((c, index) => (
            <tr key={index}>
              <td>{c.name}</td>
              <td>{c.region}</td>
              <td>{c.total_spend}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}