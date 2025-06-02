import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

function AdminPanel() {
  const [departments, setDepartments] = useState([])
  const [newDepartmentName, setNewDepartmentName] = useState('')
  const [stats, setStats] = useState([])
  const [form, setForm] = useState({ departmentId: '', electricity_usage: '' })
  const navigate = useNavigate()

  useEffect(() => {
    fetchDepartments()
    fetchStats()
  }, [])

  const fetchDepartments = async () => {
    const { data, error } = await supabase.from('departments').select('*')
    if (error) console.error(error)
    else setDepartments(data)
  }

  const fetchStats = async () => {
    const { data, error } = await supabase
      .from('department_stats')
      .select('*, departments(name)')
      .order('created_at', { ascending: false })
    if (error) console.error(error)
    else setStats(data)
  }

  const handleAddDepartment = async () => {
    if (!newDepartmentName) return
    const { error } = await supabase.from('departments').insert([{ name: newDepartmentName }])
    if (error) console.error(error)
    else {
      setNewDepartmentName('')
      fetchDepartments()
    }
  }

  const handleAddStats = async () => {
    const { departmentId, electricity_usage } = form
    if (!departmentId || !electricity_usage) return
    const { error } = await supabase
      .from('department_stats')
      .insert([{ department_id: departmentId, electricity_usage: parseFloat(electricity_usage) }])
    if (error) console.error(error)
    else {
      setForm({ departmentId: '', electricity_usage: '' })
      fetchStats()
    }
  }

  return (
    <div
      className="min-h-screen text-white"
      style={{ background: 'linear-gradient(to bottom right, #022d23, #064e3b)' }}
    >
      {/* Navbar */}
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">

        <div className="flex justify-between items-center">
          <h2 className="text-4xl font-bold drop-shadow text-white">
            🛠️ Admin Panel
          </h2>
          <button
            onClick={() => navigate('/')}
            className="bg-white text-green-800 px-4 py-2 rounded font-semibold shadow hover:bg-gray-100 transition"
          >
            ← Go to Dashboard
          </button>
        </div>

        {/* Add Department */}
        <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-6 shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 drop-shadow">➕ Add Department</h3>
          <div className="flex flex-wrap gap-3 items-center">
            <input
              type="text"
              placeholder="Department Name"
              className="p-3 rounded text-black w-full sm:w-auto"
              value={newDepartmentName}
              onChange={(e) => setNewDepartmentName(e.target.value)}
            />
            <button
              onClick={handleAddDepartment}
              className="bg-green-600 px-5 py-2 rounded hover:bg-green-700 transition font-semibold shadow"
            >
              Add
            </button>
          </div>
        </div>

        {/* Add Usage */}
        <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-6 shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 drop-shadow">⚡ Add Electricity Usage</h3>
          <div className="flex flex-wrap gap-3 items-center">
            <select
              className="p-3 rounded text-black"
              value={form.departmentId}
              onChange={(e) => setForm({ ...form, departmentId: e.target.value })}
            >
              <option value="">Select Department</option>
              {departments.map(dep => (
                <option key={dep.id} value={dep.id}>{dep.name}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="kWh Usage"
              className="p-3 rounded text-black"
              value={form.electricity_usage}
              onChange={(e) => setForm({ ...form, electricity_usage: e.target.value })}
            />
            <button
              onClick={handleAddStats}
              className="bg-green-600 px-5 py-2 rounded hover:bg-green-700 transition font-semibold shadow"
            >
              Add
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-6 shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 drop-shadow">📈 Usage Records</h3>
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {stats.map(stat => (
              <div
                key={stat.id}
                className="p-3 bg-white bg-opacity-20 rounded shadow-sm text-sm flex justify-between items-center"
              >
                <span className="drop-shadow-sm">
                  {stat.departments?.name} — {stat.electricity_usage} kWh
                  <span className="ml-2 text-xs text-gray-300">
                    ({new Date(stat.created_at).toLocaleString()})
                  </span>
                </span>
              </div>
            ))}
            {stats.length === 0 && (
              <div className="text-gray-300">No records yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
