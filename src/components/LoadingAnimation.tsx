import { useEffect, useState } from "react";

const LoadingAnimation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [phase, setPhase] = useState(0); // 0: title reveal, 1: name reveal, 2: fade out

  useEffect(() => {
    // Phase 0: Title reveal animation (~0.9s)
    const titleTimer = setTimeout(() => setPhase(1), 900);
    
    // Phase 1: Name reveal animation (~1.9s total)
    const nameTimer = setTimeout(() => setPhase(2), 1900);
    
    // Phase 2: Fade out and complete (~3.0s total)
    const completeTimer = setTimeout(() => setIsLoading(false), 3000);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(nameTimer);
      clearTimeout(completeTimer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Diagonal speed lines (anime effect) */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute h-px bg-gradient-to-r from-transparent via-primary to-transparent ${
              phase >= 2 ? 'opacity-0' : 'opacity-30'
            }`}
            style={{
              width: '200%',
              top: `${i * 7}%`,
              left: '-100%',
              transform: 'rotate(-25deg)',
              animation: `slideRight ${0.8 + i * 0.05}s ease-out forwards`,
              animationDelay: `${i * 0.05}s`
            }}
          />
        ))}
      </div>

      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Anime-style title reveal */}
        <div className="mb-8 overflow-hidden">
          <h1 
            className={`text-7xl md:text-9xl font-bold text-white tracking-wider transition-all duration-1000 ${
              phase >= 0 ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            }`}
            style={{
              textShadow: '0 0 20px rgba(147, 51, 234, 0.5), 0 0 40px rgba(147, 51, 234, 0.3)',
              fontFamily: 'monospace'
            }}
          >
            PORTFOLIO
          </h1>
        </div>

        {/* Name reveal with glitch effect */}
        <div className="relative mb-12">
          <div 
            className={`text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent transition-all duration-700 ${
              phase >= 1 ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-20 opacity-0 scale-90'
            }`}
            style={{
              filter: phase >= 1 ? 'none' : 'blur(10px)'
            }}
          >
            DURAI B
          </div>
          
          {/* Glitch layers */}
          {phase >= 1 && phase < 2 && (
            <>
              <div 
                className="absolute inset-0 text-4xl md:text-6xl font-bold text-red-500 opacity-50"
                style={{
                  animation: 'glitch1 0.3s infinite',
                  clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)'
                }}
              >
                DURAI B
              </div>
              <div 
                className="absolute inset-0 text-4xl md:text-6xl font-bold text-blue-500 opacity-50"
                style={{
                  animation: 'glitch2 0.3s infinite',
                  clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)'
                }}
              >
                DURAI B
              </div>
            </>
          )}
        </div>

        {/* Progress bar with anime style */}
        <div 
          className={`relative w-64 h-1 bg-gray-800 rounded-full overflow-hidden transition-all duration-500 ${
            phase >= 2 ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
          }`}
        >
          <div 
            className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-blue-500"
            style={{
              animation: 'progressFill 2.2s ease-in-out forwards'
            }}
          />
          {/* Glowing effect */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-white/50 via-white/30 to-transparent"
            style={{
              animation: 'shimmerProgress 1.5s infinite'
            }}
          />
        </div>

        {/* Loading text */}
        <div 
          className={`mt-6 text-lg text-gray-400 tracking-widest transition-all duration-500 ${
            phase >= 2 ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {phase === 0 && 'INITIALIZING...'}
          {phase === 1 && 'LOADING EXPERIENCE...'}
          {phase >= 2 && 'READY!'}
        </div>
      </div>

      {/* Hexagon geometric patterns */}
      <div className="absolute bottom-10 left-10">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute border-2 border-primary/30"
            style={{
              width: `${80 + i * 30}px`,
              height: `${80 + i * 30}px`,
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
              animation: `spin ${10 + i * 2}s linear infinite`,
              animationDelay: `${i * 0.3}s`,
              opacity: phase >= 2 ? 0 : 0.3
            }}
          />
        ))}
      </div>

      {/* Circle geometric patterns */}
      <div className="absolute top-10 right-10">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute border-2 border-blue-500/30 rounded-full"
            style={{
              width: `${60 + i * 25}px`,
              height: `${60 + i * 25}px`,
              animation: `spin ${8 - i * 2}s linear infinite reverse`,
              animationDelay: `${i * 0.2}s`,
              opacity: phase >= 2 ? 0 : 0.4
            }}
          />
        ))}
      </div>

      {/* Fade out overlay */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-700 ${
          phase >= 2 ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <style>{`
        @keyframes slideRight {
          from {
            transform: translateX(0) rotate(-25deg);
          }
          to {
            transform: translateX(100vw) rotate(-25deg);
          }
        }

        @keyframes progressFill {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes shimmerProgress {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes glitch1 {
          0%, 100% {
            transform: translate(0);
          }
          25% {
            transform: translate(-2px, 2px);
          }
          50% {
            transform: translate(2px, -2px);
          }
          75% {
            transform: translate(-2px, -2px);
          }
        }

        @keyframes glitch2 {
          0%, 100% {
            transform: translate(0);
          }
          25% {
            transform: translate(2px, -2px);
          }
          50% {
            transform: translate(-2px, 2px);
          }
          75% {
            transform: translate(2px, 2px);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingAnimation;