import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

function DepartmentEmissionsChart() {
  const [departments, setDepartments] = useState([])

  useEffect(() => {
    fetchDepartments()
  }, [])

  async function fetchDepartments() {
    const { data, error } = await supabase
      .from('departments')
      .select('name, emissions, electricity_usage')
      .order('emissions', { ascending: false })

    if (error) {
      console.error('Error fetching department data:', error)
    } else {
      setDepartments(data)
    }
  }

  return (
    <div className="relative bg-black bg-opacity-20 backdrop-blur-md p-6 rounded-lg shadow-xl mb-6 text-black">
      <h2 className="text-2xl font-bold mb-4"> Department Emissions & Electricity Usage</h2>
      <div style={{ height: 460, position: 'relative' }}>
        <ResponsiveContainer width="100%" height={420}>
          <BarChart data={departments} margin={{ top: 20, right: 30, left: 0, bottom: 50 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
            <XAxis
              dataKey="name"
              stroke="#222"
              tick={{ fill: '#222', fontSize: 13, fontWeight: 500 }}
              label={{
                value: 'Departments',
                position: 'bottom',
                offset: 0,
                fill: '#222',
                fontSize: 15,
                fontWeight: '600',
              }}
            />
            <YAxis
              stroke="#222"
              tick={{ fill: '#222', fontSize: 13, fontWeight: 500 }}
              label={{
                value: 'Values',
                angle: -90,
                position: 'insideLeft',
                fill: '#222',
                fontSize: 15,
                fontWeight: '600',
              }}
            />
            <Tooltip />
            <Legend
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{
                position: 'absolute',
                bottom: -30,
                left: 0,
                right: 0,
                textAlign: 'center',
                color: '#222',
                fontWeight: '600',
              }}
            />
            <Bar
              dataKey="emissions"
              fill="#F97316"
              name="Emissions (kg CO₂)"
              radius={[8, 8, 0, 0]}
            />
            <Bar
              dataKey="electricity_usage"
              fill="#10B981"
              name="Electricity (kWh)"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default DepartmentEmissionsChart
