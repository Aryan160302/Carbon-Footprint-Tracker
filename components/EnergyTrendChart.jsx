import React from 'react'
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
  { month: 'Jun', electricity: 240000, carbon: 220000 },
  { month: 'Jul', electricity: 190000, carbon: 180000 },
]

function EnergyTrendChart() {
  return (
    <div className="bg-white p-4 rounded shadow mb-8">
      <h2 className="text-xl font-bold mb-4 text-green-700">Campus Energy & Carbon Trends</h2>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="electricity" fill="#60A5FA" />
          <Line yAxisId="right" type="monotone" dataKey="carbon" stroke="#10B981" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

export default EnergyTrendChart