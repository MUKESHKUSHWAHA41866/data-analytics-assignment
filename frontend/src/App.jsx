import { useEffect, useState } from "react";
import { getRevenue, getCustomers, getCategories, getRegions } from "./api";

import RevenueChart from "./components/RevenueChart";
import TopCustomersTable from "./components/TopCustomersTable";
import CategoryChart from "./components/CategoryChart";
import RegionSummary from "./components/RegionSummary";

function App() {
  const [revenue, setRevenue] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    getRevenue().then((res) => setRevenue(res.data));
    getCustomers().then((res) => setCustomers(res.data));
    getCategories().then((res) => setCategories(res.data));
    getRegions().then((res) => setRegions(res.data));
  }, []);

  return (
    <div>
      <h1>Data Analytics Dashboard</h1>

      <RevenueChart data={revenue} />

      <TopCustomersTable data={customers} />

      <CategoryChart data={categories} />

      <RegionSummary data={regions} />
    </div>
  );
}

export default App;