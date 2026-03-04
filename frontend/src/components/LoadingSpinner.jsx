export default function LoadingSpinner() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 flex flex-col items-center justify-center text-white">
      <div className="flex flex-col items-center gap-8">
        {/* Animated Spinner */}
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-white border-opacity-20 rounded-full animate-spin"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-white rounded-full animate-spin" style={{ animationDuration: '0.6s' }}></div>
        </div>
        
        {/* Loading Text */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-3">Loading Dashboard</h2>
          <p className="text-blue-100 text-lg font-light">Fetching your analytics data...</p>
        </div>

        {/* Progress Dots */}
        <div className="flex items-center gap-2 mt-6">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-blue-200 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
}
