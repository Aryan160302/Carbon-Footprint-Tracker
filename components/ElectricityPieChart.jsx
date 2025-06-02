import React, { useEffect, useState } from 'react'
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { supabase } from '../supabaseClient'

const COLORS = ['#10B981', '#F59E0B', '#EF4444', '#6366F1', '#3B82F6']

function ElectricityPieChart() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetchUsageData()
  }, [])

  const fetchUsageData = async () => {
    const { data, error } = await supabase
      .from('departments')
      .select('name, electricity_usage')

    if (error) {
      console.error(error)
      return
    }

    setData(data)
  }

  return (
    <ResponsiveContainer width="100%" height={360}>
      <PieChart>
        <Pie
          data={data}
          dataKey="electricity_usage"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default ElectricityPieChart