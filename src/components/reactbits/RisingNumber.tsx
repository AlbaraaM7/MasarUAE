"use client";

import React, { useEffect, useRef, useState } from "react";

export interface RisingNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number; // in milliseconds
  delay?: number; // in milliseconds
  className?: string;
  formatComma?: boolean;
}

export default function RisingNumber({
  value,
  prefix = "",
  suffix = "",
  duration = 1800,
  delay = 100,
  className = "",
  formatComma = false,
}: RisingNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const timeoutId = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease-out expo for natural decelerating momentum
        const easeOut =
          progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = Math.floor(easeOut * value);
        setDisplayValue(current);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        } else {
          setDisplayValue(value);
        }
      };

      animationFrameId = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, value, duration, delay]);

  const formatted = formatComma
    ? displayValue.toLocaleString()
    : displayValue.toString();

  return (
    <span
      ref={elementRef}
      className={`inline-block transition-all duration-700 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6 scale-95"
      } ${className}`.trim()}
    >
      <span className="inline-flex items-baseline">
        {prefix && <span className="mr-0.5">{prefix}</span>}
        <span className="tabular-nums font-black">{formatted}</span>
        {suffix && <span className="ml-0.5">{suffix}</span>}
      </span>
    </span>
  );
}
