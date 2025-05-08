// src/components/animations/AnimatedCounter.tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import { Typography, TypographyProps } from '@mui/material';
import { useInView } from 'react-intersection-observer';

interface AnimatedCounterProps extends TypographyProps {
  end: number;
  start?: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  easing?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
  onComplete?: () => void;
}

// Easing functions
const easings = {
  linear: (t: number) => t,
  easeIn: (t: number) => t * t,
  easeOut: (t: number) => t * (2 - t),
  easeInOut: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
};

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  start = 0,
  duration = 2,
  delay = 0,
  prefix = '',
  suffix = '',
  decimals = 0,
  easing = 'easeOut',
  onComplete,
  ...typographyProps
}) => {
  // Start with the initial value
  const [displayValue, setDisplayValue] = useState(start);
  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const animationCompleteRef = useRef(false);
  
  // Use intersection observer to trigger animation when the element is in view
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Format the number with the correct number of decimal places
  const formatNumber = (num: number) => {
    return num.toFixed(decimals);
  };

  // Set up and clean up the animation
  useEffect(() => {
    // Don't run on the server side
    if (typeof window === 'undefined') return;
    
    // Skip if already completed or not in view
    if (animationCompleteRef.current || !inView) return;
    
    // Function to update the counter on each animation frame
    const animate = (timestamp: number) => {
      // Initialize the start time on the first frame
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
        requestRef.current = requestAnimationFrame(animate);
        return;
      }
      
      // Calculate how much time has passed since the start
      const elapsed = timestamp - startTimeRef.current;
      
      // Apply the delay
      if (elapsed < delay * 1000) {
        requestRef.current = requestAnimationFrame(animate);
        return;
      }
      
      // Calculate progress (0 to 1)
      const timeProgress = Math.min((elapsed - delay * 1000) / (duration * 1000), 1);
      
      // If animation is complete
      if (timeProgress >= 1) {
        setDisplayValue(end);
        animationCompleteRef.current = true;
        if (onComplete) onComplete();
        return;
      }
      
      // Apply easing function
      const easingFunction = easings[easing];
      const easedProgress = easingFunction(timeProgress);
      
      // Calculate the current value
      const currentValue = start + easedProgress * (end - start);
      setDisplayValue(currentValue);
      
      // Request the next frame
      requestRef.current = requestAnimationFrame(animate);
    };
    
    // Start the animation
    requestRef.current = requestAnimationFrame(animate);
    
    // Clean up
    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [inView, start, end, duration, delay, easing, onComplete]);

  // Reset animation if props change significantly
  useEffect(() => {
    animationCompleteRef.current = false;
    startTimeRef.current = null;
  }, [end, start, duration]);

  // Handle case where inView never triggers (e.g., in testing environments)
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (!animationCompleteRef.current) {
        setDisplayValue(end);
      }
    }, (duration + delay + 0.5) * 1000);
    
    return () => clearTimeout(fallbackTimer);
  }, [end, duration, delay]);

  return (
    <Typography ref={ref} {...typographyProps}>
      {prefix}
      {formatNumber(displayValue)}
      {suffix}
    </Typography>
  );
};

export default AnimatedCounter;