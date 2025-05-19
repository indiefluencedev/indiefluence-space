"use client";
import { Carousel, Card } from "@/components/UI/Mutebox-cards-carousel";

export default function AppleCardsCarouselDemo() {
	const cards = data.map((card, index) => (
		<Card key={card.src} card={card} index={index} />
	));

	return (
		<div className="w-full h-full py-10">
			<h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
				Trending Content
			</h2>
			<Carousel items={cards} />
		</div>
	);
}

// Updated data structure with redirectUrl for each card
const data = [
	{
		category: "Fashion",
		title: "Summer Collection",
		src: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWN2MngzejBmejdpYmU0cGt0Yno4ejk5d3ljMXQ1dHBrenBrcmthayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Z5xk7fGO5FjjTElnpT/giphy.gif", // Dummy GIF URL - replace with your actual GIF
		redirectUrl: "https://instagram.com/p/example1", // Instagram post URL
	},
	{
		category: "Food",
		title: "Cooking Masterclass",
		src: "/gif/Sowhat.gif", // Dummy GIF URL
		redirectUrl: "https://instagram.com/p/example2",
	},
	{
		category: "Travel",
		title: "Exotic Destinations",
		src: "https://example.com/gifs/travel.gif", // Dummy GIF URL
		redirectUrl: "https://instagram.com/p/example3",
	},
	{
		category: "Fitness",
		title: "Home Workout Tips",
		src: "https://example.com/gifs/fitness.gif", // Dummy GIF URL
		redirectUrl: "https://instagram.com/p/example4",
	},
	{
		category: "Tech",
		title: "Latest Gadgets",
		src: "https://example.com/gifs/tech.gif", // Dummy GIF URL
		redirectUrl: "https://instagram.com/p/example5",
	},
	{
		category: "Art",
		title: "Digital Creations",
		src: "https://example.com/gifs/art.gif", // Dummy GIF URL
		redirectUrl: "https://instagram.com/p/example6",
	},
];
