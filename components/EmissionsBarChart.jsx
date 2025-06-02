import React, { useEffect, useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { supabase } from '../supabaseClient'

function DepartmentEmissionsChart({ month }) {
  const [data, setData] = useState([])

  useEffect(() => {
    fetchData()
  }, [month])

  const fetchData = async () => {
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
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#fff" />
        <YAxis stroke="#fff" />
        <Tooltip />
        <Legend />
        <Bar dataKey="emissions" fill="#F59E0B" name="Emissions (kg CO₂)" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default DepartmentEmissionsChart