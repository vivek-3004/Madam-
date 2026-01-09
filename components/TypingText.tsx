import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypingTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

// Cast motion components to any to avoid TypeScript errors with missing props
const MotionDiv = motion.div as any;
const MotionSpan = motion.span as any;

const TypingText: React.FC<TypingTextProps> = ({ text, className = "", delay = 0, speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    // Reset when text changes
    setDisplayedText(""); 
    
    let currentIndex = 0;
    // Fix: Use ReturnType<typeof setInterval> instead of NodeJS.Timeout to work in environments without @types/node
    let intervalId: ReturnType<typeof setInterval>;

    const startTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        currentIndex++;
        setDisplayedText(text.slice(0, currentIndex));
        
        if (currentIndex >= text.length) {
          clearInterval(intervalId);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, delay, speed]);

  return (
    <MotionDiv
      initial={{ opacity: 1 }}
      className={className}
    >
      {displayedText}
      <MotionSpan
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-[2px] h-[1em] bg-current align-middle ml-1"
      />
    </MotionDiv>
  );
};

export default TypingText;