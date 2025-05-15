'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '@/context/TheamContext';

gsap.registerPlugin(ScrollTrigger);

export default function ServiceDetailMobile({ title, details }) {
  const { darkMode } = useTheme();
  const titleRef = useRef(null);
  const imageRefs = useRef([]);

  useEffect(() => {
    gsap.from(titleRef.current, {
      x: -100,
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
    });

    imageRefs.current.forEach((imgEl) => {
      gsap.set(imgEl, { opacity: 0 });

      ScrollTrigger.create({
        trigger: imgEl,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(imgEl, {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
          });
        },
        onLeaveBack: () => {
          gsap.to(imgEl, {
            opacity: 1,
            duration: 0.2,
          });
        },
        once: true,
      });
    });
  }, [details]);

  return (
    <div className={`w-full my-28 pt-10 px-4 transition-colors duration-300 ${darkMode ? ' text-white' : ' text-white'}`}>
      <h1 ref={titleRef} className="text-3xl font-bold p-4 text-center">{title}</h1>

      <div className="w-full max-w-[1600px] mx-auto">
        {details.map((sec, i) => (
          <div key={i} className={`px-2 py-10 flex flex-col justify-center items-center ${i === details.length - 1 ? 'mb-[20vh]' : ''}`}>
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-semibold tracking-widest">{sec.heading}</h2>
              <p className={`text-base ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                {sec.description}
              </p>
            </div>

            <div className={`rounded-3xl p-8 w-full max-w-[500px] shadow-lg ${darkMode ? 'bg-black' : 'bg-black border border-gray-200'}`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl pb-3 font-semibold tracking-widest">{sec.heading}</h3>
              </div>
              <img
                ref={(el) => (imageRefs.current[i] = el)}
                src={sec.image}
                alt={sec.heading}
                className="w-full object-cover rounded-xl"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
