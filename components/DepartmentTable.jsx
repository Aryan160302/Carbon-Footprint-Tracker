import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import AssetsDropdown from './AssetsDropdown'
import AdvisoryPopup from './AdvisoryPopup'

function DepartmentTable() {
  const [departments, setDepartments] = useState([])

  useEffect(() => {
    fetchDepartments()
  }, [])

  async function fetchDepartments() {
    const { data, error } = await supabase
      .from('departments')
      .select('*')
      .order('emissions', { ascending: false })

    if (error) {
      console.error('Error fetching departments:', error)
    } else {
      setDepartments(data)
    }
  }

  return (
    <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md">
      <table className="w-full text-left border-collapse text-gray-800">
        <thead>
          <tr className="bg-green-100 text-green-800 uppercase text-sm font-semibold">
            <th className="p-4">Department</th>
            <th className="p-4">Electricity Usage (kWh)</th>
            <th className="p-4">Emissions (kg CO₂)</th>
            <th className="p-4">Assets</th>
            <th className="p-4">Advisories</th>
          </tr>
        </thead>
        <tbody>
          {departments.map(dep => (
            <tr
              key={dep.id}
              className="border-b border-gray-200 hover:bg-green-50 transition-colors"
            >
              <td className="p-4 font-medium text-gray-900">{dep.name}</td>
              <td className="p-4 text-gray-700">{dep.electricity_usage ?? 'N/A'}</td>
              <td className="p-4 text-gray-700">{dep.emissions?.toFixed(2) ?? '0.00'}</td>
              <td className="p-4">
                <AssetsDropdown departmentId={dep.id} />
              </td>
              <td className="p-4">
                <AdvisoryPopup emissions={dep.emissions} departmentId={dep.id} />
              </td>
            </tr>
          ))}
          {departments.length === 0 && (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">
                Loading departments...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default DepartmentTable
