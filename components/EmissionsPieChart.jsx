import React, { useEffect, useState } from 'react'
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { supabase } from '../supabaseClient'

const COLORS = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6']

function EmissionsPieChart() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetchEmissionData()
  }, [])

  const fetchEmissionData = async () => {
    const { data, error } = await supabase
      .from('departments')
      .select('name, emissions')

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
          dataKey="emissions"
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

export default EmissionsPieChart