import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download, Crown } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const Hero = () => {
  const roles = [
    "Full Stack Developer",
    "IoT Enthusiast",
    "AI/ML Explorer",
    "Cloud Developer",
    "Problem Solver"
  ];
  
  const [currentRole, setCurrentRole] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden parallax-section">
      {/* Royal Background elements with parallax */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating royal orbs */}
        <div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-blue-500/20 via-blue-600/10 to-transparent blur-3xl animate-royal-float"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-600/20 via-blue-500/10 to-transparent blur-3xl animate-royal-float animation-delay-1000"
          style={{ transform: `translateY(${scrollY * -0.2}px)` }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-amber-500/5 blur-3xl"
          style={{ transform: `translate(-50%, -50%) scale(${1 + scrollY * 0.0005})` }}
        />
        
        {/* Royal decorative blocks */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-4 h-4 bg-gradient-to-br from-blue-400/30 to-blue-600/20 rounded-sm rotate-45 ${isVisible ? 'animate-block-build' : 'opacity-0'}`}
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.15}s`,
              transform: `translateY(${scrollY * (0.1 + i * 0.05)}px) rotate(45deg)`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Profile Image with Royal Crown */}
          <div className={`mb-8 relative inline-block group ${isVisible ? 'animate-block-stack' : 'opacity-0'}`}>
            <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-blue-500/50 shadow-2xl transition-all duration-300 cursor-pointer animate-crown-glow">
              <img
                src="/lovable-uploads/7c8c0018-8c23-43ff-8716-c4b7883416a1.png"
                alt="Durai B Profile"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            {/* Royal crown indicator */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg animate-royal-float">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Name and Title with Block Animation */}
          <h1 
            className={`text-6xl md:text-8xl font-bold mb-4 text-gradient cursor-default ${isVisible ? 'animate-block-build' : 'opacity-0'}`}
            style={{ 
              animationDelay: '0.3s',
              textShadow: '0 0 40px rgba(65, 105, 225, 0.3)'
            }}
          >
            Durai B
          </h1>
          
          {/* Role text with parallax */}
          <div 
            className={`h-16 mb-2 ${isVisible ? 'animate-block-slide' : 'opacity-0'}`}
            style={{ 
              animationDelay: '0.5s',
              transform: `translateY(${scrollY * -0.1}px)`
            }}
          >
            <p className="text-xl md:text-2xl text-blue-200/80">
              <span className="inline-block" key={currentRole}>
                {roles[currentRole]}
              </span>
            </p>
          </div>
          
          <p 
            className={`text-lg text-slate-300/70 mb-8 ${isVisible ? 'animate-block-build' : 'opacity-0'}`}
            style={{ animationDelay: '0.7s' }}
          >
            Passionate about Technology, Web Development & Innovation
          </p>

          {/* CTA Buttons with Royal styling */}
          <div 
            className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 ${isVisible ? 'animate-block-assemble' : 'opacity-0'}`}
            style={{ animationDelay: '0.9s' }}
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white border-0 hover:scale-105 transition-all duration-200 group shadow-lg shadow-blue-500/30 font-semibold"
            >
              <a href="mailto:itsdurai4@gmail.com">
                <Mail className="mr-2 h-5 w-5" />
                Get In Touch
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="royal-border bg-transparent text-blue-200 hover:bg-blue-500/10 hover:scale-105 transition-all duration-200 group"
            >
              <a href="/Durai B-3.pdf" download>
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </a>
            </Button>
          </div>

          {/* Social Links with Royal styling */}
          <div 
            className={`flex justify-center gap-6 ${isVisible ? 'animate-block-build' : 'opacity-0'}`}
            style={{ animationDelay: '1.1s' }}
          >
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-full glass-card border-blue-500/30 hover:border-blue-400 hover:glow-primary transition-all duration-200 hover:scale-110 group"
            >
              <a
                href="https://github.com/DD4universe"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-6 w-6 text-blue-200" />
              </a>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-full glass-card border-blue-500/30 hover:border-blue-400 hover:glow-primary transition-all duration-200 hover:scale-110 group"
            >
              <a
                href="https://www.linkedin.com/in/durai-b-473058323/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-6 w-6 text-blue-200" />
              </a>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-full glass-card border-amber-500/30 hover:border-amber-400 hover:glow-accent transition-all duration-200 hover:scale-110 group"
            >
              <a href="mailto:itsdurai4@gmail.com">
                <Mail className="h-6 w-6 text-amber-200" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator with royal styling */}
      <div 
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 ${isVisible ? 'animate-block-build' : 'opacity-0'}`}
        style={{ animationDelay: '1.3s' }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-blue-500/50 flex justify-center pt-2">
          <div className="w-1 h-3 bg-blue-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
