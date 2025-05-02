export default function StraightSection() {
    return (
      <section className="w-screen flex flex-col lg:flex-row-reverse items-center justify-between p-4 md:p-8 min-h-screen">
        {/* Text section */}
        <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Our Vision
          </h2>
          <p className="text-lg md:text-xl mb-4">
            At Indiefluence, we believe in the power of authentic voices and creative expression.
            Our platform connects independent creators with audiences who appreciate genuine content.
          </p>
          <p className="text-lg md:text-xl mb-4">
            We're building a community where creativity thrives and innovative ideas find their audience.
            Join us on this journey of discovery and inspiration.
          </p>
          <button className="mt-6 bg-secondary-color text-white px-8 py-3 rounded-lg hover:opacity-90 transition-all">
            Join Our Community
          </button>
        </div>

        {/* Image section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="relative w-[300px] md:w-[400px] h-[300px] md:h-[400px]">
            <div className="absolute inset-0 bg-primary-color/20 rounded-full animate-pulse"></div>
            <img
              src="/svg/indiefluence-logo.svg"
              alt="Indiefluence logo"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] md:w-[300px]"
            />
          </div>
        </div>
      </section>
    );
  }
