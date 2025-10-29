import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Code2 } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Helpio4 - Digital Health Ecosystem",
      description:
        "Built a digital health ecosystem connecting doctors, patients, and medical shops with a voice-enabled AI assistant and Firebase-powered backend for secure verification, data intelligence, and communication flow.",
      technologies: ["React", "Node.js", "Firebase", "AI Voice Assistant", "Data Analytics"],
      type: "Full Stack",
      features: [
        "Voice-Enabled AI Assistant",
        "Secure Verification System",
        "Multi-User Communication",
        "Real-time Data Intelligence",
      ],
      status: "Completed",
      category: "Healthcare",
      link: "https://4helpio.vercel.app/",
      codeLink: "https://github.com/DD4universe/4helpio",
    },
    {
      title: "Smart IoT Industry Ecosystem",
      description:
        "Engineered a connected industrial IoT environment enabling real-time monitoring, predictive maintenance, and energy optimization through AI analytics and sensor integration.",
      technologies: ["IoT", "AI Analytics", "Sensors", "Predictive Maintenance", "Energy Management"],
      type: "IoT/AI",
      features: [
        "Real-time Monitoring",
        "Predictive Maintenance",
        "Energy Optimization",
        "Sensor Integration",
      ],
      status: "Completed",
      category: "IoT",
    },
    {
      title: "Smart Home Gas Monitoring & Management",
      description:
        "Developed an AI-driven home safety system for gas detection, prediction, and automatic ventilation control, integrated with voice commands and IoT automation.",
      technologies: ["IoT", "AI/ML", "Voice Control", "Automation", "Gas Sensors"],
      type: "IoT/AI",
      features: [
        "AI-Driven Detection",
        "Predictive Alerts",
        "Auto Ventilation Control",
        "Voice Command Integration",
      ],
      status: "Completed",
      category: "IoT",
    },
    {
      title: "IoT Smart Door Lock (RFID)",
      description:
        "Designed a secure RFID-based door access system with real-time monitoring, access logging, and remote control dashboard, combining IoT security, AI alerts, and automation intelligence.",
      technologies: ["RFID", "IoT", "AI Alerts", "Real-time Monitoring", "Security"],
      type: "IoT Security",
      features: [
        "RFID Access Control",
        "Real-time Monitoring",
        "Access Logging",
        "Remote Dashboard",
      ],
      status: "Completed",
      category: "IoT",
    },
    {
      title: "Billing System (Java)",
      description:
        "Built a Java-based billing system featuring automated invoice generation, product tracking, and secure transaction storage with efficient data flow.",
      technologies: ["Java", "Database", "Automated Invoicing", "Data Management"],
      type: "Desktop Application",
      features: [
        "Automated Invoicing",
        "Product Tracking",
        "Secure Transactions",
        "Efficient Data Flow",
      ],
      status: "Completed",
      category: "Software",
    },
    {
      title: "Responsive Portfolio Website",
      description:
        "Created a personal portfolio using React, Node.js, and TypeScript, featuring a dynamic, responsive UI with modern animations and optimized deployment performance.",
      technologies: ["React", "Node.js", "TypeScript", "Modern Animations", "Optimization"],
      type: "Full Stack",
      features: [
        "Dynamic Responsive UI",
        "Modern Animations",
        "Optimized Performance",
        "TypeScript Integration",
      ],
      status: "Completed",
      category: "Web Development",
    },
    {
      title: "IoT Smoke Detector",
      description:
        "Developed a simulated IoT prototype for smoke detection and environmental safety, integrating real-time alert systems.",
      technologies: ["IoT", "Microcontrollers", "FreeRTOS", "Real-time Alerts", "Simulation"],
      type: "IoT Prototype",
      features: [
        "Real-time Detection",
        "Alert System Integration",
        "Environmental Monitoring",
        "Simulation Testing",
      ],
      status: "Prototype",
      category: "IoT",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "In Development":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Prototype":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      default:
        return "bg-secondary/20 text-secondary-foreground border-secondary/30";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Healthcare":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "Web Development":
        return "bg-primary/20 text-primary border-primary/30";
      case "IoT":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "AI/ML":
        return "bg-accent/20 text-accent border-accent/30";
      case "Software":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      default:
        return "bg-secondary/20 text-secondary-foreground border-secondary/30";
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive portfolio of innovative projects spanning healthcare, IoT ecosystems, 
            smart home automation, industrial solutions, and full-stack web development
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="glass-card border-primary/20 hover:glow-primary transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 hover:rotate-1 group relative overflow-hidden"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
              onMouseMove={(e) => {
                const card = e.currentTarget;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03) translateY(-8px)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1) translateY(0)';
              }}
            >
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge className={`${getCategoryColor(project.category)} transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                    {project.category}
                  </Badge>
                  <Badge className={`${getStatusColor(project.status)} transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg animate-pulse`}>
                    {project.status}
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-all duration-300 group-hover:scale-105 transform-gpu">
                  {project.title}
                </CardTitle>
                <Badge variant="outline" className="w-fit text-xs transition-all duration-300 group-hover:border-primary group-hover:text-primary">
                  {project.type}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Features */}
                <div>
                  <h4 className="font-semibold mb-2 text-sm">Key Features:</h4>
                  <div className="grid grid-cols-2 gap-1">
                    {project.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-2 text-xs"
                      >
                        <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="font-semibold mb-2 text-sm">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="text-xs bg-secondary/50 hover:bg-primary/20 hover:border-primary hover:scale-110 hover:rotate-2 transition-all duration-300 cursor-pointer"
                        style={{
                          animation: `slideInRight 0.5s ease-out ${techIndex * 0.1}s both`
                        }}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  {project.codeLink && (
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="flex-1 glass-card border-primary/30 hover:bg-primary/10 hover:scale-105 hover:shadow-lg hover:border-primary transition-all duration-300 group/btn"
                    >
                      <a
                        href={project.codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-2 h-4 w-4 group-hover/btn:rotate-12 transition-transform duration-300" />
                        Code
                      </a>
                    </Button>
                  )}
                  {project.link && (
                    <Button
                      asChild
                      size="sm"
                      className="flex-1 hero-gradient text-white hover:scale-105 hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 group/btn"
                    >
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                        Demo
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        {/* Call to Action */}
<div className="text-center mt-16">
  <Card className="glass-card border-primary/20 max-w-2xl mx-auto">
    <CardContent className="p-8">
      <Code2 className="h-12 w-12 text-primary mx-auto mb-4" />
      <h3 className="text-2xl font-bold mb-4">Interested in My Work?</h3>
      <p className="text-muted-foreground mb-6">
        These projects represent my passion for creating innovative solutions. 
        I'm always excited to discuss new opportunities and collaborations.
      </p>
      <Button asChild size="lg" className="hero-gradient text-white glow-primary">
        <a 
          href="https://github.com/DD4universe" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          View All Projects
        </a>
      </Button>
    </CardContent>
  </Card>
</div>

      </div>
    </section>
  );
};

export default Projects;
