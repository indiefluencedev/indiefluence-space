"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { Button1,Button2,Button3,Button4,Button5 } from "../UI/SpinDielButton";
gsap.registerPlugin(TextPlugin);

// Hoverable Letter component for interactive text - now respects theme
const HoverableLetter = ({ letter, className = "", reverse = false }) => {
  const [isHovering, setIsHovering] = useState(false);
  const letterRef = useRef(null);

  useEffect(() => {
    if (!letterRef.current) return;

    if (isHovering) {
      gsap.to(letterRef.current, {
        color: reverse ? 'var(--primary-color)' : 'var(--secondary-color)',
        scale: 1.1,
        duration: 0.2,
        ease: "power1.out"
      });
    } else {
      gsap.to(letterRef.current, {
        color: reverse ? 'var(--secondary-color)' : 'var(--primary-color)',
        scale: 1,
        duration: 0.2,
        ease: "power1.out"
      });
    }
  }, [isHovering, reverse]);

  return (
    <span
      ref={letterRef}
      className={`hoverable-letter inline-block ${className}`}
      style={{
        color: reverse ? 'var(--secondary-color)' : 'var(--primary-color)',
        transition: 'none'
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {letter === " " ? "\u00A0" : letter}
    </span>
  );
};

// Updated component for text with hoverable letters - uses CSS vars
const HoverableText = ({ text, isSecondary = false, reverse = false, className = "" }) => {
  return (
    <div className={className}>
      {text.split('').map((letter, index) => (
        <HoverableLetter
          key={index}
          letter={letter}
          className={isSecondary ? "text-[var(--secondary-color)]" : ""}
          reverse={reverse}
        />
      ))}
    </div>
  );
};

// Original SpinDialText component with added theme awareness
const SpinDialText = ({ text, isHovering, duration = 0.5 }) => {
  const charRefs = useRef([]);

  useEffect(() => {
    if (!isHovering) return;

    // Cancel any existing animations
    charRefs.current.forEach(ref => {
      if (ref) gsap.killTweensOf(ref);
    });

    // Create quick spin animations with slight stagger
    charRefs.current.forEach((charEl, index) => {
      if (!charEl) return;

      const targetChar = text[index];

      gsap.fromTo(
        charEl,
        { innerHTML: Math.random() > 0.5 ? "0" : "A" },
        {
          duration: duration,
          innerHTML: targetChar,
          ease: "steps(5)",
          delay: index * 0.03, // Very short stagger
          onUpdate: function() {
            // During animation, show random characters
            if (this.progress() < 0.8) {
              const randomChar = Math.random() > 0.5 ?
                String.fromCharCode(65 + Math.floor(Math.random() * 26)) : // A-Z
                Math.floor(Math.random() * 10).toString(); // 0-9
              charEl.innerHTML = randomChar;
            } else {
              // Final character
              charEl.innerHTML = targetChar;
            }
          }
        }
      );
    });
  }, [isHovering, text, duration]);

  return (
    <span className="inline-flex">
      {text.split('').map((char, index) => (
        <span
          key={index}
          ref={el => charRefs.current[index] = el}
          className="inline-block font-mono"
          style={{ width: '0.8em', textAlign: 'center' }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

const splitText = (text, className = "") =>
  text.split("").map((char, i) => (
    <span key={i} className={`${className} inline-block`}>
      {char === " " ? "\u00A0" : char}
    </span>
  ));

const SharedHeading = () => {
  const fromRef = useRef([]);
  const ideasSpan = useRef(null);
  const toRef = useRef([]);
  const impactSpan = useRef(null);
  const [buttonHover, setButtonHover] = useState(false);
  const [ideasVisible, setIdeasVisible] = useState(false);
  const [impactVisible, setImpactVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Refs for button animations
  const btnBlackRef = useRef(null);
  const textBlackRef = useRef(null);
  const underlineRef = useRef(null);

  // Check for dark mode on mount and when theme changes
  useEffect(() => {
    // Check if we're in dark mode on component mount
    const checkDarkMode = () => {
      const isDark = document.documentElement.getAttribute('data-dark-mode') === 'true';
      setIsDarkMode(isDark);
    };

    // Initial check
    checkDarkMode();

    // Set up observer for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-dark-mode'
        ) {
          checkDarkMode();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    // Clean up observer
    return () => observer.disconnect();
  }, []);

  // Animate on mount
  useEffect(() => {
    const timeline = gsap.timeline();

    // "From"
    timeline.from(fromRef.current, {
      y: 80,
      opacity: 0,
      stagger: 0.04,
      duration: 1,
      ease: "power3.out",
    });

    // Scramble animation for "IDEAS"
    timeline.fromTo(
      ideasSpan.current,
      { text: "....." },
      {
        text: "IDEAS",
        duration: 1.2,
        delay: 0.2,
        ease: "power2.out",
        onComplete: () => setIdeasVisible(true)
      },
      "-=0.6",
    );

    // "TO"
    timeline.from(
      toRef.current,
      {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
      },
      "-=0.5",
    );

    // Scramble animation for "IMPACT" (same as IDEAS)
    timeline.fromTo(
      impactSpan.current,
      { text: "......" },
      {
        text: "IMPACT",
        duration: 1.2,
        ease: "power2.out",
        onComplete: () => setImpactVisible(true)
      },
      "-=0.6",
    );
  }, []);

  // Button hover animations
  useEffect(() => {
    if (!btnBlackRef.current || !underlineRef.current) return;

    if (buttonHover) {
      // Animate the yellow underline to appear on hover
      gsap.to(underlineRef.current, {
        width: "100%",
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      // Animate the yellow underline to disappear on hover out
      gsap.to(underlineRef.current, {
        width: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [buttonHover]);

  // Utility to collect refs for span arrays
  const attachRefs = (arr, refArray) => (el) => {
    if (el && !refArray.current.includes(el)) refArray.current.push(el);
  };

  return (
    <div className="flex flex-col w-full py-6 sm:py-8 md:py-10 lg:py-16 px-1 sm:px-2 md:px-4 lg:px-8">
      {/* Main slogan */}
      <div className="text-left mb-6 sm:mb-7 md:mb-8 lg:mb-10 font-bold tracking-tight leading-none">
        <div className="text-[2.5rem] xss:text-[3rem] xs:text-[3.5rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem] xl:text-[7rem] 2xl:text-[8rem]">
          {splitText("From", "").map((el, i) =>
            React.cloneElement(el, {
              ref: attachRefs(el, fromRef),
            }),
          )}
        </div>

        {/* "IDEAS" with scramble effect and hover */}
        <div className="flex items-center mt-1 xs:mt-1.5 sm:mt-2">
          <span
            ref={ideasSpan}
            className={`text-[3.5rem] xss:text-[4.5rem] xs:text-[5.5rem] sm:text-[6.5rem] md:text-[7rem] lg:text-[9rem] xl:text-[10rem] 2xl:text-[12rem] ml-20 text-[var(--primary-color)] ${ideasVisible ? "hidden" : ""}`}
          >
            IDEAS
          </span>
          {ideasVisible && (
            <HoverableText
              text="IDEAS"
              className="text-[3.5rem] xss:text-[4.5rem] xs:text-[5.5rem] sm:text-[6.5rem] md:text-[7rem] lg:text-[9rem] xl:text-[10rem] 2xl:text-[12rem] ml-4 xs:ml-6 sm:ml-8 md:ml-12 lg:ml-16 font-bold"
            />
          )}
        </div>

        <div className="text-[1.8rem] xss:text-[2.2rem] xs:text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem] xl:text-[5rem] 2xl:text-[6rem] mt-1 xs:mt-1.5 sm:mt-2 md:mt-3">
          {splitText("TO").map((el, i) =>
            React.cloneElement(el, {
              ref: attachRefs(el, toRef),
            }),
          )}
        </div>

        {/* "IMPACT" with scramble effect and hover */}
        <div className="flex items-start">
          <span
            ref={impactSpan}
            className={`text-[4rem] xss:text-[6rem] xs:text-[7rem] sm:text-[10rem] md:text-[10rem] lg:text-[10rem] xl:text-[12rem] 2xl:text-[14rem] text-[var(--secondary-color)] mt-1 xs:mt-1.5 sm:mt-2 ${impactVisible ? "hidden" : ""}`}
          >
            IMPACT
          </span>
          {impactVisible && (
            <HoverableText
              text="IMPACT"
              reverse={true}
              className="text-[4rem] xss:text-[6rem] xs:text-[7rem] sm:text-[10rem] md:text-[10rem] lg:text-[10rem] xl:text-[12rem] 2xl:text-[14rem] mt-1 xs:mt-1.5 sm:mt-2 font-bold text-[var(--secondary-color)]"
            />
          )}
        </div>
      </div>

      {/* Tagline and button */}
      <div className="ml-auto text-right max-w-full xs:max-w-[90%] sm:max-w-[85%] md:max-w-[80%] lg:max-w-[75%] xl:max-w-[70%]">
        <p className="text-xs xss:text-sm xs:text-base sm:text-[1.05rem] md:text-lg mb-3 xs:mb-4 sm:mb-5 md:mb-6">
          We are a bunch of{" "}
          <span className="font-bold text-[var(--primary-color)] text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl">
            Psychology
          </span>{" "}
          geeks who also happen to run a{" "}
          <span className="font-bold text-[var(--primary-color)] text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl">
            Marketing Company
          </span>
        </p>

        {/* Button with theme-aware styling */}

<Button3/>

      </div>
    </div>
  );
};

export default SharedHeading;
