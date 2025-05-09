// components/DarkModeToggle.js
"use client";

import { useTheme } from "@/context/TheamContext";

export default function DarkModeToggle() {
	const { darkMode, toggleTheme } = useTheme();

	return (
		<button
			className="toggle"
			aria-pressed={darkMode}
			onClick={toggleTheme}
			aria-label="Toggle dark mode"
		>
			<span className="toggle__content">
				{/* Daytime backdrop */}
				<svg
					aria-hidden="true"
					className="toggle__backdrop"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 290 228"
				>
					<g className="clouds">
						<path
							fill="#D9D9D9"
							d="M335 147.5c0 27.89-22.61 50.5-50.5 50.5a50.78 50.78 0 0 1-9.29-.853c-2.478 12.606-10.595 23.188-21.615 29.011C245.699 243.749 228.03 256 207.5 256a50.433 50.433 0 0 1-16.034-2.599A41.811 41.811 0 0 1 166 262a41.798 41.798 0 0 1-22.893-6.782A42.21 42.21 0 0 1 135 256a41.82 41.82 0 0 1-19.115-4.592A41.84 41.84 0 0 1 88 262c-1.827 0-3.626-.117-5.391-.343C74.911 270.448 63.604 276 51 276c-23.196 0-42-18.804-42-42s18.804-42 42-42c1.827 0 3.626.117 5.391.343C64.089 183.552 75.396 178 88 178a41.819 41.819 0 0 1 19.115 4.592C114.532 176.002 124.298 172 135 172a41.798 41.798 0 0 1 22.893 6.782 42.066 42.066 0 0 1 7.239-.773C174.137 164.159 189.749 155 207.5 155c.601 0 1.199.01 1.794.031A41.813 41.813 0 0 1 234 147h.002c.269-27.66 22.774-50 50.498-50 27.89 0 50.5 22.61 50.5 50.5Z"
						/>
					</g>
				</svg>

				{/* Toggle indicator */}
				<span className="toggle__indicator-wrapper">
					<span className="toggle__indicator">
						<span className="toggle__star">
							<span className="sun">
								<span className="moon">
									<span className="moon__crater"></span>
									<span className="moon__crater"></span>
									<span className="moon__crater"></span>
								</span>
							</span>
						</span>
					</span>
				</span>

				{/* Nighttime backdrop */}
				<svg
					aria-hidden="true"
					className="toggle__backdrop"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 290 228"
				>
					<g className="clouds">
						<path
							fill="#fff"
							d="M328 167.5c0 15.214-7.994 28.56-20.01 36.068.007.31.01.621.01.932 0 23.472-19.028 42.5-42.5 42.5-3.789 0-7.461-.496-10.957-1.426C249.671 263.676 233.141 277 213.5 277a42.77 42.77 0 0 1-7.702-.696C198.089 284.141 187.362 289 175.5 289a42.338 42.338 0 0 1-27.864-10.408A42.411 42.411 0 0 1 133.5 281c-4.36 0-8.566-.656-12.526-1.876C113.252 287.066 102.452 292 90.5 292a42.388 42.388 0 0 1-15.8-3.034A42.316 42.316 0 0 1 48.5 298C25.028 298 6 278.972 6 255.5S25.028 213 48.5 213a42.388 42.388 0 0 1 15.8 3.034A42.316 42.316 0 0 1 90.5 207c4.36 0 8.566.656 12.526 1.876C110.748 200.934 121.548 196 133.5 196a42.338 42.338 0 0 1 27.864 10.408A42.411 42.411 0 0 1 175.5 204c2.63 0 5.204.239 7.702.696C190.911 196.859 201.638 192 213.5 192c3.789 0 7.461.496 10.957 1.426 2.824-10.491 9.562-19.377 18.553-24.994-.007-.31-.01-.621-.01-.932 0-23.472 19.028-42.5 42.5-42.5s42.5 19.028 42.5 42.5Z"
						/>
					</g>
				</svg>

				{/* Stars */}
				<svg
					aria-hidden="true"
					className="toggle__backdrop"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 290 228"
				>
					<g className="stars">
						<path fill="#fff" d="M50 50h2v2h-2z" transform="rotate(45 51 51)" />
						<path
							fill="#fff"
							d="M100 100h2v2h-2z"
							transform="rotate(45 101 101)"
						/>
						<path
							fill="#fff"
							d="M150 50h2v2h-2z"
							transform="rotate(45 151 51)"
						/>
						<path
							fill="#fff"
							d="M200 100h2v2h-2z"
							transform="rotate(45 201 101)"
						/>
						<path
							fill="#fff"
							d="M250 50h2v2h-2z"
							transform="rotate(45 251 51)"
						/>
					</g>
				</svg>
			</span>
		</button>
	);
}
