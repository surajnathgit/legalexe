// src/components/animations/GradientBackground.tsx
'use client';
import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

interface GradientBackgroundProps {
  colors: string[];
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({
  colors,
  duration = 15,
  className = '',
  style = {},
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to match parent container
    const resizeCanvas = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Prepare gradient colors
    const gradientColors = colors.map((color, index) => ({
      color,
      stop: index / (colors.length - 1),
    }));

    // Animate the gradient
    let animationFrame: number;
    let start: number | null = null;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = ((timestamp - start) % (duration * 1000)) / (duration * 1000);

      // Draw gradient
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );

      gradientColors.forEach((gc, index) => {
        // Calculate position based on time elapsed
        const position = (gc.stop + elapsed) % 1;
        gradient.addColorStop(position, gc.color);
      });

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrame);
    };
  }, [colors, duration]);

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
      className={className}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
      />
      {children}
    </Box>
  );
};

export default GradientBackground;

