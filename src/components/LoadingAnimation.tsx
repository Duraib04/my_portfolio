import { useEffect, useState } from "react";

const LoadingAnimation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [blocks, setBlocks] = useState<boolean[]>(Array(9).fill(false));

  useEffect(() => {
    // Animate blocks building one by one (Minecraft style)
    blocks.forEach((_, i) => {
      setTimeout(() => {
        setBlocks(prev => {
          const newBlocks = [...prev];
          newBlocks[i] = true;
          return newBlocks;
        });
      }, i * 150);
    });

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    // Complete loading after animation
    const completeTimer = setTimeout(() => setIsLoading(false), 3000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(completeTimer);
    };
  }, []);

  if (!isLoading) return null;

  // Minecraft block colors
  const blockColors = [
    'bg-green-600', // Grass
    'bg-amber-700', // Dirt
    'bg-gray-500',  // Stone
    'bg-cyan-400',  // Diamond
    'bg-yellow-500', // Gold
    'bg-red-600',   // Redstone
    'bg-green-600', // Grass
    'bg-amber-700', // Dirt
    'bg-gray-500',  // Stone
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-b from-sky-400 via-sky-500 to-green-800 overflow-hidden">
      {/* Pixelated clouds */}
      <div className="absolute top-10 left-20 flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-8 h-8 bg-white/90" />
        ))}
      </div>
      <div className="absolute top-16 left-24 flex gap-1">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="w-8 h-8 bg-white/90" />
        ))}
      </div>

      <div className="absolute top-20 right-32 flex gap-1">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-6 h-6 bg-white/80" />
        ))}
      </div>

      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Block Building Grid - Minecraft style */}
        <div className="mb-8 grid grid-cols-3 gap-1">
          {blocks.map((visible, i) => (
            <div
              key={i}
              className={`w-12 h-12 transition-all duration-300 ${blockColors[i]} ${
                visible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
              }`}
              style={{
                boxShadow: visible ? 'inset -2px -2px 0 rgba(0,0,0,0.3), inset 2px 2px 0 rgba(255,255,255,0.2)' : 'none',
                transform: visible ? 'translateY(0)' : 'translateY(-30px)',
                transitionDelay: `${i * 80}ms`
              }}
            />
          ))}
        </div>

        {/* Title */}
        <h1 
          className="text-4xl md:text-5xl font-bold mb-2 text-white tracking-wider"
          style={{
            textShadow: '3px 3px 0 #1a1a1a, -1px -1px 0 #1a1a1a',
            fontFamily: 'monospace'
          }}
        >
          DURAI B
        </h1>
        
        <p 
          className="text-xl text-white/90 mb-8"
          style={{
            textShadow: '2px 2px 0 #1a1a1a',
            fontFamily: 'monospace'
          }}
        >
          Portfolio
        </p>

        {/* Minecraft-style progress bar */}
        <div className="relative w-64 h-6 bg-gray-800 border-2 border-gray-900">
          {/* Progress fill */}
          <div 
            className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-100"
            style={{ 
              width: `${progress}%`,
              boxShadow: 'inset 0 -2px 0 rgba(0,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.2)'
            }}
          />
          {/* Pixel grid overlay */}
          <div className="absolute inset-0 flex">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="flex-1 border-r border-gray-900/30 last:border-r-0" />
            ))}
          </div>
        </div>

        {/* Loading text */}
        <p 
          className="mt-4 text-white text-sm tracking-widest"
          style={{
            textShadow: '1px 1px 0 #1a1a1a',
            fontFamily: 'monospace'
          }}
        >
          {progress < 100 ? 'BUILDING WORLD...' : 'READY!'}
        </p>
      </div>

      {/* Ground blocks */}
      <div className="absolute bottom-0 left-0 right-0 flex">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="flex flex-col">
            <div className="w-10 h-10 bg-green-600" style={{ boxShadow: 'inset -2px -2px 0 rgba(0,0,0,0.3)' }} />
            <div className="w-10 h-10 bg-amber-700" style={{ boxShadow: 'inset -2px -2px 0 rgba(0,0,0,0.3)' }} />
          </div>
        ))}
      </div>

      {/* Fade out overlay */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-500 ${
          progress >= 100 ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};

export default LoadingAnimation;