// src/components/animations/ScrollProgress.tsx
'use client';
import { useEffect, useState, useRef } from 'react';
import { Box, useTheme } from '@mui/material';
import { motion, useScroll, useSpring } from 'framer-motion';

interface ScrollProgressProps {
  position?: 'top' | 'bottom';
  height?: number;
  color?: string;
  showPercentage?: boolean;
  showOnlyWhenScrolling?: boolean;
  hideDelay?: number;
}

const ScrollProgress: React.FC<ScrollProgressProps> = ({
  position = 'top',
  height = 4,
  color,
  showPercentage = false,
  showOnlyWhenScrolling = true,
  hideDelay = 1000,
}) => {
  const theme = useTheme();
  const barColor = color || theme.palette.primary.main;
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  
  const [isScrolling, setIsScrolling] = useState(false);
  const [isVisible, setIsVisible] = useState(!showOnlyWhenScrolling);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const unsubscribeY = scrollYProgress.onChange((latest) => {
      setScrollPercentage(Math.round(latest * 100));
      setIsScrolling(true);
      setIsVisible(true);
      
      if (showOnlyWhenScrolling) {
        // Clear previous timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        
        // Set new timeout
        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
          setTimeout(() => {
            if (!isScrolling) setIsVisible(false);
          }, 300); // Fade out delay
        }, hideDelay);
      }
    });
    
    return () => {
      unsubscribeY();
      // Clear timeout on cleanup
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [scrollYProgress, hideDelay, showOnlyWhenScrolling, isScrolling]);

  return (
    <>
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          [position]: 0,
          height,
          transformOrigin: 'left',
          scaleX,
          zIndex: 9999,
          backgroundColor: barColor,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s',
        }}
      />
      
      {showPercentage && (
        <Box
          sx={{
            position: 'fixed',
            [position]: height + 10,
            right: 20,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            borderRadius: 2,
            padding: '4px 8px',
            fontSize: 14,
            zIndex: 9999,
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
        >
          {scrollPercentage}%
        </Box>
      )}
    </>
  );
};

export default ScrollProgress;