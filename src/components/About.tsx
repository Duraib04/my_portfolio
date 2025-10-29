import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Database, Globe, Smartphone } from "lucide-react";

const About = () => {
  const interests = [
    "Developing Technology-Driven Mini Projects",
    "Transforming Data/Interface and Database Design",
    "Full Stack Development & Cloud Computing",
    "AI/ML Implementation",
    "Project-based Learning"
  ];

  const languages = [
    { name: "Tamil", level: "Native" },
    { name: "English", level: "Intermediate" }
  ];

  const focusAreas = [
    {
      icon: <Code2 className="h-8 w-8" />,
      title: "Web Development",
      description: "Full-stack development with modern frameworks and technologies"
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Data & AI",
      description: "Machine learning, data analysis, and AI implementation"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Cloud Computing",
      description: "AWS, cloud architectures, and scalable solutions"
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "IoT Projects",
      description: "Hardware integration and embedded systems"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A highly motivated technology enthusiast with practical experience in web development, 
            foundational computing, and project-based learning.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Objective */}
          <Card className="glass-card border-primary/20 hover:glow-primary transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 group relative overflow-hidden"
            style={{ animation: 'fadeInUp 0.6s ease-out 0.1s both' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <CardContent className="p-8 relative z-10">
              <h3 className="text-2xl font-bold mb-4 text-primary group-hover:scale-105 transition-transform duration-300">Objective</h3>
              <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                Committed to leveraging innovative technologies to 
                develop efficient, scalable solutions through 
                self-driven projects and continuous exploration. 
                Passionate about turning ideas into reality through code.
              </p>
            </CardContent>
          </Card>

          {/* Languages */}
          <Card className="glass-card border-primary/20 hover:glow-accent transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 group relative overflow-hidden"
            style={{ animation: 'fadeInUp 0.6s ease-out 0.2s both' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <CardContent className="p-8 relative z-10">
              <h3 className="text-2xl font-bold mb-4 text-accent group-hover:scale-105 transition-transform duration-300">Languages</h3>
              <div className="space-y-3">
                {languages.map((lang, index) => (
                  <div key={index} className="flex justify-between items-center hover:translate-x-2 transition-transform duration-300">
                    <span className="font-medium group-hover:text-primary transition-colors duration-300">{lang.name}</span>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 hover:scale-110 transition-transform duration-300">
                      {lang.level}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Professional Interests */}
        <Card className="glass-card border-primary/20 mb-16 hover:glow-primary transition-all duration-500 group relative overflow-hidden"
          style={{ animation: 'fadeInUp 0.6s ease-out 0.3s both' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardContent className="p-8 relative z-10">
            <h3 className="text-2xl font-bold mb-6 text-center group-hover:scale-105 transition-transform duration-300">Professional Interests & Activities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {interests.map((interest, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 transition-all duration-300 hover:scale-105 hover:translate-x-2 cursor-pointer border border-transparent hover:border-primary/20"
                  style={{ animation: `slideInLeft 0.5s ease-out ${index * 0.1}s both` }}
                >
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 animate-pulse"></div>
                  <span className="text-sm">{interest}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Focus Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {focusAreas.map((area, index) => (
            <Card 
              key={index} 
              className="glass-card border-primary/20 hover:glow-primary transition-all duration-500 hover:scale-110 hover:-translate-y-3 hover:rotate-2 group relative overflow-hidden cursor-pointer"
              style={{ animation: `fadeInScale 0.5s ease-out ${index * 0.1}s both` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <CardContent className="p-6 text-center relative z-10">
                <div className="text-primary mb-4 flex justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                  {area.icon}
                </div>
                <h4 className="font-bold mb-2 group-hover:text-primary transition-colors duration-300">{area.title}</h4>
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">{area.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;