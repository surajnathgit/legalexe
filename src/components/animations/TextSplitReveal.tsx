
// src/components/animations/TextSplitReveal.tsx
'use client';
import React, { useRef, useEffect } from 'react';
import { Typography, TypographyProps } from '@mui/material';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface TextSplitRevealProps extends Omit<TypographyProps, 'children'> {
  text: string;
  splitBy?: 'chars' | 'words' | 'lines';
  staggerChildren?: number;
  duration?: number;
  delay?: number;
  threshold?: number;
  once?: boolean;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  effect?: 'fade' | 'slide' | 'expand' | 'rotate' | 'wave';
}

const TextSplitReveal: React.FC<TextSplitRevealProps> = ({
  text,
  splitBy = 'words',
  staggerChildren = 0.1,
  duration = 0.5,
  delay = 0,
  threshold = 0.1,
  once = true,
  direction = 'up',
  effect = 'fade',
  ...typographyProps
}) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: once,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [controls, inView, once]);

  // Split text by the specified method
  const splitText = (text: string, method: 'chars' | 'words' | 'lines') => {
    switch (method) {
      case 'chars':
        return text.split('');
      case 'lines':
        return text.split('\n');
      case 'words':
      default:
        return text.split(/\s+/);
    }
  };

  const items = splitText(text, splitBy);

  // Variant animations based on effect
  const getVariants = (): Variants => {
    const directionOffsets = {
      up: { y: 20 },
      down: { y: -20 },
      left: { x: 20 },
      right: { x: -20 },
      none: {},
    };
    
    const effectStyles = {
      fade: {
        hidden: { opacity: 0, ...directionOffsets[direction] },
        visible: (i: number) => ({
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration,
            delay: delay + i * staggerChildren,
            ease: [0.5, 0.01, 0.01, 0.99],
          },
        }),
      },
      slide: {
        hidden: { opacity: 0, ...directionOffsets[direction], scale: 0.9 },
        visible: (i: number) => ({
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          transition: {
            duration,
            delay: delay + i * staggerChildren,
            ease: [0.25, 0.1, 0.25, 1],
          },
        }),
      },
      expand: {
        hidden: { opacity: 0, scale: 0.5 },
        visible: (i: number) => ({
          opacity: 1,
          scale: 1,
          transition: {
            duration,
            delay: delay + i * staggerChildren,
            ease: [0.25, 0.1, 0.25, 1],
          },
        }),
      },
      rotate: {
        hidden: { opacity: 0, rotateY: 90 },
        visible: (i: number) => ({
          opacity: 1,
          rotateY: 0,
          transition: {
            duration,
            delay: delay + i * staggerChildren,
            ease: [0.25, 0.1, 0.25, 1],
          },
        }),
      },
      wave: {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
          opacity: 1,
          y: [20, -10, 5, 0],
          transition: {
            duration: duration * 1.5,
            delay: delay + i * staggerChildren,
            times: [0, 0.6, 0.8, 1],
            ease: [0.25, 0.1, 0.25, 1],
          },
        }),
      },
    };

    return effectStyles[effect] || effectStyles.fade;
  };

  const variants = getVariants();

  return (
    <Typography ref={ref} component="div" {...typographyProps}>
      <motion.div initial="hidden" animate={controls}>
        {items.map((item, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={variants}
            style={{ 
              display: splitBy === 'chars' ? 'inline-block' : undefined,
              marginRight: splitBy === 'chars' ? '0.05em' : undefined,
              whiteSpace: splitBy === 'chars' ? 'pre' : undefined,
            }}
          >
            {item}
            {splitBy === 'words' && i < items.length - 1 ? ' ' : ''}
          </motion.span>
        ))}
      </motion.div>
    </Typography>
  );
};

export default TextSplitReveal;