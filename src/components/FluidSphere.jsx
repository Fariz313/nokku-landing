const FluidSphere = ({ 
  ref, 
  position, 
  gradientFrom, 
  gradientTo, 
  blur, 
  size = 500,
  style 
}) => {
  return (
    <div 
      ref={ref}
      className={`absolute w-[${size}px] h-[${size}px] bg-gradient-to-br ${gradientFrom} ${gradientTo} opacity-30 filter blur-[${blur}px] pointer-events-none`}
      style={{
        borderRadius: '50%',
        transform: position,
        willChange: 'transform, border-radius',
        transition: 'all 0.5s cubic-bezier(0.33, 1, 0.68, 1)',
        ...style
      }}
    />
  );
};

export default FluidSphere;