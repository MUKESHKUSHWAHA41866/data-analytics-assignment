export default function KPICard({ title, value, icon, trend }) {
  return (
    <div className="card bg-white rounded-xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-l-4 border-blue-500 hover:border-indigo-600">
      <div className="flex justify-between items-start mb-4">
        <span className="text-4xl">{icon}</span>
        <div className="bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm">
          {trend}
        </div>
      </div>
      <h3 className="text-gray-600 text-xs font-bold uppercase tracking-wider mb-2">
        {title}
      </h3>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
