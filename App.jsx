

import React, { useState } from 'react'
import DepartmentTable from './components/DepartmentTable'
import DepartmentEmissionsChart from './components/DepartmentEmissionsChart'
import EmissionsPieChart from './components/EmissionsPieChart'
import ElectricityPieChart from './components/ElectricityPieChart'
import Navbar from './components/Navbar'
import { Menu } from 'lucide-react' // Install lucide-react if you haven't

function App() {
  const [month, setMonth] = useState('All')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="relative min-h-screen overflow-x-hidden font-sans text-white">

      {/* 📽️ Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-20"
      >
        <source src="/bg-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 📌 Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm -z-10" />

      {/* Navbar */}
      <Navbar />

      {/* Sidebar Toggle */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="fixed top-4 left-4 z-20 bg-white text-black p-2 rounded-full shadow-lg hover:bg-green-400 hover:text-white transition"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-black bg-opacity-80 backdrop-blur-lg z-30 p-6 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-green-400">Menu</h2>
          <button onClick={() => setIsSidebarOpen(false)} className="text-white text-xl">&times;</button>
        </div>
        <ul className="space-y-4 text-lg font-medium">
          <li className="hover:text-green-400 cursor-pointer">👤 Profile</li>
          <li className="hover:text-green-400 cursor-pointer">📊 Dashboard</li>
          <li className="hover:text-green-400 cursor-pointer">🚀 Live Project</li>
        </ul>
      </div>

      {/* Sticky Title Bar */}
      <div className="sticky top-0 z-10 flex justify-between items-center p-4 bg-black bg-opacity-60 backdrop-blur text-white shadow-lg">
        <h1 className="text-xl font-bold drop-shadow">🌱 Dashboard Controls</h1>
        <div>
          <select
            value={month}
            onChange={e => setMonth(e.target.value)}
            className="p-2 rounded bg-white text-black font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="All">All Months</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
          </select>
        </div>
      </div>

      {/* Header */}
      <header className="max-w-5xl mx-auto mt-10 mb-8 text-center drop-shadow-xl">
        <h1 className="text-5xl font-extrabold mb-3 drop-shadow-md">
          🌍 Campus Carbon Footprint Dashboard
        </h1>
        <p className="text-lg font-medium drop-shadow-sm">
          Track, analyze, and reduce your department's carbon emissions effectively.
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto space-y-10 pb-12 px-4">

        {/* Emissions Bar Chart */}
        <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-6 shadow-2xl">
          <h2 className="text-2xl font-bold mb-4 drop-shadow-md">Department Emissions (Bar Chart)</h2>
          <DepartmentEmissionsChart month={month} />
        </div>

        {/* Emissions Pie Chart */}
        <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-6 shadow-2xl">
          <h2 className="text-2xl font-bold mb-4 drop-shadow-md"> Emissions Breakdown (Pie Chart)</h2>
          <EmissionsPieChart />
        </div>

        {/* Electricity Usage Pie Chart */}
        <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-6 shadow-2xl">
          <h2 className="text-2xl font-bold mb-4 drop-shadow-md">⚡ Electricity Usage Breakdown (Pie Chart)</h2>
          <ElectricityPieChart />
        </div>

        {/* Department Table */}
        <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-6 shadow-2xl">
          <h2 className="text-2xl font-bold mb-4 drop-shadow-md">Department-wise Details</h2>
          <DepartmentTable month={month} />
        </div>
      </main>
    </div>
  )
}

export default App
