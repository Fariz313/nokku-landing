import { useRef, useEffect, useState } from 'react';
import FluidSphere from './FluidSphere';
import useFluidAnimation from './FluidAnimation';
import ContentSection from './ContentSection';

const Meteor = ({ id }) => {
  const [position, setPosition] = useState({
    x: Math.random() * 100,
    y: Math.random() * 100 - 100
  });
  const [size] = useState(Math.random() * 3 + 1);
  const [duration] = useState(Math.random() * 5 + 5);

  useEffect(() => {
    const animate = () => {
      setPosition(prev => ({
        x: prev.x + 0.2,
        y: prev.y + 1
      }));

      if (position.y > 100) {
        setPosition({
          x: Math.random() * 100,
          y: Math.random() * 20 - 20
        });
      }
    };

    const interval = setInterval(animate, 50);
    return () => clearInterval(interval);
  }, [position.y]);

  return (
    <div
      className="absolute bg-white rounded-full pointer-events-none"
      style={{
        left: `${position.x}vw`,
        top: `${position.y}vh`,
        width: `${size}px`,
        height: `${size}px`,
        opacity: 0.7,
        filter: 'blur(1px)',
        transform: 'rotate(-45deg)',
        boxShadow: `0 0 ${size * 2}px ${size}px rgba(100, 200, 255, 0.5)`,
        transition: `left ${duration}s linear, top ${duration}s linear`
      }}
    />
  );
};

const MeteorShower = ({ count = 15 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Meteor key={i} id={i} />
      ))}
    </>
  );
};

const FluidSpheres = () => {
  const containerRef = useRef(null);
  const sphere1Ref = useRef(null);
  const sphere2Ref = useRef(null);

  const sensitivityConfig = {
    cursorInfluence: 0.65,
    responseSpeed: 0.025,
    damping: 0.89,
    noiseScale: 90,
    minDistance: 300,
    deformationScale: 1.7
  };

  const { setupAnimation } = useFluidAnimation(sensitivityConfig);

  useEffect(() => {
    return setupAnimation(containerRef, sphere1Ref, sphere2Ref);
  }, [setupAnimation]);

  return (
    <div 
      ref={containerRef}
      className="w-screen h-screen relative overflow-hidden "
    >
      {/* Meteor Shower Background */}
      <div className="absolute inset-0 overflow-hidden">
        <MeteorShower count={20} />
      </div>

      {/* Fluid Spheres */}
      <div className="absolute inset-0">
        <FluidSphere
          ref={sphere1Ref}
          position="translate(calc(50% - 200px), calc(50% + 200px))"
          gradientFrom="from-cyan-400/40"
          gradientTo="to-blue-600/40"
          blur={60}
        />
        <FluidSphere
          ref={sphere2Ref}
          position="translate(calc(50% + 200px), calc(50% - 200px))"
          gradientFrom="from-indigo-600/40"
          gradientTo="to-blue-400/40"
          blur={60}
        />
      </div>
      
      <ContentSection />
    </div>
  );
};

export default FluidSpheres;    