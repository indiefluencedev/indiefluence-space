"use client"
import { Carousel, Card } from "@/components/projects/Mutebox-cards-carousel"

export default function StackingCards() {
  const cards = data.map((card, index) => <Card key={card.src} card={card} index={index} />)

  return (
    <div className="w-full min-h-screen">
      {/* Content before the carousel */}
      {/* <div className="h-screen flex items-center justify-center bg-gray-50">
        <h1 className="text-4xl md:text-6xl font-bold text-center">
          Scroll Down
          <br />
          For Trending Content
        </h1>
      </div> */}

      {/* Carousel section */}
      <section className="w-full">
        <h2 className="max-w-7xl pl-[150px] mx-auto text-xl md:text-5xl font-bold text-default font-sans sticky top-4 z-20">
          Trending Content
        </h2>
        <Carousel items={cards} />
      </section>

      {/* Content after the carousel */}
      {/* <div className="h-screen flex items-center justify-center bg-gray-100">
        <h2 className="text-3xl md:text-5xl font-bold text-center">
          Continue Exploring
          <br />
          More Content Below
        </h2>
      </div> */}
    </div>
  )
}

// Updated data structure with redirectUrl for each card
const data = [
  {
    category: "Fashion",
    title: "Summer Collection",
    src: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWN2MngzejBmejdpYmU0cGt0Yno4ejk5d3ljMXQ1dHBrenBrcmthayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Z5xk7fGO5FjjTElnpT/giphy.gif",
    redirectUrl: "https://instagram.com/p/example1",
  },
  {
    category: "Food",
    title: "Cooking Masterclass",
    src: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWN2MngzejBmejdpYmU0cGt0Yno4ejk5d3ljMXQ1dHBrenBrcmthayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Z5xk7fGO5FjjTElnpT/giphy.gif",
    redirectUrl: "https://instagram.com/p/example2",
  },
  {
    category: "Travel",
    title: "Exotic Destinations",
    src: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWN2MngzejBmejdpYmU0cGt0Yno4ejk5d3ljMXQ1dHBrenBrcmthayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Z5xk7fGO5FjjTElnpT/giphy.gif",
    redirectUrl: "https://instagram.com/p/example3",
  },
  {
    category: "Fitness",
    title: "Home Workout Tips",
    src: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWN2MngzejBmejdpYmU0cGt0Yno4ejk5d3ljMXQ1dHBrenBrcmthayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Z5xk7fGO5FjjTElnpT/giphy.gif",
    redirectUrl: "https://instagram.com/p/example4",
  },
  {
    category: "Tech",
    title: "Latest Gadgets",
    src: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWN2MngzejBmejdpYmU0cGt0Yno4ejk5d3ljMXQ1dHBrenBrcmthayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Z5xk7fGO5FjjTElnpT/giphy.gif",
    redirectUrl: "https://instagram.com/p/example5",
  },
  {
    category: "Art",
    title: "Digital Creations",
   src: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWN2MngzejBmejdpYmU0cGt0Yno4ejk5d3ljMXQ1dHBrenBrcmthayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Z5xk7fGO5FjjTElnpT/giphy.gif",
    redirectUrl: "https://instagram.com/p/example6",
  },
]
