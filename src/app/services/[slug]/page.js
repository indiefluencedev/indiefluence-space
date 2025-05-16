'use client';

import { useRef, useEffect, useState, use } from 'react'; // Import 'use' from React
import { notFound } from 'next/navigation';
import { services } from '@/data/services';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '@/context/TheamContext';
import useWindowWidth from '@/hooks/useWindowWidth';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ServiceDetailPage({ params }) {
  // Unwrap params using React.use()
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;

  const { darkMode } = useTheme();
  const width = useWindowWidth();
  const isDesktop = width >= 1024;

  const [openMobileSections, setOpenMobileSections] = useState([]);
  const [changedIndex, setChangedIndex] = useState(null);
  const [firstManuallyToggled, setFirstManuallyToggled] = useState(false);

  const mobileContentRef = useRef([]);
  const mobileImageRef = useRef([]);
  const mobileTextRef = useRef([]);
  const mobileContainerRef = useRef(null);

  const service = services.find(
    (s) => s.slug.toLowerCase() === slug.toLowerCase()
  );

  const sectionRefs = useRef([]);
  const imageRefs = useRef([]);
  const leftColRef = useRef(null);
  const titleRef = useRef(null);
  const textContainerRef = useRef(null);
  const leftTextRefs = useRef([]);

  if (!service) return notFound();

  const { title, details } = service;

  const toggleMobileSection = (index) => {
    const scrollPosition = window.scrollY;

    setChangedIndex(index);

    setOpenMobileSections((prev) => {
      const updated = [...prev];
      updated[index] = !prev[index];

      if (index === 0 && prev[index] === true) {
        setFirstManuallyToggled(true);
      }

      return updated;
    });

    setTimeout(() => {
      window.scrollTo({
        top: scrollPosition,
        behavior: 'auto',
      });
    }, 10);
  };

  useEffect(() => {
    if (!isDesktop) {
      setOpenMobileSections(details.map((_, i) => (i === 0 ? true : false)));
      setFirstManuallyToggled(false);
    }
  }, [slug, isDesktop, details]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      gsap.set(textContainerRef.current, {
        position: 'relative',
        overflow: 'hidden',
      });

      leftTextRefs.current.forEach((el, i) => {
        const children = el.querySelectorAll('h2, p');
        gsap.set(children, { opacity: 0, y: -20 });

        gsap.set(el, {
          opacity: i === 0 ? 1 : 0,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        });

        if (i === 0) {
          gsap.to(children, {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 1.2,
            ease: 'power4.out',
          });
        }
      });

      let currentIndex = 0;

      details.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: sectionRefs.current[i],
          start: 'top center',
          onEnter: () => {
            if (currentIndex !== i) {
              const oldChildren = leftTextRefs.current[currentIndex].querySelectorAll('h2, p');
              const newChildren = leftTextRefs.current[i].querySelectorAll('h2, p');

              gsap.to(leftTextRefs.current[currentIndex], {
                opacity: 0,
                duration: 0.6,
                ease: 'power2.out',
              });
              gsap.set(newChildren, { opacity: 0, y: -20 });

              gsap.to(leftTextRefs.current[i], {
                opacity: 1,
                duration: 0.3,
                onComplete: () => {
                  gsap.to(newChildren, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.15,
                    duration: 1.2,
                    ease: 'power4.out',
                  });
                },
              });

              currentIndex = i;
            }
          },
          onLeaveBack: () => {
            if (i > 0 && currentIndex !== i - 1) {
              const oldChildren = leftTextRefs.current[currentIndex].querySelectorAll('h2, p');
              const newChildren = leftTextRefs.current[i - 1].querySelectorAll('h2, p');

              gsap.to(leftTextRefs.current[currentIndex], {
                opacity: 0,
                duration: 0.6,
                ease: 'power2.out',
              });
              gsap.set(newChildren, { opacity: 0, y: -20 });

              gsap.to(leftTextRefs.current[i - 1], {
                opacity: 1,
                duration: 0.3,
                onComplete: () => {
                  gsap.to(newChildren, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.15,
                    duration: 1.2,
                    ease: 'power4.out',
                  });
                },
              });

              currentIndex = i - 1;
            }
          },
        });
      });
    });

    mm.add('(min-width: 0px)', () => {
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
    });

    if (!isDesktop && !firstManuallyToggled && !openMobileSections[0]) {
      setChangedIndex(0);
      setOpenMobileSections((prev) => {
        const updated = [...prev];
        updated[0] = true;
        return updated;
      });
    }

    if (!isDesktop && changedIndex !== null && mobileContentRef.current[changedIndex]) {
      const i = changedIndex;
      const isOpen = openMobileSections[i];

      gsap.killTweensOf(mobileContentRef.current[i]);

      const contentHeight = mobileContentRef.current[i].scrollHeight;

      if (isOpen) {
        gsap.set(mobileContentRef.current[i], {
          height: contentHeight,
          overflow: 'hidden',
          willChange: 'height',
        });

        gsap.timeline().to(mobileContentRef.current[i], {
          height: contentHeight,
          duration: 0.4,
          ease: 'power2.out',
          onComplete: () => {
            gsap.set(mobileContentRef.current[i], { height: 'auto' });
          },
        });

        if (mobileImageRef.current[i]) {
          gsap.fromTo(
            mobileImageRef.current[i],
            { y: -100, opacity: 0, scale: 0.98 },
            { y: 0, opacity: 1, scale: 1, duration: 0.6, delay: 0.05, ease: 'back.out(1.2)' }
          );
        }

        if (mobileTextRef.current[i]) {
          gsap.fromTo(
            mobileTextRef.current[i],
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, delay: 0.15, ease: 'power2.out' }
          );
        }
      } else {
        gsap.to(mobileContentRef.current[i], {
          height: 0,
          duration: 0.4,
          ease: 'power2.inOut',
          clearProps: 'height',
          onComplete: () => {
            if (mobileImageRef.current[i]) {
              gsap.set(mobileImageRef.current[i], { clearProps: 'all' });
            }
            if (mobileTextRef.current[i]) {
              gsap.set(mobileTextRef.current[i], { clearProps: 'all' });
            }
          },
        });
      }
    }

    setChangedIndex(null);
    return () => mm.revert();
  }, [details, openMobileSections, isDesktop, changedIndex, firstManuallyToggled, slug]);

  return (
    <div className={`w-full my-10 lg:my-28 pt-10 px-1 transition-colors duration-300 ${darkMode ? ' text-white' : ' text-white'}`}>
      {!isDesktop && (
        <h1
          ref={titleRef}
          className={`text-[32px] xs:text-4xl md:text-6xl text-center tracking-widest font-bold uppercase mt-10 text-[#395299] leading-tight ${darkMode ? 'text-[#fbcc03]' : 'text-[#395299]'}`}
        >
          {title}
        </h1>
      )}

      <div className="lg:flex max-w-[1600px] 3xl:max-w-[1840px] mx-auto">
        {isDesktop && (
          <div ref={leftColRef} className="hidden lg:block w-full lg:w-1/2 px-6 h-screen sticky top-0">
            {/* Desktop left panel */}
          </div>
        )}

        <div className="w-full lg:w-1/2">
          {/* MOBILE CONTENT */}
          {!isDesktop && (
            <div ref={mobileContainerRef} className="bg-black rounded-3xl mt-16 md:mt-20 mx-4 p-2 md:p-8 space-y-8 md:space-y-16">
              {details.map((sec, i) => (
                <div key={i} className="relative">
                  <button
                    onClick={() => toggleMobileSection(i)}
                    className="w-full text-left px-4 py-3 md:py-5 flex justify-between items-center rounded-xl text-white bg-black z-10"
                  >
                    <h3 className="font-bold xxs:text-[16px] xs:text-[20px] md:text-[28px] tracking-widest">{sec.heading}</h3>
                    <ArrowUpRight
                      className={`md:w-12 md:h-12 w-8 h-8 transition-transform duration-300 ${
                        openMobileSections[i] ? 'rotate-0 text-[#fbcc03]' : 'rotate-[90deg] text-gray-400'
                      }`}
                    />
                  </button>

                  <div
                    ref={(el) => (mobileContentRef.current[i] = el)}
                    className="overflow-hidden h-0"
                    style={{ willChange: 'height, opacity' }}
                  >
                    <div className="pt-4 pb-6 px-2 text-center">
                      <div ref={(el) => (mobileImageRef.current[i] = el)} className="overflow-hidden rounded-2xl mb-4">
                        <img src={sec.image} alt={sec.heading} className="w-full h-[220px] sm:h-[300px] object-cover" />
                      </div>
                      <p ref={(el) => (mobileTextRef.current[i] = el)} className="text-[16px] md:text-[20px] tracking-widest text-gray-300 text-left">
                        {sec.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}