'use client'

import { useState } from 'react'
import { useTheme } from '@/context/TheamContext'

export default function Contact() {
  const { darkMode } = useTheme()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className={`min-h-screen py-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Contact Us
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Get in touch with our team
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className={`p-8 rounded-lg ${
            darkMode ? 'bg-gray-800' : 'bg-gray-50'
          }`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-md border ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-md border ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-4 py-2 rounded-md border ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  required
                />
              </div>

              <button
                type="submit"
                className={`w-full py-3 px-4 rounded-md font-medium ${
                  darkMode
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className={`p-8 rounded-lg ${
            darkMode ? 'bg-gray-800' : 'bg-gray-50'
          }`}>
            <h2 className={`text-2xl font-semibold mb-6 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Get in Touch
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className={`text-lg font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Email
                </h3>
                <a
                  href="mailto:contact@wbsft.com"
                  className={`text-blue-500 hover:text-blue-600 ${
                    darkMode ? 'text-blue-400 hover:text-blue-300' : ''
                  }`}
                >
                  contact@wbsft.com
                </a>
              </div>

              <div>
                <h3 className={`text-lg font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Phone
                </h3>
                <a
                  href="tel:+15148743224"
                  className={`text-blue-500 hover:text-blue-600 ${
                    darkMode ? 'text-blue-400 hover:text-blue-300' : ''
                  }`}
                >
                  (514) 874-3224
                </a>
              </div>

              <div>
                <h3 className={`text-lg font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Address
                </h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  460 Saint-Catherine W. Suite 305<br />
                  Montreal, Quebec H3B 1A6
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
