// ClientTestimonials.js
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
	{
		id: "t001",
		quote:
			"Their advisory services transformed our tech strategy completely...",
		author: "Sarah Johnson",
		position: "CEO, InnovateTech",
		company: "InnovateTech",
		image: "/api/placeholder/120/120",
	},
	{
		id: "t002",
		quote:
			"The system architecture they designed has scaled flawlessly...",
		author: "Michael Chen",
		position: "CTO, ScaleUp Solutions",
		company: "ScaleUp Solutions",
		image: "/api/placeholder/120/120",
	},
	{
		id: "t003",
		quote:
			"Their backend development team delivered a solution...",
		author: "Elena Rodriguez",
		position: "VP of Engineering, DataFlow",
		company: "DataFlow",
		image: "/api/placeholder/120/120",
	},
	{
		id: "t004",
		quote:
			"Our user engagement metrics doubled after implementing...",
		author: "James Wilson",
		position: "Product Director, UserFirst",
		company: "UserFirst",
		image: "/api/placeholder/120/120",
	},
	{
		id: "t005",
		quote:
			"Their DevOps implementation reduced our deployment time...",
		author: "Aisha Patel",
		position: "Lead Developer, CloudNative",
		company: "CloudNative",
		image: "/api/placeholder/120/120",
	},
];

export default function ClientTestimonials() {
	const testimonialsRef = useRef(null);
	const testimonialsContainerRef = useRef(null);
	const testimonialElementsRef = useRef([]);

	useEffect(() => {
		const section = testimonialsRef.current;
		const container = testimonialsContainerRef.current;

		if (!section || !container) return;

		const totalWidth = testimonials.length * 100;
		gsap.set(container, { width: `${totalWidth}%` });

		const horizontalScroll = gsap.timeline({
			scrollTrigger: {
				trigger: section,
				start: "top top",
				end: `+=${totalWidth}%`,
				pin: true,
				scrub: 1,
				anticipatePin: 1,
				invalidateOnRefresh: true,
			},
		});

		horizontalScroll.fromTo(
			container,
			{ x: () => -(container.scrollWidth - window.innerWidth) },
			{ x: 0, ease: "none" }
		);

		testimonialElementsRef.current.forEach((el, index) => {
			gsap.fromTo(
				el,
				{ x: 100, opacity: 0 },
				{
					x: 0,
					opacity: 1,
					duration: 1,
					scrollTrigger: {
						trigger: el,
						containerAnimation: horizontalScroll,
						start: "right left",
						end: "right center",
						scrub: true,
					},
				}
			);
		});

		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	}, []);

	return (
		<section ref={testimonialsRef} className="w-full h-screen overflow-hidden relative">
			<div ref={testimonialsContainerRef} className="absolute top-0 left-0 h-full flex">
				{testimonials.map((testimonial, index) => (
					<div
						key={testimonial.id}
						ref={(el) => (testimonialElementsRef.current[index] = el)}
						className="w-screen h-full flex items-center px-8 md:px-16 border-b border-gray-200 [data-dark-mode='true']:border-gray-800"
					>
						<div className="w-full h-full flex flex-col md:flex-row items-center">
							{/* Image section */}
							<div className="w-full md:w-1/2 h-3/4 bg-gray-100 [data-dark-mode='true']:bg-gray-800 flex items-center justify-center">
								<div className="relative w-3/4 h-3/4">
									<img
										src="/api/placeholder/800/600"
										alt={`${testimonial.company} project`}
										className="w-full h-full object-cover"
									/>
									<div className="absolute -bottom-4 -right-4 bg-white [data-dark-mode='true']:bg-gray-900 p-4 shadow-lg">
										<img
											src={testimonial.image}
											alt={testimonial.company}
											className="w-24 h-12 object-contain"
										/>
									</div>
								</div>
							</div>

							{/* Text content section */}
							<div className="w-full md:w-1/2 h-full flex flex-col justify-center pl-8">
								<div className="flex items-center">
									<span className="text-sm font-mono opacity-50 mb-2">T/{testimonial.id}</span>
								</div>
								<div className="text-4xl md:text-5xl font-serif mb-8">"</div>
								<p className="text-lg md:text-2xl max-w-xl mb-12 font-serif italic">{testimonial.quote}</p>
								<div className="flex items-center">
									<div className="w-12 h-12 rounded-full overflow-hidden mr-4">
										<img src={testimonial.image} alt={testimonial.author} className="w-full h-full object-cover" />
									</div>
									<div>
										<h4 className="font-bold">{testimonial.author}</h4>
										<p className="text-sm opacity-70">
											{testimonial.position}, {testimonial.company}
										</p>
									</div>
								</div>
								<button className="mt-12 border border-black [data-dark-mode='true']:border-white text-black [data-dark-mode='true']:text-white px-8 py-3 hover:bg-black hover:text-white [data-dark-mode='true']:hover:bg-white [data-dark-mode='true']:hover:text-black transition-all w-fit flex items-center group">
									<span>READ CASE STUDY</span>
									<svg
										className="ml-4 w-4 h-4 group-hover:translate-x-1 transition-transform"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M13 5L20 12L13 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
										<path d="M3 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
