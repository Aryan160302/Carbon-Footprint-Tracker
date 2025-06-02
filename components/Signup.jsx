import React, { useState } from 'react'
import { supabase } from '../supabaseClient'
import { Link, useNavigate } from 'react-router-dom'

function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Signup successful! Redirecting to login...')
      setTimeout(() => navigate('/login'), 1000)
    }
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/bg-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* College Logo */}
      <div className="absolute top-4 left-4 z-20">
        <img
          src="/college-logo.png"
          alt="College Logo"
          className="h-64 w-auto rounded-md shadow-lg"
        />
      </div>

      {/* Signup Form */}
      <div className="relative bg-white bg-opacity-90 p-8 rounded-lg shadow-md w-full max-w-md z-10">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">🌿 Sign Up</h2>
        <form onSubmit={handleSignup} className="space-y-5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
          <button type="submit" className="w-full bg-green-600 text-white font-medium py-3 rounded hover:bg-green-700">
            Sign Up
          </button>
          {message && <p className="text-sm text-red-600 text-center">{message}</p>}
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 font-medium">Login here</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup