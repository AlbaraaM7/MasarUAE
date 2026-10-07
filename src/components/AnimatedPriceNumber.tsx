"use client";

import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "motion/react";

interface AnimatedPriceNumberProps {
  value: number | string;
  className?: string;
}

export function AnimatedPriceNumber({ value, className = "" }: AnimatedPriceNumberProps) {
  const numValue = typeof value === "number" ? value : parseFloat(String(value)) || 0;
  const prevValueRef = useRef(numValue);
  const directionRef = useRef<"up" | "down">("down");

  useEffect(() => {
    if (numValue > prevValueRef.current) {
      directionRef.current = "up";
    } else if (numValue < prevValueRef.current) {
      directionRef.current = "down";
    }
    prevValueRef.current = numValue;
  }, [numValue]);

  // If price increased (e.g. 39 -> 49): roll up
  // If price decreased (e.g. 49 -> 39): roll down
  const isUp = directionRef.current === "up";

  const variants: Variants = {
    initial: {
      y: isUp ? 28 : -28,
      opacity: 0,
      filter: "blur(2px)",
    },
    animate: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
      },
    },
    exit: {
      y: isUp ? -28 : 28,
      opacity: 0,
      filter: "blur(2px)",
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  return (
    <span className={`relative inline-flex overflow-hidden h-[1.12em] items-baseline align-baseline ${className}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={String(value)}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="inline-block"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default AnimatedPriceNumber;
