"use client";

import React from "react";

export default function HeadingComponent({
	sectionLabel = "SECTION",
	title,
	sectionNumber = "001",
	className = "",
}) {
	return (
		<section
			className={`w-full py-12 md:py-16 flex flex-col justify-center items-center border-b border-gray-200 dark:border-gray-800 ${className}`}
		>
			<div className="w-full max-w-7xl mx-auto px-4 md:px-8">
				<div className="flex flex-col md:flex-row justify-between items-center w-full">
					<div className="flex items-center mb-4 md:mb-0">
						<span className="text-sm font-mono opacity-50">{sectionLabel}</span>
					</div>
					{typeof title === "string" ? (
						<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center">
							{title}
						</h1>
					) : (
						<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center">
							{title}
						</h1>
					)}
					<div className="flex items-center mt-4 md:mt-0">
						<span className="text-sm font-mono opacity-50">
							/{sectionNumber}
						</span>
					</div>
				</div>
			</div>
		</section>
	);
}
