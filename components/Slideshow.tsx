import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { BaseProps } from '../types';

interface SlideshowProps extends BaseProps {}

// Cast motion components to any to avoid TypeScript errors with missing props
const MotionDiv = motion.div as any;
const MotionP = motion.p as any;
const MotionButton = motion.button as any;

const images = [
  {
    id: 1,
    src: "/assets/memories/1.jpg",
    caption: "The first🤭pic sent by you"
  },
  {
    id: 2,
    src: "/assets/memories/2.png",
    caption: "yrrr tum ho like ufff😍"
  },
  {
    id: 3,
    src: "/assets/memories/3.png",
    caption: "Mujhe yaad hai dance😳🫣🔥"
  },
  {
    id: 4,
    src: "/assets/memories/4.png",
  caption: "Adorable Look😚"
  },
  {
    id: 5,
    src: "/assets/memories/5.png",
    caption: "Perfect Look😎"
  },
  {
    id: 6,
    src: "/assets/memories/6.png",
    caption: "CHOTI BACHI 🤭🤩"
  },
  {
    id: 7,
    src: "/assets/memories/7.png",
    caption: "Frok tumpe achi lagti hai😎"
  },
  {
    id: 8,
    src: "/assets/memories/8.png",
    caption: "Cute Tho Tum Ho🫣"
  },
  {
    id: 9,
    src: "/assets/memories/9.png",
    caption: "Real Apsara 😇"
  },
  {
    id: 10,
    src: "/assets/memories/10.png",
    caption: "Eyes nose lips everything😌"
  },
  {
    id: 11,
    src: "/assets/memories/11.png",
    caption: "Dimple Wali Smile🤭"
  },
  {
    id: 12,
    src: "/assets/memories/12.png",
    caption: "You in SARI😍😳"
  },
  {    id: 13,
    src: "/assets/memories/13.png",
    caption: "sharara me mast lag rahi ho🤩"
  },
  {    id: 14,
    src: "/assets/memories/14.png",
    caption: "Modeling Kar Sakti ho🔥"
  },
  {    id: 15,
    src: "/assets/memories/15.png",
    caption: "Tumhari Smile🥰"
  },
  {    id: 16,
    src: "/assets/memories/16.png",
    caption: "(Fav)Mene Isse Bhut Br Dekha hai🫣"
  },  
  {    id: 17,
    src: "/assets/memories/17.png",
    caption: "Cute lag rahi ho🧿"
  },
  {    id: 18,
    src: "/assets/memories/18.png",
    caption: "Colourfull Universe(You)🌈"
  },
  {    id: 19,
    src: "/assets/memories/19.png",
    caption: "THE GODDESS🧎🏼"
  },
  {    id: 20,
    src: "/assets/memories/20.png",
    caption: "Ufff Tumhari Looks😚"
  },
  {    id: 21,
    src: "/assets/memories/21.png",
    caption: "Tum teenage me bhi cute thi😜"
  }
];


interface OrbitingImageProps {
  item: typeof images[0];
  radius: number;
  initialAngle: number;
  speed: number; // radians per frame
}

