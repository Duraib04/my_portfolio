import { useEffect, useState } from "react";

const LoadingAnimation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 300);
          return 100;
        }
        return prev + Math.random() * 30;
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <div className="relative">
        {/* Main loader container */}
        <div className="relative w-80 h-80">
          {/* Animated rings */}
          <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-ping" />
          <div className="absolute inset-4 rounded-full border-4 border-accent/30 animate-ping animation-delay-200" />
          <div className="absolute inset-8 rounded-full border-4 border-primary/40 animate-ping animation-delay-400" />
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* Logo/Name with gradient */}
            <div className="text-5xl font-bold text-gradient mb-4 animate-pulse">
              DB
            </div>
            
            {/* Loading text */}
            <div className="text-lg text-muted-foreground mb-8 animate-fade-in">
              Loading Portfolio
            </div>
            
            {/* Progress bar */}
            <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full hero-gradient transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            {/* Progress percentage */}
            <div className="mt-3 text-sm text-muted-foreground">
              {Math.round(progress)}%
            </div>
          </div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute -top-10 -left-10 w-4 h-4 bg-primary/50 rounded-full animate-float" />
        <div className="absolute -top-5 -right-8 w-3 h-3 bg-accent/50 rounded-full animate-float animation-delay-1000" />
        <div className="absolute -bottom-8 -left-6 w-5 h-5 bg-primary/30 rounded-full animate-float animation-delay-2000" />
        <div className="absolute -bottom-10 -right-10 w-4 h-4 bg-accent/40 rounded-full animate-float animation-delay-500" />
      </div>
    </div>
  );
};

export default LoadingAnimation;