import { useEffect, useState } from "react";
import { Crown } from "lucide-react";

const LoadingAnimation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [phase, setPhase] = useState(0); // 0: blocks build, 1: name reveal, 2: fade out
  const [blocks, setBlocks] = useState<boolean[]>(Array(12).fill(false));

  useEffect(() => {
    // Animate blocks building one by one
    blocks.forEach((_, i) => {
      setTimeout(() => {
        setBlocks(prev => {
          const newBlocks = [...prev];
          newBlocks[i] = true;
          return newBlocks;
        });
      }, i * 100);
    });

    // Phase 0: Blocks build (1.2s)
    const titleTimer = setTimeout(() => setPhase(1), 1200);
    
    // Phase 1: Name reveal animation (2.5s total)
    const nameTimer = setTimeout(() => setPhase(2), 2500);
    
    // Phase 2: Fade out and complete (3.5s total)
    const completeTimer = setTimeout(() => setIsLoading(false), 3500);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(nameTimer);
      clearTimeout(completeTimer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-[#0a0612] via-[#0d0818] to-[#050208] overflow-hidden">
      {/* Royal animated background particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              background: i % 2 === 0 ? 'linear-gradient(135deg, #ffd700, #ffb347)' : 'linear-gradient(135deg, #9333ea, #7c3aed)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.6,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Royal diagonal speed lines */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute h-px ${
              phase >= 2 ? 'opacity-0' : 'opacity-40'
            }`}
            style={{
              width: '200%',
              top: `${i * 7}%`,
              left: '-100%',
              transform: 'rotate(-25deg)',
              background: `linear-gradient(90deg, transparent, ${i % 2 === 0 ? '#ffd700' : '#9333ea'}, transparent)`,
              animation: `slideRight ${0.8 + i * 0.05}s ease-out forwards`,
              animationDelay: `${i * 0.05}s`
            }}
          />
        ))}
      </div>

      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Block Building Animation */}
        <div className="mb-8 grid grid-cols-4 gap-2">
          {blocks.map((visible, i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-sm transition-all duration-300 ${
                visible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
              }`}
              style={{
                background: i % 3 === 0 
                  ? 'linear-gradient(135deg, #ffd700, #f59e0b)' 
                  : i % 3 === 1 
                  ? 'linear-gradient(135deg, #9333ea, #7c3aed)'
                  : 'linear-gradient(135deg, #3b82f6, #2563eb)',
                boxShadow: visible ? `0 4px 15px ${i % 3 === 0 ? 'rgba(255, 215, 0, 0.4)' : i % 3 === 1 ? 'rgba(147, 51, 234, 0.4)' : 'rgba(59, 130, 246, 0.4)'}` : 'none',
                transform: visible ? 'translateY(0) rotate(0deg)' : 'translateY(-50px) rotate(-15deg)',
                transitionDelay: `${i * 50}ms`
              }}
            />
          ))}
        </div>

        {/* Royal title reveal with crown */}
        <div className="mb-4 overflow-hidden flex items-center gap-4">
          <Crown 
            className={`w-12 h-12 text-yellow-400 transition-all duration-1000 ${
              phase >= 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
            style={{
              filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.5))'
            }}
          />
          <h1 
            className={`text-5xl md:text-7xl font-bold tracking-wider transition-all duration-1000 ${
              phase >= 0 ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            }`}
            style={{
              background: 'linear-gradient(135deg, #ffd700, #f59e0b, #ffd700)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 30px rgba(255, 215, 0, 0.3)',
              fontFamily: 'serif'
            }}
          >
            PORTFOLIO
          </h1>
          <Crown 
            className={`w-12 h-12 text-yellow-400 transition-all duration-1000 ${
              phase >= 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
            style={{
              filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.5))'
            }}
          />
        </div>

        {/* Name reveal with royal effect */}
        <div className="relative mb-12">
          <div 
            className={`text-4xl md:text-6xl font-bold transition-all duration-700 ${
              phase >= 1 ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-20 opacity-0 scale-90'
            }`}
            style={{
              background: 'linear-gradient(135deg, #ffd700, #9333ea, #3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: phase >= 1 ? 'none' : 'blur(10px)'
            }}
          >
            DURAI B
          </div>
          
          {/* Royal glitch layers */}
          {phase >= 1 && phase < 2 && (
            <>
              <div 
                className="absolute inset-0 text-4xl md:text-6xl font-bold text-yellow-400 opacity-30"
                style={{
                  animation: 'glitch1 0.3s infinite',
                  clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)'
                }}
              >
                DURAI B
              </div>
              <div 
                className="absolute inset-0 text-4xl md:text-6xl font-bold text-purple-500 opacity-30"
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

        {/* Royal progress bar */}
        <div 
          className={`relative w-64 h-2 bg-purple-950/50 rounded-full overflow-hidden transition-all duration-500 ${
            phase >= 2 ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
          }`}
          style={{
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.2)'
          }}
        >
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(90deg, #ffd700, #9333ea, #3b82f6)',
              animation: 'progressFill 2.5s ease-in-out forwards'
            }}
          />
          {/* Royal shimmer effect */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
            style={{
              animation: 'shimmerProgress 1.5s infinite'
            }}
          />
        </div>

        {/* Loading text with royal styling */}
        <div 
          className={`mt-6 text-lg tracking-widest transition-all duration-500 ${
            phase >= 2 ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            color: phase === 0 ? '#ffd700' : phase === 1 ? '#9333ea' : '#22c55e'
          }}
        >
          {phase === 0 && '⚔️ ASSEMBLING BLOCKS...'}
          {phase === 1 && '👑 PREPARING ROYAL EXPERIENCE...'}
          {phase >= 2 && '✨ READY!'}
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