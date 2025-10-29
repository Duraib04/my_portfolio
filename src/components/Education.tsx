import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, Calendar } from "lucide-react";

const Education = () => {
  const education = [
    {
      degree: "Bachelor of Engineering",
      field: "Computer Science and Engineering - Internet of Things",
      institution: "Government High School - A. Chithoor, Tamil Nadu",
      period: "2022 - Present",
      status: "Current",
      grade: "SSLC | PASSED: 2022 | SCORE: 63.4%",
      highlights: [
        "Specializing in IoT and Computer Science",
        "Focus on emerging technologies",
        "Project-based learning approach",
        "Technical skill development"
      ]
    },
    {
      degree: "Higher Secondary Certificate",
      field: "Science Stream",
      institution: "AKT Academy Matric, Higher Secondary School",
      period: "2020 - 2022",
      status: "Completed",
      grade: "HSC | PASSED: 2022 | STATE BOARD: TAMIL MEDIUM | PASSED: 2024 | SCORE: 79.6%",
      highlights: [
        "Strong foundation in Science",
        "Mathematics and Physics focus",
        "Tamil medium instruction",
        "Above average performance"
      ]
    },
    {
      degree: "Secondary School Leaving Certificate",
      field: "General Education",
      institution: "KSR College of Engineering, Thiruchengode, Tamil Nadu",
      period: "2020",
      status: "Completed",
      grade: "SSLC | PASSED: 2022 | SCORE: 63.4%",
      highlights: [
        "Fundamental education completed",
        "Building blocks for higher studies",
        "Consistent academic progress",
        "Foundation for technical education"
      ]
    }
  ];

  const achievements = [
    {
      title: "IoT Specialization",
      description: "Currently pursuing specialized study in Internet of Things",
      icon: <Award className="h-5 w-5" />,
      type: "Academic"
    },
    {
      title: "Project Portfolio",
      description: "Developed multiple technical projects during studies",
      icon: <GraduationCap className="h-5 w-5" />,
      type: "Practical"
    },
    {
      title: "Continuous Learning",
      description: "Actively pursuing certifications and skill development",
      icon: <Calendar className="h-5 w-5" />,
      type: "Professional"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Current": return "bg-primary/20 text-primary border-primary/30";
      case "Completed": return "bg-green-500/20 text-green-400 border-green-500/30";
      default: return "bg-secondary/20 text-secondary-foreground border-secondary/30";
    }
  };

  const getAchievementColor = (type: string) => {
    switch (type) {
      case "Academic": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Practical": return "bg-accent/20 text-accent border-accent/30";
      case "Professional": return "bg-primary/20 text-primary border-primary/30";
      default: return "bg-secondary/20 text-secondary-foreground border-secondary/30";
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Education</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Academic journey focused on computer science, IoT, and continuous skill development
          </p>
        </div>

        {/* Education Timeline */}
        <div className="space-y-8 mb-16">
          {education.map((edu, index) => (
            <Card 
              key={index} 
              className="glass-card border-primary/20 hover:glow-primary transition-all duration-300"
            >
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <GraduationCap className="h-6 w-6 text-primary" />
                      <Badge className={getStatusColor(edu.status)}>
                        {edu.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl mb-1">{edu.degree}</CardTitle>
                    <p className="text-primary font-medium">{edu.field}</p>
                    <p className="text-sm text-muted-foreground">{edu.institution}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="mb-2">
                      {edu.period}
                    </Badge>
                    <p className="text-xs text-muted-foreground">{edu.grade}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {edu.highlights.map((highlight, highlightIndex) => (
                    <div 
                      key={highlightIndex} 
                      className="flex items-center gap-3 p-2 rounded-lg bg-secondary/30"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                      <span className="text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <Card 
              key={index} 
              className="glass-card border-primary/20 hover:glow-accent transition-all duration-300 hover:scale-105"
            >
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    {achievement.icon}
                  </div>
                </div>
                <Badge className={getAchievementColor(achievement.type)} variant="outline">
                  {achievement.type}
                </Badge>
                <h4 className="font-bold mt-3 mb-2">{achievement.title}</h4>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;