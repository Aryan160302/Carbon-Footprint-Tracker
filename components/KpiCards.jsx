import React from 'react'

function KpiCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="backdrop-blur-md bg-white/10 p-4 rounded-lg shadow text-center text-white">
        <h2 className="text-3xl font-extrabold text-green-400">255 kWh</h2>
        <p className="text-gray-200 text-sm">Total Electricity</p>
      </div>
      <div className="backdrop-blur-md bg-white/10 p-4 rounded-lg shadow text-center text-white">
        <h2 className="text-3xl font-extrabold text-red-400">217 kgCO₂e</h2>
        <p className="text-gray-200 text-sm">Carbon Footprint</p>
      </div>
      <div className="backdrop-blur-md bg-white/10 p-4 rounded-lg shadow text-center text-white">
        <h2 className="text-3xl font-extrabold text-green-400">14</h2>
        <p className="text-gray-200 text-sm">Departments Tracked</p>
      </div>
      <div className="backdrop-blur-md bg-white/10 p-4 rounded-lg shadow text-center text-white">
        <h2 className="text-3xl font-extrabold text-yellow-300">0.85 kgCO₂/kWh</h2>
        <p className="text-gray-200 text-sm">Carbon Intensity</p>
      </div>
    </div>
  )
}

export default KpiCards