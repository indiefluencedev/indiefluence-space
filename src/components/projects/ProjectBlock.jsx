import Image from "next/image";

export default function ProjectBlock({ title, description, image, link, isLast }) {
  return (
    <div className="project-block relative bg-white text-black w-full">
      {/* Content Block */}
      <div className="project-content h-auto px-4 md:px-8 pt-12 pb-5 flex items-center justify-center w-full">
        <div className="xl:max-w-[1200px] w-full flex flex-col md:flex-row items-center md:items-start justify-between">
          {/* Left side */}
          <div className="content-left md:sticky top-8 z-20">
            <h2 className="text-3xl md:text-[30px] lg:text-[35px] xl:text-[45px] font-bold mb-6  tracking-wide md:w-[400px] lg:w-[500px] xl:w-[650px]">
              {title}
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl mb-8 md:w-[400px]">
              {description}
            </p>
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
            >
              Learn More
            </a>
          </div>

          {/* Right side — Square Image */}
          <div className="project-image-container flex items-center justify-center p-4 mt-8 xl:mt-4 md:p-0 md:sticky top-8 z-10">
            <div className="w-[260px] h-[260px] sm:w-[300px] sm:h-[300px] lg:w-[350px] lg:h-[350px] xl:w-[420px] xl:h-[420px] 2xl:w-[500px] 2xl:h-[500px] aspect-square">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-contain rounded-lg project-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}