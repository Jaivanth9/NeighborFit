import React, { useState } from 'react'
import axios from 'axios'

const App = () => {
  const [form, setForm] = useState({
    nature: false,
    nightlife: false,
    schools: false,
    publicTransport: false
  })

  const [match, setMatch] = useState(null)
  const [loading, setLoading] = useState(false)

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const handleChange = (e) => {
    const { name, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await axios.post('http://localhost:5000/match', form)
      setMatch(response.data)
    } catch (err) {
      console.error('Match request failed', err)
      setMatch(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0e7ff] via-[#f5d0fe] to-[#ffe4e6] flex flex-col items-center justify-center p-6 space-y-6 relative overflow-hidden">
      
      {/* Background Blur Circles */}
      <div className="absolute top-[-50px] left-[-50px] w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-[-60px] right-[-40px] w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      {/* Date */}
      <div className="text-lg md:text-xl font-semibold text-gray-800 bg-white/70 px-6 py-2 rounded-full shadow-md backdrop-blur-md border border-gray-300 animate-fade-in">
        📅 {today}
      </div>

      {/* Main Card */}
      <div className="w-full max-w-xl bg-white/60 border border-white/30 backdrop-blur-xl rounded-3xl shadow-2xl p-10 z-10 animate-fade-in-down transition-all duration-500 ease-in-out">
        <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-8 tracking-tight drop-shadow">
          🌟 Find Your Perfect Neighborhood
        </h2>

        <div className="space-y-5">
          {[
            { label: '🌳 Likes Nature', name: 'nature' },
            { label: '🌃 Enjoys Nightlife', name: 'nightlife' },
            { label: '🏫 Wants Good Schools', name: 'schools' },
            { label: '🚌 Needs Public Transport', name: 'publicTransport' },
          ].map((opt) => (
            <label
              key={opt.name}
              className="flex items-center space-x-4 text-lg font-medium text-gray-700 hover:text-purple-600 transition-colors duration-200"
            >
              <input
                type="checkbox"
                name={opt.name}
                onChange={handleChange}
                className="h-5 w-5 accent-purple-600 rounded-md shadow-sm focus:ring-purple-500"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-xl font-semibold shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          {loading ? '🔍 Matching...' : '🔎 Find Match'}
        </button>

        {match && (
          <div className="mt-10 p-6 bg-white/80 border border-purple-200 rounded-xl text-center shadow-inner animate-scale-in">
            <h3 className="text-2xl font-bold text-purple-800 mb-1">
              🏘️ Best Match: {match.name}
            </h3>
            <p className="text-md text-gray-700">
              Matching Score: <span className="font-semibold">{match.score}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
