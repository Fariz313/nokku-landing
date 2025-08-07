import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import AnimatedText from './AnimatedText';

const AnimatedLogo = () => {
  return (
    <div className="relative overflow-hidden">
      <motion.div
        initial={{ x: -200, y: 100, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ 
          type: 'spring',
          stiffness: 50,
          damping: 15,
          delay: 0.5
        }}
        className="inline-block"
      >
        <span className="text-white font-bold">NOKKU</span>
      </motion.div>
      
      <motion.div 
        initial={{ x: 200, y: -100, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 50,
          damping: 15,
          delay: 0.5
        }}
        className="inline-block ml-2"
      >
        <span className="text-yellow-300 font-bold">TECH</span>
      </motion.div>
    </div>
  );
};

const ContentSection = () => {
  return (
    <div className="relative z-10 w-full h-full grid md:grid-cols-2 p-10 md:p-20 items-center">
      <div className="relative w-full">
        <h1 className="block text-4xl md:text-[75px] w-3/4 mb-5">
          <AnimatedLogo />
        </h1>
        <h1 className="block text-4xl md:text-5xl w-3/4 mb-5 font-semibold text-white">
          <AnimatedText />
        </h1>
        <p className="text-gray-300 text-sm md:text-base">
          Watch the fluid spheres emerge from opposite corners and interact with your cursor movements.
        </p>
      </div>
      <div className="relative">
        <img
          src="illustration.webp"
          alt="Technology Illustration"
          className="relative z-10 w-full max-w-lg mx-auto"
        />
      </div>
    </div>
  );
};

export default ContentSection;