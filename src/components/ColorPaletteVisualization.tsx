
export function ColorPaletteVisualization() {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Color Palette</h2>
      <div className="grid grid-cols-5 gap-2">
        {/* Primary Colors */}
        <div className="h-12 rounded bg-blue-500"></div>
        <div className="h-12 rounded bg-green-500"></div>
        <div className="h-12 rounded bg-yellow-500"></div>
        <div className="h-12 rounded bg-red-500"></div>
        <div className="h-12 rounded bg-purple-500"></div>
        
        {/* Dark Mode Colors */}
        <div className="h-12 rounded bg-gray-800"></div>
        <div className="h-12 rounded bg-gray-700"></div>
        <div className="h-12 rounded bg-gray-600"></div>
        <div className="h-12 rounded bg-gray-500"></div>
        <div className="h-12 rounded bg-gray-400"></div>
      </div>
    </div>
  );
}

export default ColorPaletteVisualization;
