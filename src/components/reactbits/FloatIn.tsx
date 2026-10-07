"use client";

import React, { useEffect, useRef, useState } from "react";

export interface FloatInProps {
  children: React.ReactNode;
  delay?: number; // in milliseconds
  distance?: number; // float distance in px
  duration?: number; // in milliseconds
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  threshold?: number;
}

export default function FloatIn({
  children,
  delay = 0,
  distance = 32,
  duration = 750,
  direction = "up",
  className = "",
  threshold = 0.12,
}: FloatInProps) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const getTransform = () => {
    if (inView) return "translate3d(0, 0, 0)";
    switch (direction) {
      case "up":
        return `translate3d(0, ${distance}px, 0)`;
      case "down":
        return `translate3d(0, -${distance}px, 0)`;
      case "left":
        return `translate3d(${distance}px, 0, 0)`;
      case "right":
        return `translate3d(-${distance}px, 0, 0)`;
      default:
        return `translate3d(0, ${distance}px, 0)`;
    }
  };

  return (
    <div
      ref={ref}
      className={`will-change-[transform,opacity] ${className}`.trim()}
      style={{
        opacity: inView ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
