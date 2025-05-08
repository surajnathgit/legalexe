// src/components/animations/TextGlitch.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/system';

interface TextGlitchProps extends TypographyProps {
  text: string;
  glitchInterval?: number;
  glitchDuration?: number;
  glitchIntensity?: number;
  active?: boolean;
}

const GlitchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
  overflow: 'hidden',
}));

const GlitchText = styled(Typography)(({ theme }) => ({
  display: 'inline-block',
  position: 'relative',
  zIndex: 1,
}));

const GlitchLayer = styled('span')<{ offset: number; color: string }>(({ offset, color }) => ({
  content: 'attr(data-text)',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  transform: `translate(${offset}px, ${offset}px)`,
  color,
  overflow: 'hidden',
  mixBlendMode: 'exclusion',
  zIndex: 0,
}));

const TextGlitch: React.FC<TextGlitchProps> = ({
  text,
  glitchInterval = 3000,
  glitchDuration = 200,
  glitchIntensity = 5,
  active = true,
  ...typographyProps
}) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchText, setGlitchText] = useState(text);

  // Generate random glitch text
  const generateGlitchText = (text: string, intensity: number) => {
    return text
      .split('')
      .map((char) => {
        // With a certain probability, replace the character with a glitch character
        if (Math.random() < intensity / 10) {
          const glitchChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
          return glitchChars.charAt(Math.floor(Math.random() * glitchChars.length));
        }
        return char;
      })
      .join('');
  };

  useEffect(() => {
    if (!active) return;

    let glitchIntervalId: NodeJS.Timeout;
    let glitchTimeoutId: NodeJS.Timeout;

    const startGlitching = () => {
      setIsGlitching(true);
      
      // Generate new glitch text multiple times during the glitch duration
      const glitchFrames = 3; // Number of text changes during a glitch
      const frameInterval = glitchDuration / glitchFrames;
      
      let frameCount = 0;
      const frameIntervalId = setInterval(() => {
        setGlitchText(generateGlitchText(text, glitchIntensity));
        frameCount++;
        
        if (frameCount >= glitchFrames) {
          clearInterval(frameIntervalId);
          setGlitchText(text); // Reset to original text
        }
      }, frameInterval);
      
      // End glitching after duration
      glitchTimeoutId = setTimeout(() => {
        setIsGlitching(false);
        clearInterval(frameIntervalId);
        setGlitchText(text);
      }, glitchDuration);
    };

    // Start glitching at random intervals
    glitchIntervalId = setInterval(() => {
      startGlitching();
    }, glitchInterval + Math.random() * 1000);

    return () => {
      clearInterval(glitchIntervalId);
      clearTimeout(glitchTimeoutId);
    };
  }, [active, text, glitchDuration, glitchInterval, glitchIntensity]);

  return (
    <GlitchContainer>
      <GlitchText {...typographyProps}>
        {isGlitching ? glitchText : text}
      </GlitchText>
      
      {isGlitching && (
        <>
          <GlitchLayer
            data-text={glitchText}
            offset={-3}
            color="rgba(255,0,0,0.7)"
          >
            {glitchText}
          </GlitchLayer>
          <GlitchLayer
            data-text={glitchText}
            offset={3}
            color="rgba(0,255,255,0.7)"
          >
            {glitchText}
          </GlitchLayer>
        </>
      )}
    </GlitchContainer>
  );
};

export default TextGlitch;