import { useEffect, useRef } from 'react';

const FluidSpheres = () => {
  const sphere1Ref = useRef(null);
  const sphere2Ref = useRef(null); 
  const containerRef = useRef(null);
  const noiseSeed = useRef({
    x1: Math.random() * 1000,
    y1: Math.random() * 1000,
    x2: Math.random() * 1000,
    y2: Math.random() * 1000
  });

  // Sensitivity configuration
  const sensitivityConfig = {
    cursorInfluence: 1,
    responseSpeed: 0.5,
    damping: 0.89,
    noiseScale: 300,
    minDistance: 10,
    deformationScale: 3
  };

  // Noise function for organic movement
  const organicNoise = (x, y, seedX, seedY) => {
    return (Math.sin(x * 0.05 + seedX) * Math.cos(y * 0.07 + seedY) * 0.7 +
           Math.sin(x * 0.1 + seedY) * 0.3);
  };

  useEffect(() => {
    let animationFrameId;
    const mousePos = { x: 0, y: 0 };
    const sphere1Pos = { x: -200, y: 200, vx: 0, vy: 0 }; // Starting from bottom-left
    const sphere2Pos = { x: 200, y: -200, vx: 0, vy: 0 }; // Starting from top-right
    let time = 0;

    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mousePos.x = e.clientX - rect.left - rect.width / 2;
      mousePos.y = e.clientY - rect.top - rect.height / 2;
    };

    const repelSpheres = () => {
      const dx = sphere1Pos.x - sphere2Pos.x;
      const dy = sphere1Pos.y - sphere2Pos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < sensitivityConfig.minDistance) {
        const force = (sensitivityConfig.minDistance - distance) / 
                     sensitivityConfig.minDistance * 0.5;
        const fx = (dx / distance) * force;
        const fy = (dy / distance) * force;
        
        sphere1Pos.vx += fx;
        sphere1Pos.vy += fy;
        sphere2Pos.vx -= fx;
        sphere2Pos.vy -= fy;
      }
    };

    const animate = () => {
      if (!sphere1Ref.current || !sphere2Ref.current) return;

      time += 0.01;
      noiseSeed.current.x1 += 0.004;
      noiseSeed.current.y1 += 0.003;
      noiseSeed.current.x2 += 0.005;
      noiseSeed.current.y2 += 0.002;

      // Calculate noise values
      const n1x = organicNoise(time, 0, noiseSeed.current.x1, noiseSeed.current.y1);
      const n1y = organicNoise(0, time, noiseSeed.current.y1, noiseSeed.current.x1);
      const n2x = organicNoise(time * 0.8, time * 0.6, noiseSeed.current.x2, noiseSeed.current.y2);
      const n2y = organicNoise(time * 0.6, time * 0.8, noiseSeed.current.y2, noiseSeed.current.x2);

      // Sphere 1 (Bottom-left origin)
      const targetX1 = mousePos.x * sensitivityConfig.cursorInfluence + n1x * sensitivityConfig.noiseScale;
      const targetY1 = mousePos.y * sensitivityConfig.cursorInfluence + n1y * sensitivityConfig.noiseScale;
      
      sphere1Pos.vx += (targetX1 - sphere1Pos.x) * sensitivityConfig.responseSpeed;
      sphere1Pos.vy += (targetY1 - sphere1Pos.y) * sensitivityConfig.responseSpeed;
      sphere1Pos.vx *= sensitivityConfig.damping;
      sphere1Pos.vy *= sensitivityConfig.damping;
      sphere1Pos.x += sphere1Pos.vx;
      sphere1Pos.y += sphere1Pos.vy;

      // Sphere 2 (Top-right origin)
      const targetX2 = mousePos.x * (sensitivityConfig.cursorInfluence * 0.8) + 
                      n2x * (sensitivityConfig.noiseScale * 1.1);
      const targetY2 = mousePos.y * (sensitivityConfig.cursorInfluence * 0.8) + 
                      n2y * (sensitivityConfig.noiseScale * 1.1);
      
      sphere2Pos.vx += (targetX2 - sphere2Pos.x) * (sensitivityConfig.responseSpeed * 0.9);
      sphere2Pos.vy += (targetY2 - sphere2Pos.y) * (sensitivityConfig.responseSpeed * 0.9);
      sphere2Pos.vx *= (sensitivityConfig.damping * 0.98);
      sphere2Pos.vy *= (sensitivityConfig.damping * 0.98);
      sphere2Pos.x += sphere2Pos.vx;
      sphere2Pos.y += sphere2Pos.vy;

      // Apply repulsion force
      repelSpheres();

      // Apply transformations
      sphere1Ref.current.style.transform = `translate(calc(50% + ${sphere1Pos.x}px), calc(50% + ${sphere1Pos.y}px))`;
      sphere2Ref.current.style.transform = `translate(calc(50% + ${sphere2Pos.x}px), calc(50% + ${sphere2Pos.y}px))`;

      // Dynamic deformation
      const deform1 = Math.min(2.0, Math.sqrt(sphere1Pos.vx**2 + sphere1Pos.vy**2) / 6 * sensitivityConfig.deformationScale);
      const deform2 = Math.min(2.0, Math.sqrt(sphere2Pos.vx**2 + sphere2Pos.vy**2) / 8 * sensitivityConfig.deformationScale);
      
      sphere1Ref.current.style.borderRadius = `
        ${50 + deform1 * 40 * n1x}% ${50 - deform1 * 35 * n1y}% 
        ${50 + deform1 * 30 * organicNoise(time*1.5, time*0.5, noiseSeed.current.x1, noiseSeed.current.y1)}% 
        ${50 - deform1 * 25 * organicNoise(time*0.5, time*1.5, noiseSeed.current.y1, noiseSeed.current.x1)}% / 
        ${60 - deform1 * 20}% ${60 + deform1 * 25}% 
        ${40 - deform1 * 15}% ${40 + deform1 * 20}%
      `;
      
      sphere2Ref.current.style.borderRadius = `
        ${50 + deform2 * 35 * n2x}% ${50 - deform2 * 30 * n2y}% 
        ${50 + deform2 * 25 * organicNoise(time*1.2, time*0.8, noiseSeed.current.x2, noiseSeed.current.y2)}% 
        ${50 - deform2 * 20 * organicNoise(time*0.8, time*1.2, noiseSeed.current.y2, noiseSeed.current.x2)}% / 
        ${60 - deform2 * 15}% ${60 + deform2 * 20}% 
        ${40 - deform2 * 10}% ${40 + deform2 * 15}%
      `;

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-screen h-screen relative overflow-hidden"
    >
      {/* Fluid Spheres */}
      <div className="absolute inset-0">
        {/* Bottom-left sphere (cyan) */}
        <div 
          ref={sphere1Ref}
          className="absolute w-[500px] h-[500px] bg-gradient-to-br from-cyan-400/40 to-blue-600/30 opacity-40 filter blur-[70px] pointer-events-none"
          style={{
            borderRadius: '50%',
            transform: 'translate(calc(50% - 200px), calc(50% + 200px))',
            willChange: 'transform, border-radius',
            transition: 'all 0.5s cubic-bezier(0.33, 1, 0.68, 1)'
          }}
        />
        
        {/* Top-right sphere (indigo) */}
        <div 
          ref={sphere2Ref}
          className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-indigo-600/35 to-blue-400/35 opacity-40 filter blur-[70px] pointer-events-none"
          style={{
            borderRadius: '50%',
            transform: 'translate(calc(50% + 200px), calc(50% - 200px))',
            willChange: 'transform, border-radius',
            transition: 'all 0.7s cubic-bezier(0.33, 1, 0.68, 1)'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full grid md:grid-cols-2 p-5 md:p-10 items-center">
        <div className="relative w-full">
          <h1 className="block text-4xl md:text-5xl w-3/4 mb-5 font-bold text-white">
            NOKKU TECH <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              Dual-Origin Fluid Spheres
            </span>
          </h1>
          <p className="text-gray-300 text-sm md:text-base">
            Watch the fluid spheres emerge from opposite corners and interact with your cursor movements.
          </p>
        </div>
        <div className="relative">
          <img
            src="illustration.webp"
            alt="Technology Illustration"
            className="relative z-10 h-full mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default FluidSpheres;