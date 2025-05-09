// context/ThemeContext.js
"use client";
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		// Get saved preference or use system preference as default
		const saved = localStorage.getItem("darkMode");
		const prefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;
		const initial = saved ? JSON.parse(saved) : prefersDark;

		setDarkMode(initial);
		document.documentElement.setAttribute(
			"data-dark-mode",
			initial ? "true" : "false",
		);
	}, []);

	const toggleTheme = () => {
		const newTheme = !darkMode;
		setDarkMode(newTheme);

		// Save to localStorage
		localStorage.setItem("darkMode", JSON.stringify(newTheme));

		// Update data attribute on document for CSS selectors
		document.documentElement.setAttribute(
			"data-dark-mode",
			newTheme ? "true" : "false",
		);
	};

	return (
		<ThemeContext.Provider value={{ darkMode, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => useContext(ThemeContext);
