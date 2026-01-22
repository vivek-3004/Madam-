import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';
import { BaseProps } from '../types';
import TypingText from './TypingText';

interface HomeProps extends BaseProps {}

// Cast motion components to any to avoid TypeScript errors with missing props
const MotionDiv = motion.div as any;
const MotionP = motion.p as any;
const MotionButton = motion.button as any;

const Home: React.FC<HomeProps> = ({ onNext }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden min-h-[100dvh]">
      {/* Decorative Background Elements */}
      <MotionDiv 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="absolute top-10 left-10 text-rose-200"
      >
        <Heart size={64} fill="currentColor" />
      </MotionDiv>
      <MotionDiv 
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ repeat: Infinity, duration: 5, delay: 1 }}
        className="absolute bottom-20 right-10 text-rose-200"
      >
        <Heart size={96} fill="currentColor" />
      </MotionDiv>

      <MotionDiv
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="z-10 bg-white/60 backdrop-blur-sm p-8 md:p-10 rounded-3xl shadow-xl border border-rose-100 max-w-lg w-full flex flex-col items-center"
      >
        {/* Her Image Section */}
        <MotionDiv
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-rose-200 shadow-lg mb-6 shrink-0 relative"
        >
            <img 
                src="https://github.com/vivek-3004/images/blob/main/choti%20bachi.png?raw=true" 
                alt="Birthday Girl" 
                className="w-full h-full object-cover"
            />
        </MotionDiv>

        <div className="h-20 md:h-24 mb-6 flex items-center justify-center w-full">
            <TypingText 
                text="Happy Birthday Choti Bachi!😊" 
                className="font-handwriting text-4xl md:text-6xl text-rose-500 leading-tight" 
                speed={100}
                delay={1000} 
            />
        </div>
        <div>
          <TypingText
            text="You Are Queen, Enchantress, Goddess, Choti Bachi, Madam Ji, Pookie bhi🤭, Magic bhi Ho And You Are Special For Me"
            className="text-xl italic text-rose-300/80"
            delay={0}
            speed={40}
          />
        </div>
        

        <MotionP 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4 }}
            className="text-lg md:text-xl text-stone-600 mb-8 leading-relaxed max-w-md"
        >
          Tumhara Birthday hai aaj me literally bhut zada excited hu like ki i don't know how to express🥳🥳🥳 ye emoji se bhi zada. Mere liye bhi bahut special din hai. Like last year jaise hi I don't know what to say because bhut kuch aara hai mere chotu se dimag me, mene last year jaise hi is baar bhi page banaya, I know baar baar same chizein uske liye sorry but last year se thoda acha banane ki koshish ki hai jo bhi  tho chalo aage dekhte hai chotiii bachiiii 😁.
          Today is all about you. I've put together a little journey to show you something i mean many things to read😅. If spelling ulti pulti ho tho samjh lena sorry🥲. And if kuch bura lage tho uske liye bhi sorry 🥲 mere dimag me jo kuch aaya sub bhar diya.
        </MotionP>
        
        <MotionButton
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="group bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full font-semibold text-lg flex items-center gap-2 mx-auto transition-all shadow-md"
        >
          Ye Tho Bas trailer hai... Aage Aur hai!
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </MotionButton>
      </MotionDiv>
    </div>
  );
};

export default Home;
