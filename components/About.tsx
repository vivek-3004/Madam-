import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { BaseProps } from '../types';
import TypingText from './TypingText';

interface AboutProps extends BaseProps {}

// Cast motion components to any to avoid TypeScript errors with missing props
const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

const notes = [
  {
    id: 1,
    image: "https://github.com/vivek-3004/images/blob/main/smile1.png?raw=true", 
    title: "Madam😁 jii Aapki Smile",
    text: "Like dekhona dekhona guys tumhari smile kitni cute lagti hai uper dekho pic me🧿🤭, and sometimes cool😎 aur Elegent, and jb tum heeeee karke hasti ho 8 😁🫣 and vo cute sa dimple Uffff Aayee Haaayeee. Pata, if subha subha me tumhara smily face dekhlu then literally Meri good morning ho jati hai 😁.(It's the first thing I want to see in the morning.)"
  },
  {
    id: 2,
    image: "https://github.com/vivek-3004/images/blob/main/eyes.png?raw=true", 
    title: "Madam jii 👀Aapki Eyes",
    text: "Your eyes Like inhe bhi dekhona dekhona guys like bs ab kisi ko possess kar lengi me tho ho chuka hu 🫣 like kaise hi na houuu... bakiyon ka nhi pata but such me your eyes are like uffff 🔥, you know pani aane ke baad or zada shiny ho jati hai 😅, but I don't like when you roing yess i know kabhi kabhi me bhi reason hota hu me try tho karta hu ki aise na ho but hi jata hai sorry 🥲 but I will still try my best to make you heehee heee more then roing 😅 mere dimag me jo aara hai sb kuch dale jara hu baad me mujhe batana maja aaya ki nhi 😁 I know bhut zada likh raha hu but shyad bore nhi hogi read karne me hehehe karna thik 🫣😁chotu sa song Your eyes got my heart I'm falling for you You're messing with my heart and I still wanna love you I wanna spend my life drowning in your eyes it's my only prayer😁."
  },
  {
    id: 3,
    image: "https://github.com/vivek-3004/images/blob/main/kindness.png?raw=true", 
    title: "Choti Bachi Aapki Kindness😇",
    text: "Tum sbka dhyan rakhti ho sbki care karti ho (na! nahi mt bolo) karti ho bs khud hi nhi karti 😤. Tum sbke bare me sochti ho but aapna dhyan bhi rakha karo madam, tum sbke face pe smile lati mere tho bhut zada ekdm zada. Tum bhut special ho samjhi ☺️ You have a heart of gold that makes everyone feel special. Tumhari presence hi meri life ko better banati hai. I am grateful for every moment we share and moment we will see😎. Aap jaisi ho bas aisi hi raho, kyuki aap perfect ho (mere liye)😁"  
  },
  {
    id: 4,
    image: "https://github.com/vivek-3004/images/blob/main/strength.png?raw=true",
    title: "Aap Bhut Strong Hain Madam😎",
    text: "Hey i know tum bhut strong ho😎 but hamesha strong na raha karo 😅 i mean sara load aapne uper mt liya karo.Tumne bhut kuch saha hai jhela hai like life me itni sari problems aayi but tumne kabhi give up nhi kiya🥹, haa tumne bs different ways se solve Kiya, even mujhe bhi jhela mera pglpn bhi saha 😅. Khud tention me hone ke baad bhi mujhe sambhala. Tumhari AURA bhut different hai strong hai and such me when i see your pair meri sadness low feeling chali jati hai like gayb. You are built different madam jii, maata ji ne bhut sochne ke baad banaya hoga 🤭.You are stronger than you know. I'm so proud of you choti bachi😁."
  },
  {
    id: 5,
    image: "https://github.com/vivek-3004/images/blob/main/shukriya.png?raw=true",
    title: "Shukriya Choti Bachi🥹",
    text: "1 2 3!!! shukriya for being born like such me shukriya, shukriya meri life me aane ke liye, shukriya mere har pagalpan sehne ke liye, shukriya mere breakdown hone pe mujhe sambhalne ke liye, shukriya mera sath dene ke liye, shukriya meri itni batamizi jhelne ke liye, shukriya mujhe motivate karne ke liye, shukriya meri zid jheli easy thodi na hai, shukriya for being you 🥺 and shukriya bhut bhut zada ekdm sara shukriya itna sara ki bhut sara, ha I know kuch bhi bol raha hu but such me bhut bhut bhut bhut bhu.....ttttt sara shukriya Pani pani hogayi me tho 😂. And You Can Slay In Any LOOK Sometimes Cool, Stunning, Gorgeous, Elegant bhi aur Classy, Bold, and Perfect, uper wali pic me dekho😎"
  }
];

