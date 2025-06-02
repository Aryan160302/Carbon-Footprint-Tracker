import React, { useState, useEffect, useRef } from 'react'
import { supabase } from '../supabaseClient'

function AdvisoryPopup({ emissions }) {
  const [advisories, setAdvisories] = useState([])
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)

  const fetchAdvisories = async () => {
    const { data, error } = await supabase.from('advisories').select('*')
    if (error) {
      console.error('Error fetching advisories:', error)
      setAdvisories([])
    } else {
      setAdvisories(data)
    }
  }

  useEffect(() => {
    if (open) fetchAdvisories()
  }, [open])

  // Close dropdown on click outside
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

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="bg-green-600 hover:bg-green-700 transition-colors text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        {open ? 'Hide' : 'View'}
      </button>

      {/* Dropdown panel */}
      <div
        className={`absolute right-0 mt-2 w-72 max-h-60 overflow-y-auto bg-green-50 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 transform origin-top-right transition-all duration-300 z-50 ${
          open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="p-4 text-sm text-green-900">
          {emissions > 1000 ? (
            advisories.length > 0 ? (
              advisories.map(item => (
                <p key={item.id} className="mb-2">
                  👉 <span className="font-semibold">{item.suggestion}</span> — saves{' '}
                  <span className="font-mono">{item.estimated_reduction} kg</span> (like{' '}
                  <em>{item.equivalent_action}</em>)
                </p>
              ))
            ) : (
              <p>No advisories available currently.</p>
            )
          ) : (
            <p>No advisories needed. Emissions under control 👍</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdvisoryPopup