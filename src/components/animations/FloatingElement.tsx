// src/components/animations/FloatingElement.tsx
'use client';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FloatingElementProps {
  children: ReactNode;
  duration?: number;
  yOffset?: number;
  xOffset?: number;
  rotate?: number;
  delay?: number;
  className?: string;
}

const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  duration = 6,
  yOffset = 20,
  xOffset = 0,
  rotate = 0,
  delay = 0,
  className = '',
}) => {
  return (
    <motion.div
      className={className}
      initial={{ y: 0, x: 0, rotate: 0 }}
      animate={{
        y: [0, -yOffset, 0],
        x: [0, xOffset, 0],
        rotate: [0, rotate, 0],
      }}
      transition={{
        duration,
        ease: 'easeInOut',
        times: [0, 0.5, 1],
        repeat: Infinity,
        repeatType: 'loop',
        delay,
      }}
      style={{
        display: 'inline-block',
        background: 'transparent',
        boxShadow: 'none',
        border: 'none',
        padding: 0,
        margin: 0,
        lineHeight: 0
      }}
    >
      {children}
    </motion.div>
  );
};

export default FloatingElement;