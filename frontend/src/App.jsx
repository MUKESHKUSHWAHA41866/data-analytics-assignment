import { useEffect, useState } from "react";
import { getRevenue, getCustomers, getCategories, getRegions } from "./api";

import RevenueChart from "./components/RevenueChart";
import TopCustomersTable from "./components/TopCustomersTable";
import CategoryChart from "./components/CategoryChart";
import RegionSummary from "./components/RegionSummary";
import KPICard from "./components/KPICard";
import LoadingSpinner from "./components/LoadingSpinner";

import "./App.css";

function App() {
  const [revenue, setRevenue] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [revenueRes, customersRes, categoriesRes, regionsRes] = await Promise.all([
          getRevenue(),
          getCustomers(),
          getCategories(),
          getRegions(),
        ]);

        setRevenue(revenueRes.data || []);
        setCustomers(customersRes.data || []);
        setCategories(categoriesRes.data || []);
        setRegions(regionsRes.data || []);
      } catch (err) {
        setError({
          message: err.message || "Failed to load dashboard data",
          details: err.response?.status ? `HTTP ${err.response.status}` : "Connection error",
        });
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate KPIs
  const totalRevenue = revenue.reduce((sum, item) => sum + item.amount, 0);
  const totalCustomers = customers.length;
  const totalOrders = regions.reduce((sum, item) => sum + item.num_orders, 0);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container-app">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 shadow-lg text-white sticky top-0 z-40">
        <div className="container-main">
          <div className="py-6 sm:py-8">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              📊 Data Analytics Dashboard
            </h1>
            <p className="mt-2 text-sm sm:text-base text-blue-100 font-light">
              Real-time insights and performance metrics
            </p>
          </div>
        </div>
      </header>

      {/* Error State */}
      {error && (
        <div className="w-full bg-red-50 border-b-2 border-red-200">
          <div className="container-main">
            <div className="bg-red-50 border border-red-300 rounded-lg p-4 sm:p-6 my-4">
              <h3 className="text-red-900 font-bold flex items-center gap-2">
                <span>⚠️</span> Unable to Load Data
              </h3>
              <p className="text-red-800 mt-2 font-medium">{error.message}</p>
              <small className="text-red-700 block mt-1">{error.details}</small>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container-main flex-1">
        {/* KPI Cards Section */}
        <section className="section-spacing">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Performance Indicators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <KPICard
              title="Total Revenue"
              value={`$${(totalRevenue / 1000).toFixed(1)}K`}
              icon="💰"
              trend="+12.5%"
            />
            <KPICard
              title="Total Orders"
              value={totalOrders.toLocaleString()}
              icon="📦"
              trend="+8.2%"
            />
            <KPICard
              title="Total Customers"
              value={totalCustomers.toLocaleString()}
              icon="👥"
              trend="+5.3%"
            />
          </div>
        </section>

        {/* Charts Section */}
        <section className="section-spacing">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytics</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart - full width on first row */}
            <div className="lg:col-span-2">
              <RevenueChart data={revenue} />
            </div>
            {/* Category Chart */}
            <div>
              <CategoryChart data={categories} />
            </div>
            {/* Region Summary */}
            <div>
              <RegionSummary data={regions} />
            </div>
          </div>
        </section>

        {/* Customers Table Section */}
        <section className="section-spacing">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customers</h2>
          <TopCustomersTable data={customers} />
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-gray-200 mt-auto">
        <div className="container-main">
          <div className="py-6 text-center text-gray-600 text-sm">
            <p>© 2026 Data Analytics Dashboard. Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;