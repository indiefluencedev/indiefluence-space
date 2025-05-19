// ************************ this component is used for buttons ui design *************************** //
import React from "react";

export default function CategoryTabs({ active, onSelect }) {
  const categories = ["Website", "Creative", "Mute Box"];
  return (
    <div className="flex space-x-6">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={
            "px-4 py-2 text-lg font-semibold rounded cursor-pointer " +
            (active === cat ? "bg-white text-gray-900" : "bg-gray-700 text-white")
          }
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
