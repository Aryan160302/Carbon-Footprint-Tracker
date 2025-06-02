import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import App from './App'
import AdminPanel from './components/AdminPanel' 
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} /> 
      </Routes>
    </BrowserRouter>
    <footer className="text-center text-white mt-10 text-sm">
  <p className="opacity-80">Project created by <span className="font-semibold">Aryan Chaturvedi</span> — USN: 1RV22CY014</p>
</footer>
  </React.StrictMode>
)