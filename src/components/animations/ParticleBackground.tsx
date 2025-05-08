// src/components/animations/ParticleBackground.tsx
'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  opacity: number;
}

interface ParticleBackgroundProps {
  count?: number;
  colors?: string[];
  minSize?: number;
  maxSize?: number;
  speed?: number;
  connected?: boolean;
  style?: React.CSSProperties;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  count = 50,
  colors,
  minSize = 2,
  maxSize = 6,
  speed = 0.5,
  connected = true,
  style = {},
}) => {
  const theme = useTheme();
  const [particles, setParticles] = useState<Particle[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  
  // Use theme colors if not provided
  const particleColors = colors || [
    theme.palette.primary.main,
    theme.palette.primary.light,
    theme.palette.secondary.main,
    theme.palette.secondary.light,
  ];

  // Initialize particles
  const initParticles = useCallback(
    (width: number, height: number) => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        newParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * (maxSize - minSize) + minSize,
          color: particleColors[Math.floor(Math.random() * particleColors.length)],
          speedX: (Math.random() - 0.5) * speed,
          speedY: (Math.random() - 0.5) * speed,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
      setParticles(newParticles);
    },
    [count, maxSize, minSize, particleColors, speed]
  );

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    };

    // Set initial dimensions
    handleResize();

    // Add resize listener
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize particles when dimensions change
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      initParticles(dimensions.width, dimensions.height);
    }
  }, [dimensions, initParticles]);

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || particles.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      const updatedParticles = particles.map((p) => {
        // Move particles
        let x = p.x + p.speedX;
        let y = p.y + p.speedY;
        
        // Bounce off edges
        if (x < 0 || x > canvas.width) p.speedX *= -1;
        if (y < 0 || y > canvas.height) p.speedY *= -1;
        
        // Keep within bounds
        x = Math.max(0, Math.min(canvas.width, x));
        y = Math.max(0, Math.min(canvas.height, y));
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
        
        return {
          ...p,
          x,
          y,
        };
      });
      
      // Draw connections between particles
      if (connected) {
        ctx.lineWidth = 0.5;
        
        for (let i = 0; i < updatedParticles.length; i++) {
          for (let j = i + 1; j < updatedParticles.length; j++) {
            const p1 = updatedParticles[i];
            const p2 = updatedParticles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Only connect particles within a certain distance
            const maxDistance = 150;
            if (distance < maxDistance) {
              // Opacity based on distance
              const opacity = 1 - distance / maxDistance;
              ctx.strokeStyle = `rgba(${parseInt(p1.color.slice(1, 3), 16)}, ${parseInt(p1.color.slice(3, 5), 16)}, ${parseInt(p1.color.slice(5, 7), 16)}, ${opacity * 0.2})`;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }
      
      setParticles(updatedParticles);
      animationFrameId = window.requestAnimationFrame(render);
    };
    
    render();
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [ connected]);

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        style={{ display: 'block' }}
      />
    </Box>
  );
};

export default ParticleBackground;

