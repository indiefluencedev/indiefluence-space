"use client";
import { useState, useEffect } from "react";
import ModernTransition from "./ModernTransitions";

const TransitionDemo = () => {
	const [transitionType, setTransitionType] = useState("slice");
	const [key, setKey] = useState(0);
	const [darkMode, setDarkMode] = useState(false);

	const transitionOptions = [
		{ value: "slice", label: "Slice" },
		{ value: "wipe", label: "Wipe" },
		{ value: "vignette", label: "Vignette" },
		{ value: "typewriter", label: "Typewriter" },
		{ value: "blinds", label: "Blinds" },
	];

	// Force re-render when transition type changes
	useEffect(() => {
		setKey((prevKey) => prevKey + 1);
	}, [transitionType]);

	return (
		<div
			className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} transition-colors duration-300`}
		>
			<div className="container mx-auto p-8">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-4xl font-bold">Modern Transitions</h1>
					<button
						onClick={() => setDarkMode(!darkMode)}
						className={`px-4 py-2 rounded-md ${
							darkMode ? "bg-white text-gray-900" : "bg-gray-900 text-white"
						} transition-colors`}
					>
						{darkMode ? "Light Mode" : "Dark Mode"}
					</button>
				</div>

				<div className="mb-10">
					<h2 className="text-xl font-semibold mb-4">Choose a Transition:</h2>
					<div className="flex flex-wrap gap-3">
						{transitionOptions.map((option) => (
							<button
								key={option.value}
								onClick={() => setTransitionType(option.value)}
								className={`px-5 py-3 rounded-md transition-all duration-200 ${
									transitionType === option.value
										? darkMode
											? "bg-white text-gray-900 shadow-lg transform scale-105"
											: "bg-black text-white shadow-lg transform scale-105"
										: darkMode
											? "bg-gray-800 text-gray-300 hover:bg-gray-700"
											: "bg-gray-200 text-gray-800 hover:bg-gray-300"
								}`}
							>
								{option.label}
							</button>
						))}
					</div>
				</div>

				<div
					className={`border ${darkMode ? "border-gray-700" : "border-gray-200"} rounded-lg overflow-hidden shadow-xl`}
				>
					<div key={key} className="relative" style={{ height: "500px" }}>
						<ModernTransition type={transitionType} contained={true}>
							<div
								className={`p-8 h-full flex items-center justify-center ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
							>
								<div className="text-center max-w-md">
									<h2 className="text-3xl font-bold mb-4">
										{
											transitionOptions.find((o) => o.value === transitionType)
												?.label
										}{" "}
										Transition
									</h2>
									<p className="mb-8 text-lg">
										A modern, minimalist{" "}
										{transitionOptions
											.find((o) => o.value === transitionType)
											?.label.toLowerCase()}
										effect using clean black & white aesthetics.
									</p>
									<div className="flex gap-4 justify-center">
										<button
											onClick={() => {
												// Force a re-render to see the transition again
												setKey((prevKey) => prevKey + 1);
											}}
											className={`px-6 py-3 rounded-md transition-colors ${
												darkMode
													? "bg-white text-gray-900 hover:bg-gray-200"
													: "bg-black text-white hover:bg-gray-800"
											}`}
										>
											Replay Transition
										</button>

										<button
											onClick={() => {
												const currentIndex = transitionOptions.findIndex(
													(o) => o.value === transitionType,
												);
												const nextIndex =
													(currentIndex + 1) % transitionOptions.length;
												setTransitionType(transitionOptions[nextIndex].value);
											}}
											className={`px-6 py-3 rounded-md transition-colors ${
												darkMode
													? "bg-gray-700 text-white hover:bg-gray-600"
													: "bg-gray-300 text-gray-800 hover:bg-gray-400"
											}`}
										>
											Next Effect
										</button>
									</div>
								</div>
							</div>
						</ModernTransition>
					</div>
				</div>

				<div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
					<div
						className={`p-6 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
					>
						<h3 className="text-xl font-semibold mb-3">How to Use</h3>
						<p className="mb-4">
							Import the ModernTransition component and wrap your page content:
						</p>
						<div
							className={`p-4 rounded ${darkMode ? "bg-gray-900" : "bg-gray-200"} font-mono text-sm`}
						>
							{`import ModernTransition from './ModernTransitions';\n\nexport default function Page() {\n  return (\n    <ModernTransition type="${transitionType}">\n      <YourContent />\n    </ModernTransition>\n  );\n}`}
						</div>
					</div>

					<div
						className={`p-6 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
					>
						<h3 className="text-xl font-semibold mb-3">Features</h3>
						<ul className="space-y-2">
							<li>• Clean black & white minimalist design</li>
							<li>• Smooth GSAP-powered animations</li>
							<li>• Works with Next.js page transitions</li>
							<li>• Responsive and customizable</li>
							<li>• Five unique transition styles</li>
							<li>• Light performance footprint</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TransitionDemo;
