import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Stagger index — multiplies the delay so grids cascade in. */
  index?: number;
  className?: string;
  /** Pass-through for data-* attributes, etc. */
  [key: string]: unknown;
}

/**
 * Subtle on-scroll fade-up. Triggers once when ~20% of the element is visible.
 * Framer Motion automatically respects prefers-reduced-motion at the system level
 * when the user has reduced motion enabled via MotionConfig defaults; we also keep
 * the movement small so it degrades gracefully.
 */
export default function Reveal({ children, index = 0, className, ...rest }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
