'use client';

import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';

interface MorphingShapeProps {
  color?: string;
  secondaryColor?: string;
  size?: number;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

const MorphingShape: React.FC<MorphingShapeProps> = ({
  color = '#4E36FF',
  secondaryColor = '#900BFF',
  size = 300,
  speed = 5,
  className = '',
  style = {},
}) => {
  // Create a randomized blob path
  const generateBlobPath = (numPoints = 8, radius = size / 2, irregularity = 0.5) => {
    const points = [];
    const angleStep = (Math.PI * 2) / numPoints;
    
    for (let i = 0; i < numPoints; i++) {
      const angle = i * angleStep;
      // Add randomness to radius
      const currentRadius = radius * (1 + (Math.random() * 2 - 1) * irregularity);
      const x = 50 + Math.cos(angle) * currentRadius / (size / 100);
      const y = 50 + Math.sin(angle) * currentRadius / (size / 100);
      points.push({ x, y });
    }
    
    // Create SVG path string
    let path = `M${points[0].x},${points[0].y}`;
    
    for (let i = 0; i < points.length; i++) {
      const p1 = points[i];
      const p2 = points[(i + 1) % points.length];
      
      // Control points for curve
      const cx1 = p1.x + (p2.x - p1.x) / 3;
      const cy1 = p1.y + (p2.y - p1.y) / 3;
      const cx2 = p1.x + (p2.x - p1.x) * 2 / 3;
      const cy2 = p1.y + (p2.y - p1.y) * 2 / 3;
      
      path += ` C${cx1},${cy1} ${cx2},${cy2} ${p2.x},${p2.y}`;
    }
    
    path += 'Z';
    return path;
  };

  // Generate random blob shapes
  const blob1 = generateBlobPath(8, size / 2, 0.5);
  const blob2 = generateBlobPath(8, size / 2, 0.5);
  const blob3 = generateBlobPath(8, size / 2, 0.5);
  const blob4 = generateBlobPath(8, size / 2, 0.5);

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
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        overflow={'visible'}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <motion.stop
              offset="0%"
              animate={{
                stopColor: [color, secondaryColor, color],
                offset: ["0%", "10%", "0%"]
              }}
              transition={{
                duration: speed * 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.stop
              offset="100%"
              animate={{
                stopColor: [secondaryColor, color, secondaryColor],
                offset: ["100%", "90%", "100%"]
              }}
              transition={{
                duration: speed * 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </linearGradient>
        </defs>

        <motion.path
          d={blob1}
          fill="url(#gradient)"
          animate={{
            d: [blob1, blob2, blob3, blob4, blob1],
            opacity: [0.7, 0.5, 0.7, 0.5, 0.7],
            scale: [1, 1.05, 1, 0.95, 1],
            rotate: [0, 10, 0, -10, 0],
          }}
          transition={{
            duration: speed,
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 0.75, 1],
            repeat: Infinity,
            repeatType: "loop",
          }}
          style={{ 
            filter: 'blur(10px)',
            transformOrigin: 'center center'
          }}
        />
      </svg>
    </Box>
  );
};

export default MorphingShape;

