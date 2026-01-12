import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PageView } from './types';
import Home from './components/Home';
import About from './components/About';
import Slideshow from './components/Slideshow';
import Wine from './components/Wine';
import Sorry from './components/Sorry';
import Question from './components/Question';
import BackgroundMusic from "./BackgroundMusic";


// Cast motion component to any to avoid TypeScript errors with missing props in current setup
const MotionDiv = motion.div as any;

const App: React.FC = () => {
  const [view, setView] = useState<PageView>(PageView.HOME);
  const [playMusic, setPlayMusic] = useState(false);

  const handleNext = (nextView: PageView) => {
  setPlayMusic(true);
  setView(nextView);
};


  const handleRestart = () => {
    setView(PageView.HOME);
  };

  const renderView = () => {
    switch (view) {
      case PageView.HOME:
        return <Home onNext={() => handleNext(PageView.ABOUT)} />;
      case PageView.ABOUT:
        return <About onNext={() => handleNext(PageView.SLIDESHOW)} />;
      case PageView.SLIDESHOW:
        return <Slideshow onNext={() => handleNext(PageView.WINE)} />;
      case PageView.WINE:
        return (
          <Wine 
            onNext={() => handleNext(PageView.SORRY)} 
            onQuestion={() => handleNext(PageView.QUESTION)} 
          />
        );
      case PageView.QUESTION:
        // After accepting, we move to the final Sorry page
        return <Question onNext={() => handleNext(PageView.SORRY)} />;
      case PageView.SORRY:
        return <Sorry onRestart={handleRestart} />;
      default:
        return <Home onNext={() => handleNext(PageView.ABOUT)} />;
    }
  };

  return (
    <div className="min-h-[100dvh] w-full relative bg-[#faf5f5] overflow-hidden">
      <BackgroundMusic play={playMusic} />

      <AnimatePresence mode="wait">
        <MotionDiv
          key={view}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full"
        >
          {renderView()}
        </MotionDiv>
      </AnimatePresence>
    </div>
  );
};

export default App;
