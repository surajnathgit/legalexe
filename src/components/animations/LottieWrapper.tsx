// components/animations/LottieWrapper.tsx
'use client';
import React from 'react';
import Lottie from 'lottie-react';
import { Box } from '@mui/material';

interface LottieWrapperProps {
  animationPath: string;
  loop?: boolean;
  autoplay?: boolean;
  style?: React.CSSProperties;
}

const LottieWrapper: React.FC<LottieWrapperProps> = ({
  animationPath,
  loop = true,
  autoplay = true,
  style = {},
}) => {
  // Use dynamic import to load the animation data
  const [animationData, setAnimationData] = React.useState<any>(null);

  React.useEffect(() => {
    // Load animation data on the client side
    import("@/public/animations/ai-animation.json")
      .then((animModule) => {
        setAnimationData(animModule.default);
      })
      .catch((err) => {
        console.error("Failed to load animation:", err);
        // Provide a fallback or error state
      });
  }, [animationPath]);

  if (!animationData) {
    // Show loading state or placeholder
    return (
      <Box 
        sx={{ 
          width: '100%', 
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'rgba(255,255,255,0.05)',
          borderRadius: 2
        }}
      >
        <div className="animate-pulse">Loading animation...</div>
      </Box>
    );
  }
console.log(animationData);

  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      style={{ width: '100%', height: '100%', ...style }}
    />
  );
};

export default LottieWrapper;