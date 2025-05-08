
// src/components/animations/LoadingSpinner.tsx
'use client';
import { Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: number;
  thickness?: number;
  color?: string;
  secondaryColor?: string;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 40,
  thickness = 4,
  color,
  secondaryColor,
  duration = 1.5,
  className = '',
  style = {},
}) => {
  const theme = useTheme();
  const primaryColor = color || theme.palette.primary.main;
  const secColor = secondaryColor || theme.palette.secondary.main;

  return (
    <Box
      className={className}
      sx={{
        position: 'relative',
        width: size,
        height: size,
        ...style,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 50 50"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <motion.circle
          cx="25"
          cy="25"
          r="20"
          stroke={secColor}
          strokeWidth={thickness}
          fill="none"
          strokeDasharray="31.4 125.6" // 31.4 is 25% of the circumference
          animate={{
            rotate: [0, 360],
            strokeDashoffset: [0, -157],
          }}
          transition={{
            duration,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
          style={{ transformOrigin: 'center' }}
        />
        <motion.circle
          cx="25"
          cy="25"
          r="20"
          stroke={primaryColor}
          strokeWidth={thickness}
          fill="none"
          strokeDasharray="15.7 141.3" // 15.7 is 10% of the circumference
          animate={{
            rotate: [180, 540],
            strokeDashoffset: [20, -137],
          }}
          transition={{
            duration: duration * 1.5,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
          style={{ transformOrigin: 'center' }}
        />
      </svg>
    </Box>
  );
};

export default LoadingSpinner;
