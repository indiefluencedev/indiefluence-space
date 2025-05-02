// app/providers.js
'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Check for saved preference or system preference
    const saved = localStorage.getItem('darkMode')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialMode = saved ? JSON.parse(saved) : prefersDark

    setDarkMode(initialMode)
    document.body.setAttribute('data-dark-mode', initialMode)
  }, [])

  const toggleTheme = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem('darkMode', JSON.stringify(newMode))
    document.body.setAttribute('data-dark-mode', newMode)
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