const About: React.FC<AboutProps> = ({ onNext }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    if (activeIndex < notes.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      setTimeout(onNext, 200);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center py-6 md:py-10 px-4 min-h-[100dvh] bg-[#faf5f5] overflow-y-auto w-full">
      
      {/* Header Section */}
      <h2 className="text-3xl md:text-5xl font-handwriting text-rose-500 text-center z-20 mt-2 mb-6 flex-none">
        <TypingText text="Things I want you to know about you (Thing I Love About You)" speed={50} />
      </h2>

      {/* Cards Section - Flexible height that responds to screen size */}
      {/* Uses flex-1 to take available space but enforces a min-height for the cards */}
      <div className="relative w-full max-w-md min-h-[480px] md:min-h-[520px] flex-none z-10 perspective-1000 mb-10">
        <AnimatePresence mode='popLayout'>
          {notes.map((note, index) => {
            if (index < activeIndex) return null; 

            const isFront = index === activeIndex;
            const offset = index - activeIndex;
            const scale = 1 - offset * 0.05;
            const yOffset = offset * 15; // Decreased offset for mobile compactness
            const zIndex = notes.length - offset;
            const opacity = 1 - offset * 0.2;

            return (
              <MotionDiv
                key={note.id}
                initial={{ opacity: 0, scale: 0.8, y: 100 }}
                animate={{ 
                    opacity: opacity,
                    scale: scale,
                    y: yOffset,
                    zIndex: zIndex,
                    rotate: isFront ? 0 : (index % 2 === 0 ? 2 : -2)
                }}
                exit={{ 
                    zIndex: 0,
                    scale: 0.8,
                    y: -50,
                    opacity: 0,
                    transition: { duration: 0.5 }
                }}
                transition={{ duration: 0.5, type: "spring" }}
                className="absolute top-0 left-0 right-0 mx-auto bg-white p-5 md:p-6 rounded-2xl shadow-2xl border border-stone-200 w-[90%] md:w-full min-h-full flex flex-col"
                style={{ transformOrigin: "top center" }}
              >
                <div className=" w-full overflow-hidden rounded-lg mb-4 bg-stone-200 relative shrink-0">
                  <img 
                    src={note.image} 
                    alt={note.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-rose-400 mb-2 font-handwriting shrink-0">
                    {isFront && <TypingText text={note.title} delay={300} speed={50} />}
                    {!isFront && note.title}
                </h3>
                {/* 🔽 SCROLLABLE TEXT AREA */}
                <div className="flex-1 overflow-y-auto text-stone-600 text-sm leading-relaxed font-medium pr-2">
                  {isFront ? (
                    <TypingText text={note.text} delay={800} speed={30} />
                  ) : (
                    <span className="opacity-0">{note.text}</span>
                  )}
                </div>
                <div className="mt-4 flex justify-center text-yellow-400 gap-1 shrink-0">
                  {[...Array(3)].map((_, i) => (
                      <MotionDiv
                        key={i}
                        initial={{ scale: 0 }}
                        animate={isFront ? { scale: 1 } : { scale: 0 }}
                        transition={{ delay: 1.5 + (i * 0.2) }}
                      >
                          <Star size={16} fill="currentColor" />
                      </MotionDiv>
                  ))}
                </div>
                <div className="pt-4 shrink-0">
                  <MotionButton
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNext}
                    className="w-full bg-rose-500 text-white px-8 py-3 
                              rounded-full font-semibold shadow-lg 
                              flex items-center justify-center gap-2"
                  >
                    {activeIndex < notes.length - 1 ? "Aage Dekho" : "Special Surprise🫣"}
                    <ArrowRight size={20} />
                  </MotionButton>
                </div>
              </MotionDiv>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Button Section - distinct margin-top to ensure separation */}
      
    </div>
  );
};

export default About;
