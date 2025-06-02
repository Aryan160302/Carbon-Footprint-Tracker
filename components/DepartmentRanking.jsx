import React from 'react'

const data = [
  { name: 'CSE', electricity: 14800, carbon: 12600 },
  { name: 'ECE', electricity: 13500, carbon: 11400 },
]

function DepartmentRanking() {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-green-700">Department Rankings</h2>
      <table className="w-full text-left border-collapse">
        <thead className="text-green-800 bg-green-50">
          <tr>
            <th className="p-2">#</th>
            <th className="p-2">Department</th>
            <th className="p-2">Electricity (kWh)</th>
            <th className="p-2">Carbon (kgCO₂e)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((dept, index) => (
            <tr key={index} className="border-b">
              <td className="p-2">{index + 1}</td>
              <td className="p-2 font-medium">{dept.name}</td>
              <td className="p-2">{dept.electricity}</td>
              <td className="p-2">{dept.carbon}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DepartmentRanking