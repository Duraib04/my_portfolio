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
              className="glass-card border-primary/20 hover:border-primary/40 transition-all duration-200 group"
            >
              <CardHeader>
                <CardTitle className="text-xl text-primary">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skillIndex} 
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground font-bold">{skill.level}%</span>
                    </div>
                    <div className="relative">
                      <Progress 
                        value={skill.level} 
                        className="h-2"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Certifications */}
        <Card className="glass-card border-primary/20 hover:border-primary/40 transition-all duration-200 group">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-gradient">Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {certifications.map((cert, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-lg bg-secondary/30 hover:bg-primary/10 transition-all duration-200 cursor-pointer border border-transparent hover:border-primary/30"
                >
                  <div className="flex justify-between items-start mb-2">
                    <Badge className={`${getCertificationColor(cert.type)}`}>
                      {cert.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground font-semibold">{cert.date}</span>
                  </div>
                  <h4 className="font-semibold text-sm mb-1 leading-tight">{cert.title}</h4>
                  <p className="text-xs text-muted-foreground">{cert.organization}</p>
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