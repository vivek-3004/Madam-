
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Send, ArrowRight, Heart } from 'lucide-react';
import { BaseProps } from '../types';
import TypingText from './TypingText';

const SecretMessage: React.FC<BaseProps> = ({ onNext }) => {
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const CORRECT_PASSWORD = 'choti bachi';

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase().trim() === CORRECT_PASSWORD) {
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-stone-900 text-stone-100 min-h-[100dvh] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-900/20 via-stone-900 to-stone-900 pointer-events-none" />

      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div
            key="locked"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="z-10 w-full max-w-md bg-stone-800/50 backdrop-blur-md p-8 rounded-3xl border border-stone-700 shadow-2xl text-center"
          >
            <motion.div
              animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
              className="mb-6 flex justify-center text-rose-500"
            >
              <div className="p-4 bg-stone-900/50 rounded-full border border-stone-700">
                <Lock size={48} />
              </div>
            </motion.div>

            <h2 className="text-2xl font-handwriting text-rose-300 mb-2">A Secret for You</h2>
            <p className="text-sm text-stone-400 mb-8">Enter Karo Password Fir Hi Read Kar Paogi Hidden Message.</p>

            <form onSubmit={handleUnlock} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Hint: Me Jo Tumhe Bulata Hu!!!"
                className={`w-full bg-stone-900/80 border ${error ? 'border-rose-500' : 'border-stone-600'} rounded-xl px-4 py-3 text-center focus:outline-none focus:border-rose-500 transition-colors tracking-widest`}
              />
              <button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-500 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-950"
              >
                <Send size={18} />
                Unlock Message
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="unlocked"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="z-10 w-full max-w-2xl bg-[#fdfcf0] text-stone-800 p-8 md:p-12 rounded-lg shadow-[0_10px_50px_rgba(0,0,0,0.5)] border-l-[12px] border-rose-200 relative overflow-hidden"
          >
            {/* Paper Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
            
            <div className="flex justify-between items-start mb-8 relative">
              <motion.div 
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                className="text-rose-500"
              >
                <Unlock size={32} />
              </motion.div>
              <div className="text-right text-stone-400 font-serif text-sm italic">
                {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            </div>

            <div className="font-serif leading-relaxed space-y-6 text-lg relative">
              <p className="font-handwriting text-3xl text-rose-600 mb-4">My Dearest Queen👑,</p>
              
              <p>
                If tum ye LETTER💌 read kar rahi ho, means tumne sara kuch dekh liya jo mene banaya, kaisa laga itna sb dekhne ke baad?😅, irritate?. 
                Pata hai aisa bhut kuch hai jo me bol nhi pata😅 and shayd bolunga tho problem bhi ho sakti hai🙂 and hui bhi hogi sometimes bol deta hu😅, but pata mujhe acha lagta hai jb mere dimag me tumhare naam chalta hai like sandli 😊 sandli😊 sandli😊 sandli😊 sandli😊and bs asie hi bhut der tk like agib si happiness aajati hai, 
                listen you choti bachi you are strong🦁 and smart😎 samjhi so aapne bare ulta pulta na bola karo, aaj tumhare birthday tho aaj tumhari ek special wish puri hogi ya ho chuki hogi, pata hai na mera bolne se bhut kuch hota hai🪄. .
              </p>

              <p>
                Tum mere liye home ho and mera subse bada Gift, subse badi happiness, meri motivation, meri limit breaker, mera pagalpan, meri ..... 😅. Pata every day with you feels like a gift I 
                don't deserve, And ha me promise ki i will spend the rest of my life trying to be worthy of you🥹. 
                I promise to be there for you in any situation😤, chahe kuch bhi ho, and listen kuch bhi ho you can say bina kuch soche don't think ki me kya sochunga ya judge karunga aisa kuch nhi karunga you also know na😁 samjhi madam jiiii😤. Me hamesha pareshan karunga aise hi😂.
                Remember this devil will always behind you, even if me nipt gaya bhoot banke aa jaunga samjhi😎😂.
              </p>

              <p>
                Hey so sorry if itna kuch read kar liya tho ab gussa aara hoga ki kya pgl hai.😅 ye sb likhne me zada dimag nhi lagaya😂.  
                Thank you for being you. For the way you laugh, for the way you care, and HAPPY HAPPY HAPPY BIRTHDAY MADAM🥳.
                yeee huureee party. Me such me bhut zada excited huuuuu🥳🥳 like dance karu🥳😂.
                Happy birthday choti bachi😊
              </p>

              <div className="pt-8 flex flex-col items-end">
                <p className="font-handwriting text-2xl mb-1">With all my Madness,</p>
                <p className="font-serif font-bold text-rose-500">Forever Yours Madam</p>
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="mt-2 text-rose-500"
                >
                    <Heart fill="currentColor" size={24} />
                </motion.div>
              </div>
            </div>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
                className="mt-12 flex justify-center"
            >
                <button
                    onClick={onNext}
                    className="bg-stone-800 text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-stone-700 transition-colors shadow-lg"
                >
                    Final Words
                    <ArrowRight size={20} />
                </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SecretMessage;
