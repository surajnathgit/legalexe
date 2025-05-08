// src/components/animations/SectionTransition.tsx
'use client';
import { useEffect, useRef } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface SectionTransitionProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  staggerChildren?: boolean;
  staggerDelay?: number;
  threshold?: number;
  once?: boolean;
}

interface SectionItemProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

// Define the component type that includes the Item property
interface SectionTransitionComponent 
  extends React.FC<SectionTransitionProps> {
  Item: React.FC<SectionItemProps>;
}

// Child item for staggered animations
const SectionItem: React.FC<SectionItemProps> = ({
  children,
  className = '',
  style = {},
  delay = 0,
  direction = 'up',
}) => {
  const directionOffsets = {
    up: { y: 50 },
    down: { y: -50 },
    left: { x: 50 },
    right: { x: -50 },
    none: {},
  };

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...directionOffsets[direction],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay,
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

// Create the main component
const SectionTransition: React.FC<SectionTransitionProps> = ({
  children,
  direction = 'up',
  duration = 0.8,
  delay = 0,
  className = '',
  style = {},
  staggerChildren = false,
  staggerDelay = 0.1,
  threshold = 0.2,
  once = true,
}) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: once,
  });

  const directionOffsets = {
    up: { y: 100 },
    down: { y: -100 },
    left: { x: 100 },
    right: { x: -100 },
    none: {},
  };

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...directionOffsets[direction],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1], // cubic-bezier
        delay,
        staggerChildren: staggerChildren ? staggerDelay : 0,
      },
    },
  };

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [controls, inView, once]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

// Attach Item component and use type assertion to tell TypeScript this is valid
(SectionTransition as SectionTransitionComponent).Item = SectionItem;

// Export with the correct type
export default SectionTransition as SectionTransitionComponent;