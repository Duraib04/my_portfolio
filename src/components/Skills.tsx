import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
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
    if (level >= 80) return "bg-primary";
    if (level >= 70) return "bg-accent";
    return "bg-secondary";
  };

  const getCertificationColor = (type: string) => {
    switch (type) {
      case "AI/ML": return "bg-accent/20 text-accent border-accent/30";
      case "Web Dev": return "bg-primary/20 text-primary border-primary/30";
      case "Programming": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Hardware": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      default: return "bg-secondary/20 text-secondary-foreground border-secondary/30";
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Skills & Expertise</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive skill set spanning web development, programming, and emerging technologies
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <Card 
              key={categoryIndex} 
              className="glass-card border-primary/20 hover:glow-primary transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 group relative overflow-hidden"
              style={{
                animation: `fadeInUp 0.6s ease-out ${categoryIndex * 0.15}s both`
              }}
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <CardHeader>
                <CardTitle className="text-xl text-primary group-hover:scale-105 transition-transform duration-300 transform-gpu relative z-10">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skillIndex} 
                    className="space-y-2 group/skill hover:translate-x-2 transition-transform duration-300"
                    style={{
                      animation: `slideInLeft 0.5s ease-out ${skillIndex * 0.1}s both`
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium group-hover/skill:text-primary transition-colors duration-300">{skill.name}</span>
                      <span className="text-sm text-muted-foreground group-hover/skill:text-primary transition-colors duration-300 font-bold">{skill.level}%</span>
                    </div>
                    <div className="relative">
                      <Progress 
                        value={skill.level} 
                        className="h-2 group-hover/skill:h-3 transition-all duration-300"
                      />
                      {/* Animated glow effect on hover */}
                      <div 
                        className="absolute inset-0 bg-gradient-to-r from-primary/50 to-accent/50 opacity-0 group-hover/skill:opacity-50 blur-sm transition-opacity duration-300 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Certifications */}
        <Card className="glass-card border-primary/20 hover:glow-primary transition-all duration-500 relative overflow-hidden group">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <CardHeader>
            <CardTitle className="text-2xl text-center text-gradient group-hover:scale-105 transition-transform duration-300 relative z-10">Certifications</CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {certifications.map((cert, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-lg bg-secondary/30 hover:bg-gradient-to-br hover:from-primary/10 hover:to-accent/10 transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:rotate-1 cursor-pointer border border-transparent hover:border-primary/30 hover:shadow-xl hover:shadow-primary/20 group/cert relative overflow-hidden"
                  style={{
                    animation: `fadeInScale 0.5s ease-out ${index * 0.1}s both`
                  }}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/cert:translate-x-full transition-transform duration-700"></div>
                  
                  <div className="flex justify-between items-start mb-2">
                    <Badge className={`${getCertificationColor(cert.type)} group-hover/cert:scale-110 transition-transform duration-300`}>
                      {cert.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground group-hover/cert:text-primary transition-colors duration-300 font-semibold">{cert.date}</span>
                  </div>
                  <h4 className="font-semibold text-sm mb-1 leading-tight group-hover/cert:text-primary transition-colors duration-300">{cert.title}</h4>
                  <p className="text-xs text-muted-foreground group-hover/cert:text-foreground transition-colors duration-300">{cert.organization}</p>
                  
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-r-[20px] border-t-primary/0 border-r-transparent group-hover/cert:border-t-primary/20 transition-all duration-300"></div>
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