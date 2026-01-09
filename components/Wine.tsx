import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, HeartHandshake } from 'lucide-react';
import { BaseProps } from '../types';
import TypingText from './TypingText';

interface WineProps extends BaseProps {
  onQuestion: () => void;
}

// Cast motion components to any to avoid TypeScript errors with missing props
const MotionCircle = motion.circle as any;
const MotionRect = motion.rect as any;
const MotionG = motion.g as any;
const MotionEllipse = motion.ellipse as any;
const MotionButton = motion.button as any;
const MotionDiv = motion.div as any;
const MotionPath = motion.path as any;

const Bubble = () => {
    // Random position within the central part of the glass
    const randomX = Math.random() * 40 + 30; // tighter grouping
    const size = Math.random() * 3 + 1;
    const duration = Math.random() * 1.5 + 1;

    return (
        <MotionCircle
            cx={randomX}
            cy="120"
            r={size / 2}
            fill="rgba(255,255,255,0.4)"
            initial={{ cy: 110, opacity: 0 }}
            animate={{ cy: 30, opacity: [0, 1, 0] }}
            transition={{ duration: duration, ease: "linear" }}
        />
    );
};

const Wine: React.FC<WineProps> = ({ onNext, onQuestion }) => {
  const [filled, setFilled] = useState(false);
  const [pouring, setPouring] = useState(false);
  const [showStream, setShowStream] = useState(false);
  const [bubbles, setBubbles] = useState<number[]>([]);

  const handlePour = () => {
    setPouring(true);
    
    // Sequence:
    // 1. Bottle rotates in (takes ~0.8s)
    // 2. Stream starts
    setTimeout(() => setShowStream(true), 600);
    
    // 3. Liquid fills
    setTimeout(() => setFilled(true), 800);

    // 4. Stop stream (after fill duration ~2.5s)
    setTimeout(() => setShowStream(false), 3000);

    // 5. Remove bottle
    setTimeout(() => setPouring(false), 3500);
  };

  useEffect(() => {
    if (filled) {
        // Start bubbles after a slight delay
        const bubbleTimer = setTimeout(() => {
             const interval = setInterval(() => {
                setBubbles(prev => [...prev, Date.now()]);
                if (bubbles.length > 30) {
                    setBubbles(prev => prev.slice(1));
                }
            }, 200);
            return () => clearInterval(interval);
        }, 1000);
        return () => clearTimeout(bubbleTimer);
    }
  }, [filled]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-rose-950 text-rose-100 p-4 md:p-8 relative overflow-y-auto min-h-[100dvh]">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-800/20 rounded-full blur-[100px] pointer-events-none" />

      <h2 className="text-3xl md:text-4xl font-handwriting mb-4 md:mb-8 z-10 text-rose-200 min-h-[50px] text-center mt-8 md:mt-0">
        <TypingText text="Birthday hai thoda tho piyenge😁😂" delay={500} />
      </h2>
      
      {/* Container to hold animation - flexible height */}
      <div className="relative w-72 h-80 md:w-96 md:h-96 mb-8 z-10 flex justify-center items-end shrink-0">
        {/* The Glass SVG */}
        <div className="w-full h-full relative flex items-end justify-center">
            <svg viewBox="0 -80 100 280" className="w-full h-full overflow-visible">
                <defs>
                    <clipPath id="glass-inner">
                        {/* The shape of the liquid container inside the glass */}
                        <path d="M14,10 Q14,116 50,116 Q86,116 86,10 Z" />
                    </clipPath>
                    <linearGradient id="wineGradient" x1="0" x2="1" y1="0" y2="0">
                        <stop offset="0%" stopColor="#5d0a1e" />
                        <stop offset="40%" stopColor="#9e1b32" />
                        <stop offset="60%" stopColor="#9e1b32" />
                        <stop offset="100%" stopColor="#5d0a1e" />
                    </linearGradient>
                    <linearGradient id="bottleGradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#1a202c" />
                        <stop offset="30%" stopColor="#2d3748" />
                        <stop offset="45%" stopColor="#4a5568" /> 
                        <stop offset="60%" stopColor="#2d3748" />
                        <stop offset="100%" stopColor="#1a202c" />
                    </linearGradient>
                </defs>

                {/* Back of the glass (transparency) */}
                <path 
                    d="M12,10 Q12,118 50,118 Q88,118 88,10" 
                    fill="rgba(255,255,255,0.05)" 
                />

                {/* Liquid Group */}
                <g clipPath="url(#glass-inner)">
                    <MotionRect 
                        x="0" 
                        y="0" 
                        width="100" 
                        height="200" 
                        fill="url(#wineGradient)"
                        initial={{ y: 200 }}
                        animate={{ y: filled ? 30 : 200 }} 
                        transition={{ duration: 2.5, ease: "easeInOut" }}
                    />
                    
                    {filled && bubbles.map(b => <Bubble key={b} />)}
                </g>

                {/* Pouring Stream - Perfectly aligned */}
                <MotionRect
                    x="48"
                    y="-55"
                    width="4"
                    fill="#9e1b32"
                    initial={{ height: 0 }}
                    animate={{ height: showStream ? 175 : 0 }}
                    transition={{ duration: 0.3 }}
                />

                {/* The Surface Wave (Meniscus) */}
                <MotionG
                     initial={{ y: 200, opacity: 0 }}
                     animate={{ y: filled ? 30 : 200, opacity: filled ? 1 : 0 }}
                     transition={{ duration: 2.5, ease: "easeInOut" }}
                >
                     <MotionEllipse 
                         cx="50" 
                         cy="0" 
                         rx="32" 
                         ry="4" 
                         fill="#b03045"
                         animate={{ rx: [32, 33, 32], ry: [4, 5, 4] }}
                         transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                     />
                </MotionG>

                {/* Glass Highlights & Outline */}
                <path 
                    d="M12,10 Q12,118 50,118 Q88,118 88,10" 
                    fill="none" 
                    stroke="rgba(255,255,255,0.4)" 
                    strokeWidth="1.5" 
                />
                
                {/* Stem */}
                <line x1="50" y1="118" x2="50" y2="175" stroke="rgba(255,255,255,0.4)" strokeWidth="3" />
                {/* Base */}
                <path d="M25,175 Q50,170 75,175 L75,178 L25,178 Z" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" />
                
                {/* Reflection Highlight on Bowl */}
                <path d="M18,20 Q18,100 30,105" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeLinecap="round" />

                {/* Wine Bottle Group */}
                <MotionG
                    // Initial: hidden to right. Animate: Move to spout position over glass.
                    // Origin set to 0,0.5 (left middle) to pivot around spout
                    style={{ originX: 0, originY: 0.5 }}
                    initial={{ x: 200, y: -100, rotate: 0, opacity: 0 }}
                    // x=48 aligns the spout (0,0 of group) exactly with stream at x=48
                    animate={pouring ? { x: 48, y: -55, rotate: -60, opacity: 1 } : { x: 200, y: -100, rotate: 0, opacity: 0 }}
                    transition={{ duration: 0.8, type: "spring", stiffness: 40, damping: 10 }}
                >
                    {/* Bottle Shape - drawn horizontally starting from origin (spout) */}
                    <g transform="translate(0, 0)"> 
                        {/* Neck */}
                        <rect x="0" y="-8" width="40" height="16" fill="url(#bottleGradient)" rx="2" />
                        {/* Lip */}
                        <rect x="0" y="-9" width="5" height="18" fill="#1a202c" rx="1" />
                        
                        {/* Shoulder & Body */}
                        <path 
                            d="M38,-8 Q55,-8 60,-25 L60,-25 L160,-25 L160,25 L60,25 Q55,8 38,8 Z" 
                            fill="url(#bottleGradient)" 
                        />
                        
                        {/* Label */}
                        <rect x="70" y="-18" width="60" height="36" fill="#f43f5e" rx="2" />
                        <rect x="75" y="-12" width="50" height="24" fill="#fff" rx="1" />
                        <text x="100" y="5" fontSize="10" fill="#f43f5e" textAnchor="middle" fontWeight="bold">WINE</text>
                    </g>
                </MotionG>

            </svg>
        </div>
      </div>

      <div className="z-10 flex flex-col gap-6 items-center w-full max-w-md min-h-[120px] pb-8">
        {!filled && !pouring ? (
          <MotionButton
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePour}
            className="bg-rose-700 hover:bg-rose-600 text-white px-8 py-3 rounded-full font-semibold shadow-xl border border-rose-500/50"
          >
            Madam ji Wine dalu?😁
          </MotionButton>
        ) : (
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: filled && !pouring ? 1 : 0, y: filled && !pouring ? 0 : 20 }}
            transition={{ delay: 0.5 }}
            className={`text-center w-full px-4 ${filled && !pouring ? 'visible' : 'invisible'}`}
          >
            <div className="h-8 mb-8">
                <TypingText text='"Not real, but for now cheers "' className="text-xl italic text-rose-300/80" delay={0} speed={40} />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
                <MotionButton
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                    onClick={onQuestion}
                    className="bg-rose-600 text-white px-8 py-4 rounded-full font-bold shadow-xl hover:bg-rose-500 flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                    <HeartHandshake size={20} />
                    Ek baat puchu?
                </MotionButton>

                <MotionButton
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    onClick={onNext}
                    className="bg-transparent border border-rose-500/50 text-rose-200 px-8 py-4 rounded-full font-semibold hover:bg-rose-900/50 flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                    aao bs thoda hi hai
                    <ArrowRight size={18} />
                </MotionButton>
            </div>
          </MotionDiv>
        )}
      </div>
    </div>
  );
};

export default Wine;