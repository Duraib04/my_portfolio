import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState, useRef } from "react";
import { Crown, Award, Star } from "lucide-react";

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const skillCategories = [
    {
      title: "Programming Languages",
      icon: "👑",
      skills: [
        { name: "Python", level: 85 },
        { name: "C", level: 80 },
        { name: "JavaScript", level: 75 },
        { name: "HTML/CSS", level: 90 },
        { name: "SQL", level: 70 }
      ]
    },
    {
      title: "Web Development",
      icon: "⚔️",
      skills: [
        { name: "React", level: 80 },
        { name: "Node.js", level: 75 },
        { name: "Responsive Design", level: 85 },
        { name: "RESTful APIs", level: 70 },
        { name: "Database Design", level: 75 }
      ]
    },
    {
      title: "Cloud & Data Tools",
      icon: "🏰",
      skills: [
        { name: "AWS", level: 70 },
        { name: "Excel", level: 85 },
        { name: "MATLAB", level: 65 },
        { name: "IoT Development", level: 70 },
        { name: "Data Analysis", level: 75 }
      ]
    },
    {
      title: "Software & Productivity",
      icon: "🛡️",
      skills: [
        { name: "Microsoft Office", level: 90 },
        { name: "Canva", level: 80 },
        { name: "UI/UX Design", level: 70 },
        { name: "Project Management", level: 75 },
        { name: "Version Control (Git)", level: 80 }
      ]
    }
  ];

  const certifications = [
    {
      title: "Programming Foundation",
      organization: "INFOSYS SPRINGBOARD",
      date: "2025",
      type: "Foundation"
    },
    {
      title: "Programming Fundamentals using Python: Part 1",
      organization: "INFOSYS SPRINGBOARD",
      date: "2025",
      type: "Programming"
    },
    {
      title: "Machine Learning Durang",
      organization: "Sanmish Holdings Inc",
      date: "2025",
      type: "AI/ML"
    },
    {
      title: "IoT Microcontrollers",
      organization: "FreeRTOS Simulator",
      date: "2024",
      type: "Hardware"
    },
    {
      title: "Generative AI Mega Workshop 2.0",
      organization: "NAT WAVE",
      date: "2024",
      type: "AI/ML"
    },
    {
      title: "Static Website Design",
      organization: "NAT WAVE",
      date: "2024",
      type: "Web Dev"
    },
    {
      title: "Responsive Website Design",
      organization: "Sanmish Holdings Inc",
      date: "2024",
      type: "Web Dev"
    }
  ];

  const getSkillColor = (level: number) => {
    if (level >= 80) return "bg-gradient-to-r from-yellow-500 to-amber-500";
    if (level >= 70) return "bg-gradient-to-r from-purple-500 to-violet-500";
    return "bg-gradient-to-r from-blue-500 to-indigo-500";
  };

  const getCertificationColor = (type: string) => {
    switch (type) {
      case "AI/ML": return "bg-purple-500/20 text-purple-300 border-purple-500/40";
      case "Web Dev": return "bg-yellow-500/20 text-yellow-300 border-yellow-500/40";
      case "Programming": return "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
      case "Hardware": return "bg-orange-500/20 text-orange-300 border-orange-500/40";
      default: return "bg-blue-500/20 text-blue-300 border-blue-500/40";
    }
  };

  return (
    <section ref={sectionRef} className="py-20 px-4 parallax-section relative overflow-hidden">
      {/* Royal background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-20 left-10 w-32 h-32 rounded-full bg-yellow-500/10 blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        />
        <div 
          className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-purple-500/10 blur-3xl"
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        />
      </div>

      <div className="container mx-auto relative z-10">
        <div className={`text-center mb-16 ${isVisible ? 'parallax-up' : 'opacity-0'}`}>
          <div className="flex items-center justify-center gap-4 mb-4">
            <Crown className="w-8 h-8 text-yellow-400" />
            <h2 className="text-4xl md:text-5xl font-bold text-gradient">Skills & Expertise</h2>
            <Crown className="w-8 h-8 text-yellow-400" />
          </div>
          <p className="text-xl text-purple-200/70 max-w-3xl mx-auto">
            A comprehensive skill set spanning web development, programming, and emerging technologies
          </p>
        </div>

        {/* Skills Grid with block building animation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <Card 
              key={categoryIndex} 
              className={`royal-card border-yellow-500/20 hover:border-yellow-400/40 transition-all duration-300 group hover:shadow-lg hover:shadow-yellow-500/10 ${
                isVisible ? 'animate-block-build' : 'opacity-0'
              }`}
              style={{ animationDelay: `${categoryIndex * 0.15}s` }}
            >
              <CardHeader>
                <CardTitle className="text-xl text-yellow-300 flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skillIndex} 
                    className={`space-y-2 ${isVisible ? 'animate-block-slide' : 'opacity-0'}`}
                    style={{ animationDelay: `${(categoryIndex * 0.15) + (skillIndex * 0.1)}s` }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-yellow-100/90">{skill.name}</span>
                      <span className="text-sm text-yellow-400 font-bold">{skill.level}%</span>
                    </div>
                    <div className="relative h-2 bg-purple-950/50 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getSkillColor(skill.level)} rounded-full transition-all duration-1000`}
                        style={{ 
                          width: isVisible ? `${skill.level}%` : '0%',
                          transitionDelay: `${(categoryIndex * 0.15) + (skillIndex * 0.1) + 0.5}s`,
                          boxShadow: skill.level >= 80 ? '0 0 10px rgba(255, 215, 0, 0.5)' : 'none'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Certifications with royal styling */}
        <Card 
          className={`royal-card border-yellow-500/20 hover:border-yellow-400/40 transition-all duration-300 ${
            isVisible ? 'parallax-zoom' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.6s' }}
        >
          <CardHeader>
            <CardTitle className="text-2xl text-center flex items-center justify-center gap-3">
              <Award className="w-6 h-6 text-yellow-400" />
              <span className="text-gradient">Royal Certifications</span>
              <Award className="w-6 h-6 text-yellow-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {certifications.map((cert, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg bg-purple-950/30 hover:bg-yellow-500/10 transition-all duration-300 cursor-pointer border border-yellow-500/10 hover:border-yellow-400/40 group ${
                    isVisible ? 'animate-block-assemble' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${0.8 + (index * 0.1)}s` }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <Badge className={`${getCertificationColor(cert.type)}`}>
                      {cert.type}
                    </Badge>
                    <span className="text-xs text-yellow-400/70 font-semibold flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {cert.date}
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm mb-1 leading-tight text-yellow-100 group-hover:text-yellow-300 transition-colors">{cert.title}</h4>
                  <p className="text-xs text-purple-300/70">{cert.organization}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Skills;