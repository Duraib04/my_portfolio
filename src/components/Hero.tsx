import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import { useState, useEffect } from "react";

const Hero = () => {
  const roles = [
    "Full Stack Developer",
    "IoT Enthusiast",
    "AI/ML Explorer",
    "Cloud Developer",
    "Problem Solver"
  ];
  
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Profile Image */}
          <div className="mb-8 relative inline-block group">
            <div className="w-40 h-40 mx-auto rounded-lg overflow-hidden border-4 border-blue-500/50 shadow-2xl transition-all duration-300 cursor-pointer" style={{ imageRendering: 'pixelated' }}>
              <img
                src="/lovable-uploads/7c8c0018-8c23-43ff-8716-c4b7883416a1.png"
                alt="Durai B Profile"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded flex items-center justify-center shadow-lg">
              <div className="w-3 h-3 bg-white rounded-sm"></div>
            </div>
          </div>

          {/* Name and Title */}
          <h1 
            className="text-6xl md:text-8xl font-bold mb-4 text-gradient cursor-default"
            style={{ textShadow: '0 0 40px rgba(65, 105, 225, 0.3)' }}
          >
            Durai B
          </h1>
          
          {/* Role text */}
          <div className="h-16 mb-2">
            <p className="text-xl md:text-2xl text-blue-200/80">
              <span className="inline-block" key={currentRole}>
                {roles[currentRole]}
              </span>
            </p>
          </div>
          
          <p className="text-lg text-slate-300/70 mb-8">
            Passionate about Technology, Web Development & Innovation
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white border-0 hover:scale-105 transition-all duration-200 shadow-lg shadow-blue-500/30 font-semibold"
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
              className="border-blue-500/50 bg-transparent text-blue-200 hover:bg-blue-500/10 hover:scale-105 transition-all duration-200"
            >
              <a href="/Durai B-3.pdf" download>
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </a>
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6">
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-lg glass-card border-blue-500/30 hover:border-blue-400 transition-all duration-200 hover:scale-110"
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
              className="w-12 h-12 rounded-lg glass-card border-blue-500/30 hover:border-blue-400 transition-all duration-200 hover:scale-110"
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
              className="w-12 h-12 rounded-lg glass-card border-blue-500/30 hover:border-blue-400 transition-all duration-200 hover:scale-110"
            >
              <a href="mailto:itsdurai4@gmail.com">
                <Mail className="h-6 w-6 text-blue-200" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 rounded-lg border-2 border-blue-500/50 flex justify-center pt-2">
          <div className="w-1 h-3 bg-blue-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
