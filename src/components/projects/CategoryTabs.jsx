"use client";

import React from "react";
import { QuantumButton } from "@/components/UI/SpinDielButton";

// ************************ This component is used for buttons UI design *************************** //
export default function CategoryTabs({ active, onSelect }) {
	const categories = ["Website", "Creative", "Mute Box"];

	return (
		<div className="flex space-x-6">
			{categories.map((cat) => (
				<QuantumButton
					key={cat}
					text={cat}
					onClick={() => onSelect(cat)}
					active={active === cat}
					// Mini button styles
					width="auto"
					height="48px"
					borderRadius="6px"
					fontSize="1rem"
					className="px-6" // Extra padding for better text spacing
				/>
			))}
		</div>
	);
}
