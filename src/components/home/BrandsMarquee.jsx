"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function BrandSection() {
  const logoRefs = useRef([]);
  const logos = [
    "/svg/aerawatluxe.svg", "/svg/ananthagram.svg", "/svg/bhumi-retreat.svg",
    "/svg/defined-values.svg", "/svg/genesis-classes.svg", "/svg/goldstar.svg",
    "/svg/kross-fix.svg", "/svg/logo.svg", "/svg/mars.svg",
    "/svg/modvak.svg", "/svg/mydigirecords.svg", "/svg/mypetsrecords.svg",
    "/svg/myro.svg", "/svg/nidas-pure.svg", "/svg/padama-energy.svg",
    "/svg/pmc.svg", "/svg/renault.svg", "/svg/resdec-system.svg",
    "/svg/royal-enfield.svg"
  ];

  useEffect(() => {
    let index = 0;
    const total = logos.length;

    const showNextGroup = () => {
      for (let i = 0; i < 6; i++) {
        const el = logoRefs.current[i];
        const logoIndex = (index + i) % total;
        if (el) {
          el.src = logos[logoIndex];
          el.style.opacity = 0;
        }
      }

      // Set entry positions
      gsap.set(logoRefs.current[0], { y: 80, opacity: 0 });
      gsap.set(logoRefs.current[1], { x: -80, opacity: 0 });
      gsap.set(logoRefs.current[2], { y: -80, opacity: 0 });
      gsap.set(logoRefs.current[3], { x: 80, opacity: 0 });
      gsap.set(logoRefs.current[4], { rotation: -30, transformOrigin: "top center", opacity: 0 });
      gsap.set(logoRefs.current[5], { scale: 0.8, opacity: 0 });

      const tl = gsap.timeline({
        onComplete: () => {
          // Wait 20 seconds, then fade out and switch
          setTimeout(() => {
            gsap.to(logoRefs.current, {
              opacity: 0,
              duration: 0.6,
              ease: "power1.inOut",
              onComplete: () => {
                index = (index + 6) % total;
                showNextGroup();
              }
            });
          }, 3000); // 20 seconds = 20000 ms
        }
      });

      // Animate in one-by-one
      tl.to(logoRefs.current[0], { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }, 0);
      tl.to(logoRefs.current[1], { x: 0, opacity: 1, duration: 0.7, ease: "power2.out" }, 0.2);
      tl.to(logoRefs.current[2], { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }, 0.4);
      tl.to(logoRefs.current[3], { x: 0, opacity: 1, duration: 0.7, ease: "power2.out" }, 0.6);
      tl.to(logoRefs.current[4], {
        rotation: 0,
        opacity: 1,
        duration: 0.9,
        ease: "back.out(1.7)"
      }, 0.8);
      tl.to(logoRefs.current[5], {
        scale: 1,
        opacity: 1,
        duration: 0.7,
        ease: "power2.out"
      }, 1.0);
    };

    showNextGroup(); // Start animation
  }, []);

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 items-center justify-items-center">
        {[...Array(6)].map((_, i) => (
          <img
            key={i}
            ref={(el) => (logoRefs.current[i] = el)}
            src=""
            alt={`Logo ${i}`}
            className="max-w-full h-[100px]"
          />
        ))}
      </div>
    </div>
  );
}
