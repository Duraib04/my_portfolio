import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Star } from "lucide-react";

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
    if (level >= 80) return "bg-gradient-to-r from-blue-500 to-indigo-500";
    if (level >= 70) return "bg-gradient-to-r from-blue-400 to-blue-600";
    return "bg-gradient-to-r from-slate-400 to-blue-400";
  };

  const getCertificationColor = (type: string) => {
    switch (type) {
      case "AI/ML": return "bg-indigo-500/20 text-indigo-300 border-indigo-500/40";
      case "Web Dev": return "bg-blue-500/20 text-blue-300 border-blue-500/40";
      case "Programming": return "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
      case "Hardware": return "bg-amber-500/20 text-amber-300 border-amber-500/40";
      default: return "bg-blue-500/20 text-blue-300 border-blue-500/40";
    }
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">Skills & Expertise</h2>
          <p className="text-xl text-blue-200/70 max-w-3xl mx-auto">
            A comprehensive skill set spanning web development, programming, and emerging technologies
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <Card 
              key={categoryIndex} 
              className="glass-card border-blue-500/20 hover:border-blue-400/40 transition-all duration-300"
            >
              <CardHeader>
                <CardTitle className="text-xl text-blue-300">
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-blue-100/90">{skill.name}</span>
                      <span className="text-sm text-blue-400 font-bold">{skill.level}%</span>
                    </div>
                    <div className="relative h-2 bg-blue-950/50 rounded overflow-hidden">
                      <div 
                        className={`h-full ${getSkillColor(skill.level)} rounded`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Certifications */}
        <Card className="glass-card border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-2xl text-center flex items-center justify-center gap-3">
              <Award className="w-6 h-6 text-blue-400" />
              <span className="text-gradient">Certifications</span>
              <Award className="w-6 h-6 text-blue-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {certifications.map((cert, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-lg bg-blue-950/30 hover:bg-blue-500/10 transition-all duration-300 cursor-pointer border border-blue-500/10 hover:border-blue-400/40"
                >
                  <div className="flex justify-between items-start mb-2">
                    <Badge className={`${getCertificationColor(cert.type)}`}>
                      {cert.type}
                    </Badge>
                    <span className="text-xs text-blue-400/70 font-semibold flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {cert.date}
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm mb-1 leading-tight text-blue-100">{cert.title}</h4>
                  <p className="text-xs text-blue-300/70">{cert.organization}</p>
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