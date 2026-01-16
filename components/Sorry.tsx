
import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, CalendarHeart, Key } from 'lucide-react';
import TypingText from './TypingText';

interface SorryProps {
    onRestart: () => void;
    onSecret: () => void;
}

// Cast motion components to any to avoid TypeScript errors with missing props with some versions
const MotionDiv = motion.div as any;
const MotionP = motion.p as any;

const Sorry: React.FC<SorryProps> = ({ onRestart, onSecret }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#1a1a2e] text-slate-100 min-h-[100dvh] relative overflow-hidden">
      
      {/* Rain effect background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {Array.from({ length: 30 }).map((_, i) => (
            <MotionDiv
                key={i}
                className="absolute bg-indigo-400 w-[1px] h-20"
                initial={{ y: -100, x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0 }}
                animate={{ y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000 }}
                transition={{ duration: 0.8 + Math.random(), repeat: Infinity, delay: Math.random() * 2, ease: "linear" }}
            />
        ))}
      </div>

      <MotionDiv 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-xl text-center z-10"
      >
        <h2 className="text-4xl md:text-6xl font-handwriting mb-8 text-indigo-200">
            <TypingText text="I'm Sorry" speed={150} />
        </h2>
        
        <div className="space-y-6 text-lg text-indigo-200/80 font-light leading-relaxed mb-12">
          <MotionP initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            Because mene but pareshan kiya irritate kiya like pura pagal kardiya khud overthing karke tumhe hurt kiya.
          </MotionP>
          <MotionP initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
            Meri wajah se tumhari aakhon me aasu aaye🙂filmy lag raha hoga but such me sorry🥺.
          </MotionP>
          <MotionP initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}>
            Sorry uske har ek chiz ya harkate ke liye jisse tumhe hurt hua😔.
          </MotionP>
          <MotionP 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4 }}
            className="text-white font-medium text-xl pt-4"
          >
            I promise you💕 I will always disturb you, but only with all love💕😅 and care i have.
            Once Again Happy Birthday Choti Cachi, And ENJOY karna thik now its your day🤩🥳.
          </MotionP>
        </div>

        <MotionDiv 
            className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 5, duration: 1 }}
        >
            <button
                onClick={() => alert("This page is from the past. Let's focus on our future.")} 
                className="border border-indigo-700 text-indigo-300 hover:text-white hover:border-indigo-500 hover:bg-indigo-900/50 px-6 py-3 rounded-full transition-all duration-300 flex items-center justify-center gap-2"
            >
                <CalendarHeart size={18} />
                Last Year
            </button>

            <button
                onClick={onSecret}
                className="bg-rose-900/40 border border-rose-500/50 text-rose-200 hover:bg-rose-800/60 px-6 py-3 rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-rose-950/20"
            >
                <Key size={18} />
                Secret Message
            </button>
            
            <button
                onClick={onRestart}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/50"
            >
                <RefreshCw size={18} />
                See Again
            </button>
        </MotionDiv>
      </MotionDiv>
    </div>
  );
};

export default Sorry;