// Helper component for an orbiting item using physics/math based positioning
const OrbitingImage: React.FC<OrbitingImageProps> = ({ 
  item, 
  radius, 
  initialAngle,
  speed
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [angle, setAngle] = useState(initialAngle);
    const [isHovered, setIsHovered] = useState(false);

    useAnimationFrame((t, delta) => {
        if (!isHovered) {
            // Update angle based on speed
            setAngle(prev => prev + speed * (delta / 16)); 
        }
    });

    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    return (
        <MotionDiv
            ref={ref}
            className="absolute top-1/2 left-1/2"
            style={{ 
                x, 
                y,
                translateX: '-50%',
                translateY: '-50%',
                zIndex: isHovered ? 100 : 1
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <MotionDiv
                animate={{ scale: isHovered ? 1.5 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-white p-2 shadow-lg rounded-lg w-20 md:w-32 cursor-pointer relative"
            >
                <div className="aspect-square overflow-hidden bg-stone-200 rounded mb-1">
                    <img src={item.src} alt="memory" className="w-full h-full object-cover pointer-events-none" />
                </div>
                <MotionP 
                    animate={{ opacity: isHovered ? 1 : 0.7 }}
                    className="text-[9px] md:text-[10px] text-center font-handwriting text-stone-600 truncate"
                >
                    {item.caption}
                </MotionP>
            </MotionDiv>
        </MotionDiv>
    );
};

const Slideshow: React.FC<SlideshowProps> = ({ onNext }) => {
  // Simple check for mobile to adjust radii
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scaleFactor = isMobile ? 0.6 : 1;

  return (
    <div className="min-h-[100dvh] bg-slate-950 flex flex-col relative overflow-hidden">
      {/* Space Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         {Array.from({ length: 50 }).map((_, i) => (
            <MotionDiv
              key={i}
              className="absolute bg-white rounded-full opacity-70"
              initial={{ opacity: Math.random(), scale: Math.random() * 0.5 + 0.5 }}
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3}px`,
                height: `${Math.random() * 3}px`,
              }}
            />
         ))}
      </div>

      <div className="text-center pt-8 pb-4 z-20 pointer-events-none relative flex-none">
        <h2 className="text-3xl md:text-4xl font-handwriting text-rose-300 mb-2 drop-shadow-lg">You Only You (My Universe)</h2>
        <p className="text-rose-100/70 text-xs md:text-sm">You are UNIVERSE (This Is You Inside My Mind🫣)</p>
      </div>

      {/* Orbit Container - Responsive height using flex-1 */}
      <div className="flex-1 relative w-full flex items-center justify-center overflow-visible z-10 my-4 min-h-[300px]">
        {/* Central Star/Core */}
        <MotionDiv 
            animate={{ scale: [1, 1.1, 1], boxShadow: ["0 0 20px #f43f5e", "0 0 40px #f43f5e", "0 0 20px #f43f5e"] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-12 h-12 md:w-16 md:h-16 bg-rose-500 rounded-full flex items-center justify-center z-10 shadow-[0_0_20px_#f43f5e]"
        >
            <Star fill="white" className="text-white" size={20} />
        </MotionDiv>

        {/* Orbit Rings (Visual only) - Scaled for mobile */}
        <div className="absolute border border-rose-500/50 rounded-full pointer-events-none" style={{ width: 280 * scaleFactor, height: 280 * scaleFactor }} />
        <div className="absolute border border-rose-500/40 rounded-full pointer-events-none" style={{ width: 480 * scaleFactor, height: 480 * scaleFactor }} />
        <div className="absolute border border-rose-500/25 rounded-full pointer-events-none" style={{ width: 680 * scaleFactor, height: 680 * scaleFactor }} />
        <div className="absolute border border-rose-500/15 rounded-full pointer-events-none" style={{ width: 880 * scaleFactor, height: 880 * scaleFactor }} />
        <div className="absolute border border-rose-500/5 rounded-full pointer-events-none" style={{ width: 880 * scaleFactor, height: 880 * scaleFactor }} />

        {/* Inner Orbit Images */}
        {images.slice(0, 4).map((img, i) => (
            <OrbitingImage 
                key={img.id} 
                item={img} 
                radius={140 * scaleFactor} 
                initialAngle={(i / 4) * Math.PI * 2}
                speed={0.005}
            />
        ))}

        {/* Middle Orbit Images */}
        {images.slice(4, 8).map((img, i) => (
            <OrbitingImage 
                key={img.id} 
                item={img} 
                radius={240 * scaleFactor} 
                initialAngle={(i / 4) * Math.PI * 2}
                speed={-0.003} // Reverse direction
            />
        ))}
        
        {/* Outer Orbit Images */}
        {images.slice(8, 12).map((img, i) => (
            <OrbitingImage 
                key={img.id} 
                item={img} 
                radius={340 * scaleFactor} 
                initialAngle={(i / 4) * Math.PI * 2}
                speed={0.002}
            />
        ))}
        {images.slice(12, 18).map((img, i) => (
            <OrbitingImage 
                key={img.id}
                item={img} 
                radius={440 * scaleFactor} 
                initialAngle={(i / 6) * Math.PI * 2}
                speed={-0.001}
            />
        ))}
        {images.slice(18, 21).map((img, i) => (
            <OrbitingImage 
                key={img.id}
                item={img} 
                radius={540 * scaleFactor} 
                initialAngle={(i / 3) * Math.PI * 2}
                speed={0.0005}
            />
        ))}
      </div>

      <div className="pb-8 pt-4 flex justify-center z-50 relative flex-none">
        <MotionButton
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onNext}
          className="bg-white/10 backdrop-blur-md border border-rose-500/30 text-rose-300 hover:text-white px-8 py-3 rounded-full font-semibold shadow-[0_0_15px_rgba(244,63,94,0.4)] flex items-center gap-2 hover:bg-rose-500/20 transition-colors cursor-pointer"
        >
          Thodi Si Wine Ho Jaye🥳?
          <ArrowRight size={18} />
        </MotionButton>
      </div>
    </div>
  );
};

export default Slideshow;