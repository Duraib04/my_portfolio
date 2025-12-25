import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download } from "lucide-react";

const Hero = () => {
  const roles = [
    "Full Stack Developer 💻",
    "IoT Enthusiast 🔌",
    "AI/ML Explorer 🤖",
    "Cloud Developer ☁️",
    "Problem Solver 🎯"
  ];

  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [roles.length]);
  
  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/10 blur-3xl"></div>
      </div>

      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Profile Image */}
          <div className="mb-8 relative inline-block group">
            <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl transition-all duration-300 cursor-pointer">
              <img
                src="/lovable-uploads/7c8c0018-8c23-43ff-8716-c4b7883416a1.png"
                alt="Durai B Profile"
                className="w-full h-full object-cover transition-transform duration-300"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>

          {/* Name and Title */}
          <h1 className="text-6xl md:text-8xl font-bold mb-4 text-gradient cursor-default">
            Durai B
          </h1>
          
          {/* Single role with morphing backdrop and transition */}
          <div className="h-12 md:h-14 mb-10 overflow-hidden relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="morph-blob" aria-hidden />
              <div className="morph-blob morph-blob--secondary" aria-hidden />
            </div>
            <div className="relative">
              <div
                key={roleIndex}
                className="inline-flex items-center justify-center px-4 md:px-5 py-2 rounded-full border border-accent/40 bg-gradient-to-r from-[#120c2c]/80 via-primary/15 to-accent/20 text-sm md:text-base font-semibold text-accent shadow-[0_0_20px_rgba(255,199,94,0.18)] role-fade"
              >
                {roles[roleIndex]}
              </div>
            </div>
          </div>
          
          <p className="text-lg text-muted-foreground mb-8">
            Passionate about Technology, Web Development & Innovation
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              asChild
              size="lg"
              className="hero-gradient text-white border-0 hover:scale-105 transition-all duration-200 group"
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
              className="glass-card border-primary/30 hover:bg-primary/10 hover:scale-105 transition-all duration-200 group"
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
              className="w-12 h-12 rounded-full glass-card hover:glow-primary transition-all duration-200 hover:scale-110 group"
            >
              <a
                href="https://github.com/DD4universe"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-6 w-6" />
              </a>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-full glass-card hover:glow-primary transition-all duration-200 hover:scale-110 group"
            >
              <a
                href="https://www.linkedin.com/in/durai-b-473058323/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-full glass-card hover:glow-primary transition-all duration-200 hover:scale-110 group"
            >
              <a href="mailto:itsdurai4@gmail.com">
                <Mail className="h-6 w-6" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
