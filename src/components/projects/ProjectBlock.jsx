// app/components/ProjectBlock.jsx
import Image from "next/image";  // using Next.js optimized Image component
export default function ProjectBlock({ title, description, image, link }) {
  return (
    <div className="project-block min-h-screen flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between px-4 md:px-16 py-12 relative">
      {/* Left side: text content */}
      <div className="md:w-1/2 max-w-md">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
        <p className="text-base md:text-lg mb-6">{description}</p>
        <a href={link} target="_blank" rel="noreferrer" 
           className="inline-block px-5 py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition">
          Learn More
        </a>
      </div>
      {/* Right side: image */}
      <div className="md:w-1/2 mt-8 md:mt-0 md:pl-8 flex justify-center project-image-container">
        <Image 
          src={image} 
          alt={title} 
          width={600} height={400} 
          className="project-image rounded shadow-lg"
        />
      </div>
    </div>
  );
}
