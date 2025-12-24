import { useEffect, useState } from "react";

const LoadingAnimation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 3;
      });
    }, 40);

    // Complete loading after animation
    const completeTimer = setTimeout(() => setIsLoading(false), 2000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(completeTimer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-[#0a0a1a] via-[#0d1025] to-[#050510]">
      {/* Main content container */}
      <div className="flex flex-col items-center">
        {/* Logo/Initial */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
          <span className="text-4xl font-bold text-white">D</span>
        </div>

        {/* Name */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Durai B
        </h1>
        
        <p className="text-blue-300/70 mb-8">Portfolio</p>

        {/* Progress bar */}
        <div className="w-48 h-1 bg-blue-950/50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-100 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading text */}
        <p className="mt-4 text-blue-400/70 text-sm">
          {progress < 100 ? 'Loading...' : 'Ready'}
        </p>
      </div>

      {/* Fade out overlay */}
      <div 
        className={`absolute inset-0 bg-[#0a0a1a] transition-opacity duration-500 pointer-events-none ${
          progress >= 100 ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};

export default LoadingAnimation;