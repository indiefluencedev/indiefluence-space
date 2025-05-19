import Image from "next/image";

export default function ProjectBlock({ title, description, image, link, isLast }) {
  return (
    <div className="relative z-10 bg-white text-black">
      {/* Content Block */}
      <div className="project-block h-[700px] md:h-[390px] lg:h-[340px] xl:h-[650px] flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between px-4 md:px-16 py-12">
        {/* Left side */}
        <div className="md:w-1/2 max-w-md">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4 mt-4">{title}</h2>
          <p className="text-base md:text-[16px] lg::text-lg mb-6">{description}</p>
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="inline-block px-5 py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
          >
            Learn More
          </a>
        </div>

        {/* Right side */}
        <div className=" mt-8 md:mt-10 lg:mt-0 md:pl-8 flex justify-center project-image-container">
          <Image
            src={image}
            alt={title}
            width={600}
            height={400}
            className="project-image rounded shadow-lg"
          />
        </div>
      </div>

      {/* Dotted Line Separator */}
      {!isLast && (
        <div className="w-full border-t border-dotted border-black" />
      )}
    </div>
  );
}
