// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		"./app/**/*.{js,jsx,ts,tsx}",
		"./components/**/*.{js,jsx,ts,tsx}",
		"./pages/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		// Define custom breakpoints
		screens: {
			xxs: "320px", // Extra extra small screens
			xs: "480px", // Extra small screens
			sm: "640px", // Small screens (Tailwind default)
			md: "768px", // Medium screens (Tailwind default)
			lg: "1024px", // Large screens (Tailwind default)
			xl: "1280px", // Extra large screens (Tailwind default)
			"2xl": "1536px", // 2X large screens (Tailwind default)
			"3xl": "1920px", // Custom 3X large screens
		},
		extend: {
			// You can extend other theme properties here
			// For example:
			fontSize: {
				"2xs": "0.625rem", // 10px
				"3xs": "0.5rem", // 8px
			},
			colors: {
				"brand-yellow": "#fbcc03",
				"brand-blue": "#395299",
			},
			spacing: {
				128: "32rem",
				144: "36rem",
			},
		},
	},
	plugins: [],
	// Enable JIT (Just-In-Time) mode for faster development
	mode: "jit",
};
