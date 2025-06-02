import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

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
    <div className="bg-white p-6 rounded shadow mb-6">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Carbon Emissions & Electricity Usage by Department</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={departments} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="emissions" fill="#EF4444" name="Emissions (kg CO₂)" />
          <Bar dataKey="electricity_usage" fill="#22C55E" name="Electricity (kWh)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default DepartmentEmissionsChart

