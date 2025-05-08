'use client';
import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
}

const TextReveal = ({
  text,
  className = '',
  element = 'p',
}: TextRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  // Create array of words
  const words = text.split(' ');

  const Element = motion[element];

  return (
    <Element ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                delay: i * 0.1,
                ease: 'easeOut',
              },
            },
          }}
          className="mr-2 mb-2"
        >
          {word}
        </motion.span>
      ))}
    </Element>
  );
};

export default TextReveal;

