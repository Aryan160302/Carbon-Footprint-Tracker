import React from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

function Navbar() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="flex justify-between items-center p-4 text-white backdrop-blur-md bg-black/30 sticky top-0 z-10">
      <h2 className="text-2xl ml-12 font-bold">R.V College of Engineering</h2>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded font-medium"
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar