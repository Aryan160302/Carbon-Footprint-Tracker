import React, { useState, useEffect, useRef } from 'react'
import { supabase } from '../supabaseClient'

function AssetsDropdown({ departmentId }) {
  const [assets, setAssets] = useState(null)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    if (open) {
      fetchAssets()
    }
  }, [open])

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  async function fetchAssets() {
    setLoading(true)
    const { data, error } = await supabase
      .from('department_assets')
      .select('*')
      .eq('department_id', departmentId)
      .single()
    setLoading(false)

    if (error) {
      console.error('Error fetching assets:', error)
      setAssets(null)
    } else {
      setAssets(data)
    }
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 text-white font-semibold px-4 py-1 rounded transition-colors duration-200"
        aria-expanded={open}
        aria-haspopup="true"
      >
        {open ? 'Hide Assets' : 'View Assets'}
      </button>

      {/* Dropdown Panel */}
      <div
        className={`origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-300 ease-in-out
          ${open ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
        style={{ maxHeight: '300px', overflowY: 'auto', zIndex: 50 }}
      >
        {loading && (
          <div className="p-4 text-center text-gray-500">Loading assets...</div>
        )}

        {!loading && assets && (
          <div className="p-4 text-gray-800 space-y-1">
            <p><strong>Floors:</strong> {assets.floors ?? 'N/A'}</p>
            <p><strong>Classrooms:</strong> {assets.classrooms ?? 'N/A'}</p>
            <p><strong>Seminar Halls:</strong> {assets.seminar_halls ?? 'N/A'}</p>
            <p><strong>Fans:</strong> {assets.fans ?? 'N/A'}</p>
            <p><strong>Lights:</strong> {assets.lights ?? 'N/A'}</p>
            <p><strong>AC Units:</strong> {assets.acs ?? 'N/A'}</p>
            <p><strong>Computers:</strong> {assets.computers ?? 'N/A'}</p>
            <p><strong>Lab Equipments:</strong> {assets.lab_equipments ?? 'N/A'}</p>
          </div>
        )}

        {!loading && !assets && (
          <div className="p-4 text-center text-gray-500">No assets data available.</div>
        )}
      </div>
    </div>
  )
}

export default AssetsDropdown