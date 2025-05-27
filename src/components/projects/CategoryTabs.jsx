"use client";

import React from "react";
import { QuantumButton } from "@/components/UI/QuantumButton";

// ************************ This component is used for buttons UI design *************************** //
export default function CategoryTabs({ active, onSelect }) {
	const categories = ["Website", "Creative", "Mute Box"];

	return (
		<div className="flex flex-wrap justify-center sm:space-x-6 gap-x-4 gap-y-4">
			{categories.map((cat, index) => (
				<div
					key={cat}
					className={`${
						index === 2 ? "w-full flex justify-center" : ""
					} sm:w-auto`}
				>
					<QuantumButton
						text={cat}
						onClick={() => onSelect(cat)}
						active={active === cat}
						width="auto"
						height="48px"
						borderRadius="6px"
						fontSize="1rem"
						className="px-6"
					/>
				</div>
			))}
		</div>
	);
}
