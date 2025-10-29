import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Bot, 
  Send, 
  User, 
  Sparkles, 
  Heart, 
  Coffee, 
  Code, 
  Briefcase,
  MessageCircle,
  Brain,
  Zap,
  Star,
  Calendar,
  MapPin
} from "lucide-react";
import { PersonalInfoHelper, DURAI_PERSONAL_INFO } from "@/data/personalInfo";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  type?: "text" | "suggestion" | "action" | "greeting";
  emotion?: "happy" | "excited" | "thoughtful" | "helpful";
}

interface ChatContext {
  userName?: string;
  previousTopics: string[];
  currentInterest?: string;
  conversationStage: "initial" | "acquainted" | "deep_conversation";
  userPreferences: {
    techLevel?: "beginner" | "intermediate" | "advanced";
    interests?: string[];
  };
}

const PersonalChatAgent = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hey there! 👋 I'm Durai's personal AI assistant, and I'm genuinely excited to meet you! I know absolutely everything about Durai's journey as a developer, his projects, skills, and what makes him tick.\n\nI love having real conversations, so please tell me your name and what brings you here today. Are you looking to hire him, collaborate on something cool, or just curious about his work?",
      sender: "bot",
      timestamp: new Date(),
      type: "greeting",
      emotion: "excited"
    }
  ]);
  
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [context, setContext] = useState<ChatContext>({
    previousTopics: [],
    conversationStage: "initial",
    userPreferences: {}
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enhanced knowledge base with more detailed responses
  const knowledgeBase = {
    skills: {
      frontend: {
        text: "Durai is a frontend wizard! 🎨✨\n\n**Modern Web Stack:**\n• React & TypeScript (his go-to combo)\n• HTML5, CSS3, JavaScript ES6+\n• Tailwind CSS for lightning-fast styling\n• Responsive design that works everywhere\n\n**UI/UX Philosophy:**\n• User-centered design approach\n• Accessibility-first development\n• Performance optimization\n• Modern component architecture\n\nHe builds interfaces that aren't just functional - they're delightful to use!",
        suggestions: ["Show me his best UI projects", "How does he approach responsive design?", "What's his design process?"]
      },
      backend: {
        text: "On the backend, Durai builds robust and scalable systems! ⚡🔧\n\n**Core Technologies:**\n• Python for complex logic and AI integration\n• C for system-level programming\n• SQL databases with optimized queries\n• RESTful API design\n\n**Development Practices:**\n• Clean, maintainable code architecture\n• Database optimization and design\n• Security-first development\n• Performance monitoring\n\nHe loves solving complex problems with elegant solutions!",
        suggestions: ["Tell me about his database skills", "What APIs has he built?", "How does he handle security?"]
      },
      cloud: {
        text: "Durai is cloud-savvy and deployment-ready! ☁️🚀\n\n**AWS Expertise:**\n• EC2 for scalable computing\n• S3 for reliable storage\n• CloudFormation for infrastructure\n• Cost optimization strategies\n\n**DevOps Mindset:**\n• CI/CD pipeline setup\n• Monitoring and logging\n• Scalability planning\n• Performance optimization\n\nHe ensures your applications run smoothly at any scale!",
        suggestions: ["What cloud projects has he deployed?", "How does he optimize costs?", "Tell me about his DevOps experience"]
      },
      iot: {
        text: "IoT is where Durai really shines! 🔌🌐\n\n**Hardware & Embedded:**\n• Microcontroller programming\n• Sensor integration and calibration\n• Real-time data processing\n• Hardware-software communication\n\n**Smart Solutions:**\n• Smoke detection systems\n• Environmental monitoring\n• Home automation prototypes\n• Industrial IoT applications\n\nHe bridges the gap between physical and digital worlds!",
        suggestions: ["Show me his IoT projects", "What sensors has he worked with?", "How does he handle IoT security?"]
      }
    },
    projects: {
      healthcare: {
        text: "The healthcare platform is Durai's proudest achievement! 🏥💖\n\n**Revolutionary Features:**\n• Voice assistant for patient interaction\n• Real-time health monitoring\n• Secure patient data management\n• Intuitive healthcare provider interface\n\n**Technical Excellence:**\n• HIPAA-compliant security measures\n• Real-time data synchronization\n• Cross-platform compatibility\n• AI-powered health insights\n\n**Impact:** This platform could revolutionize how patients interact with healthcare systems, making medical care more accessible and efficient!",
        suggestions: ["How does the voice assistant work?", "What security measures are implemented?", "Is this available for use?"]
      },
      portfolio: {
        text: "Durai's portfolio projects showcase his creative and technical range! 🎨💻\n\n**Design Philosophy:**\n• Clean, modern aesthetics\n• Blazing-fast performance\n• Mobile-first responsive design\n• Accessible to all users\n\n**Technical Features:**\n• React with TypeScript\n• Tailwind CSS animations\n• Optimized loading times\n• SEO-friendly structure\n\n**Personal Touch:** Each portfolio tells a story, reflecting the client's personality while maintaining professional standards!",
        suggestions: ["Can I see examples of his portfolio work?", "How does he optimize for performance?", "What's his design process?"]
      },
      iot_projects: {
        text: "Durai's IoT projects solve real-world safety problems! 🔥🚨\n\n**Smart Smoke Detector:**\n• Advanced sensor technology\n• Real-time alert system\n• Mobile app integration\n• Cloud-based monitoring\n\n**Innovation Highlights:**\n• False alarm reduction\n• Energy-efficient design\n• Easy installation process\n• Scalable for buildings\n\n**Vision:** Making homes and workplaces safer through intelligent, connected devices!",
        suggestions: ["How accurate is the smoke detection?", "Can it integrate with existing systems?", "Is this ready for market?"]
      }
    },
    personal: {
      motivation: {
        text: "What drives Durai is truly inspiring! 🌟💪\n\n**Core Motivation:**\n• Solving real problems that impact lives\n• Making technology accessible to everyone\n• Continuous learning and growth\n• Building meaningful connections through code\n\n**Philosophy:**\n\"Technology should empower people, not complicate their lives. Every line of code should serve a purpose and make someone's day a little better.\"\n\n**Daily Drive:**\n• Wakes up excited about new challenges\n• Reads tech blogs over morning coffee ☕\n• Always thinking about the next innovation\n• Believes in the power of collaboration",
        suggestions: ["What's his biggest technical achievement?", "How does he stay motivated?", "What's his vision for the future?"]
      },
      learning: {
        text: "Durai is a learning machine! 📚🧠\n\n**Learning Style:**\n• Hands-on project-based approach\n• Building while learning\n• Teaching others to reinforce knowledge\n• Staying curious about emerging tech\n\n**Recent Focus Areas:**\n• Generative AI and machine learning\n• Advanced cloud architectures\n• IoT security best practices\n• Modern web performance optimization\n\n**Growth Mindset:** He believes every challenge is an opportunity to level up!",
        suggestions: ["What's he learning right now?", "How does he choose what to learn?", "Does he teach or mentor others?"]
      },
      collaboration: {
        text: "Working with Durai is a joy! 🤝✨\n\n**Collaboration Style:**\n• Clear, honest communication\n• Proactive problem-solving\n• Respectful of deadlines and budgets\n• Always brings creative solutions\n\n**Team Dynamics:**\n• Great at explaining technical concepts\n• Welcomes feedback and iteration\n• Mentors junior developers naturally\n• Bridges technical and business needs\n\n**Client Testimonials:** (Hypothetically) \"Working with Durai was seamless - he understood our vision and exceeded expectations!\"",
        suggestions: ["What's his project management style?", "How does he handle tight deadlines?", "Is he good with client communication?"]
      },
      background: {
        text: () => {
          const age = PersonalInfoHelper.getFormattedAge();
          const birthDate = PersonalInfoHelper.getBirthDate();
          const location = DURAI_PERSONAL_INFO.location;
          const zodiac = PersonalInfoHelper.getZodiacSign();
          const nextBirthday = PersonalInfoHelper.getNextBirthday();
          
          return `Let me tell you about Durai's background! 👨‍💻✨\n\n**Personal Details:**\n• **Age:** ${age} (born ${birthDate})\n• **Zodiac:** ${zodiac} ♊\n• **Location:** ${location.city}, ${location.state}\n• **Next Birthday:** ${nextBirthday === "Today! 🎉" || nextBirthday === "Tomorrow! 🎂" ? nextBirthday : `In ${nextBirthday}`}\n\n**Languages:** ${DURAI_PERSONAL_INFO.languages.map(l => `${l.name} (${l.proficiency})`).join(', ')}\n\n**Education:** Currently pursuing ${DURAI_PERSONAL_INFO.education.current} with ${DURAI_PERSONAL_INFO.education.specialization} specialization, graduating in ${DURAI_PERSONAL_INFO.education.graduationYear}.\n\nHe's a young, passionate developer who's already making waves in the tech world! 🌊`;
        },
        suggestions: ["Tell me about his personality", "What are his career goals?", "How did he get into programming?"]
      }
    },
    contact: {
      availability: {
        text: "Durai is actively seeking exciting opportunities! 🚀💼\n\n**Currently Available For:**\n• Freelance web development projects\n• IoT system development\n• Technical consulting and mentoring\n• Full-time positions (remote or hybrid)\n\n**Project Preferences:**\n• Healthcare and social impact tech\n• Innovative IoT solutions\n• Modern web applications\n• AI-integrated platforms\n\n**Response Time:** Usually responds within 24 hours (often much faster!)\n\n📧 **Email:** duraib@gmail.com\n📱 **Phone:** +91 8770 6343\n📍 **Location:** Cuddalore District, Tamil Nadu",
        suggestions: ["What's his ideal project size?", "Is he open to remote work?", "How does he price his services?"]
      },
      hiring: {
        text: "Thinking of hiring Durai? Great choice! 🎯⭐\n\n**Why Companies Love Him:**\n• Delivers high-quality code on time\n• Brings creative solutions to complex problems\n• Excellent communication throughout projects\n• Proactive about potential issues\n\n**Perfect Fit For:**\n• Startups needing full-stack expertise\n• Healthcare tech companies\n• IoT product development\n• Teams valuing innovation and quality\n\n**Work Style:**\n• Flexible with time zones\n• Regular progress updates\n• Collaborative approach\n• Results-driven mindset\n\nReady to discuss your project? He'd love to hear from you!",
        suggestions: ["What's his hourly rate?", "Can he work in our time zone?", "What information does he need to start?"]
      }
    }
  };

  // Smart response generation with context awareness and dynamic personal info
  const generateResponse = (userMessage: string): { text: string; suggestions?: string[]; emotion?: Message["emotion"] } => {
    const message = userMessage.toLowerCase();
    
    // First check for personal information queries using the dynamic system
    const personalInfoResponse = PersonalInfoHelper.searchPersonalInfo(userMessage);
    if (personalInfoResponse) {
      return {
        text: `${personalInfoResponse}\n\nIs there anything else you'd like to know about Durai? 😊`,
        suggestions: [
          "Tell me about his projects", 
          "What are his technical skills?", 
          "How can I contact him?",
          "What's his personality like?"
        ],
        emotion: "helpful"
      };
    }
    
    // Handle name extraction and greeting
    const nameMatch = message.match(/(?:my name is|i'm|i am|call me)\s+(\w+)/i);
    if (nameMatch && !context.userName) {
      const name = nameMatch[1];
      setContext(prev => ({ 
        ...prev, 
        userName: name,
        conversationStage: "acquainted"
      }));
      
      const currentAge = PersonalInfoHelper.getFormattedAge();
      
      return {
        text: `${name}! What a wonderful name! 🌟 I'm so excited to meet you! \n\nNow that we're properly introduced, I'd love to know what brought you here today. Are you:\n\n🔍 **Exploring** - Just curious about Durai's work?\n💼 **Hiring** - Looking for a talented ${currentAge} developer?\n🤝 **Collaborating** - Interested in working together?\n📚 **Learning** - Want to know about his journey?\n\nI'm here to give you all the insights you need about this amazing developer!`,
        suggestions: ["I'm looking to hire someone", "I'm curious about his projects", "I want to collaborate", "Tell me about his journey"],
        emotion: "excited"
      };
    }

    // Context-aware responses based on conversation stage
    if (context.conversationStage === "initial" && !context.userName) {
      if (message.includes("hire") || message.includes("job") || message.includes("work")) {
        return {
          text: "Ah, you're looking to hire! That's fantastic! 💼✨ Durai would be thrilled to hear that.\n\nBefore I tell you all about why he'd be perfect for your team, I'd love to know your name so we can have a more personal conversation. What should I call you?",
          suggestions: ["My name is...", "Tell me about his experience", "What makes him special?"],
          emotion: "helpful"
        };
      }
    }

    // Skill-related queries with detailed breakdowns
    if (message.includes("skill") || message.includes("technology") || message.includes("tech stack")) {
      if (message.includes("frontend") || message.includes("ui") || message.includes("design")) {
        return { ...knowledgeBase.skills.frontend, emotion: "excited" };
      } else if (message.includes("backend") || message.includes("server") || message.includes("api")) {
        return { ...knowledgeBase.skills.backend, emotion: "thoughtful" };
      } else if (message.includes("cloud") || message.includes("aws") || message.includes("deploy")) {
        return { ...knowledgeBase.skills.cloud, emotion: "helpful" };
      } else if (message.includes("iot") || message.includes("hardware") || message.includes("embedded")) {
        return { ...knowledgeBase.skills.iot, emotion: "excited" };
      }
      
      // General skills overview
      return {
        text: "Durai's technical skills span the entire development spectrum! 🌈💻\n\nHe's what I like to call a 'full-spectrum developer' - comfortable from frontend design to backend logic, cloud deployment to IoT hardware.\n\n**Main Strengths:**\n🎨 Frontend: React, TypeScript, modern CSS\n⚡ Backend: Python, C, database design\n☁️ Cloud: AWS deployment and optimization\n🔧 IoT: Hardware integration and smart systems\n\nWhich area interests you most? I'd love to dive deeper!",
        suggestions: ["Tell me about his frontend skills", "What about backend development?", "How's his cloud experience?", "Show me IoT projects"],
        emotion: "helpful"
      };
    }

    // Project-specific queries
    if (message.includes("project") || message.includes("work") || message.includes("portfolio")) {
      if (message.includes("healthcare") || message.includes("medical") || message.includes("health")) {
        return { ...knowledgeBase.projects.healthcare, emotion: "excited" };
      } else if (message.includes("portfolio") || message.includes("website")) {
        return { ...knowledgeBase.projects.portfolio, emotion: "thoughtful" };
      } else if (message.includes("iot") || message.includes("smoke") || message.includes("detector")) {
        return { ...knowledgeBase.projects.iot_projects, emotion: "excited" };
      }
      
      return {
        text: "Durai's projects are where his skills really shine! ✨🚀\n\nHe's worked on some incredible stuff:\n\n🏥 **Healthcare Platform** - Voice-assisted patient care system\n💼 **Portfolio Websites** - Beautiful, responsive designs\n🔥 **IoT Smoke Detector** - Smart safety systems\n🤖 **AI Chatbots** - Interactive assistants (like me!)\n\nEach project solves real problems and showcases different aspects of his expertise. Which one catches your interest?",
        suggestions: ["Tell me about the healthcare platform", "Show me portfolio examples", "How does the IoT detector work?", "What other projects has he done?"],
        emotion: "excited"
      };
    }

    // Personal and motivational queries
    if (message.includes("motivation") || message.includes("why") || message.includes("passion")) {
      return { ...knowledgeBase.personal.motivation, emotion: "thoughtful" };
    }

    if (message.includes("learning") || message.includes("study") || message.includes("education")) {
      return { ...knowledgeBase.personal.learning, emotion: "excited" };
    }

    // Personal information and background queries
    if (message.includes("person") || message.includes("personality") || message.includes("about him") || message.includes("who is") || message.includes("background") || message.includes("personal")) {
      setContext(prev => ({ ...prev, currentInterest: "personal", previousTopics: [...prev.previousTopics, "personal"] }));
      
      // Check if they want background info specifically
      if (message.includes("background") || message.includes("personal") || message.includes("about him") || message.includes("who is")) {
        const backgroundResponse = knowledgeBase.personal.background;
        return {
          text: typeof backgroundResponse.text === 'function' ? backgroundResponse.text() : backgroundResponse.text,
          suggestions: backgroundResponse.suggestions,
          emotion: "thoughtful"
        };
      }
      
      return { ...knowledgeBase.personal.motivation, emotion: "thoughtful" };
    }

    // Contact and hiring queries
    if (message.includes("contact") || message.includes("reach") || message.includes("email") || message.includes("phone")) {
      return { ...knowledgeBase.contact.availability, emotion: "helpful" };
    }

    if (message.includes("hire") || message.includes("available") || message.includes("freelance")) {
      return { ...knowledgeBase.contact.hiring, emotion: "excited" };
    }

    // Conversational responses
    if (message.includes("thank") || message.includes("thanks")) {
      const userName = context.userName ? `, ${context.userName}` : "";
      return {
        text: `You're so welcome${userName}! 😊💖 I absolutely love talking about Durai's work - he's accomplished so much!\n\nIs there anything else you'd like to know? I could talk about his projects all day!`,
        suggestions: ["Tell me something unique about him", "What's his biggest achievement?", "How can I work with him?"],
        emotion: "happy"
      };
    }

    if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
      const userName = context.userName;
      if (userName) {
        return {
          text: `Hey again, ${userName}! 👋 Great to continue our conversation! What else would you like to explore about Durai's amazing work?`,
          suggestions: ["Show me his latest projects", "What makes him unique?", "How can I contact him?"],
          emotion: "happy"
        };
      } else {
        return {
          text: "Hello there! 👋 I'm Durai's AI assistant, and I'm here to chat! I'd love to know your name so we can have a proper conversation. What should I call you?",
          suggestions: ["My name is...", "Tell me about Durai", "What can you help me with?"],
          emotion: "happy"
        };
      }
    }

    // Default contextual response
    const userName = context.userName ? `, ${context.userName}` : "";
    return {
      text: `That's a great question${userName}! 🤔 I'm here to share everything about Durai's journey as a developer.\n\nI can tell you about:\n🛠️ His technical skills and expertise\n🚀 Amazing projects he's built\n💼 How to work with him\n🌟 What makes him unique as a developer\n📞 How to get in touch\n\nWhat interests you most?`,
      suggestions: ["Tell me about his skills", "Show me his projects", "What makes him special?", "How can I contact him?"],
      emotion: "helpful"
    };
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
      type: "text"
    };

    setMessages(prev => [...prev, userMessage]);
    const userInput = input;
    setInput("");
    setIsTyping(true);

    // More natural response timing
    setTimeout(() => {
      const response = generateResponse(userInput);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: "bot",
        timestamp: new Date(),
        type: "text",
        emotion: response.emotion
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, Math.random() * 1500 + 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickStarters = [
    { text: "What are his main skills?", icon: <Code className="h-3 w-3" /> },
    { text: "Show me his best projects", icon: <Briefcase className="h-3 w-3" /> },
    { text: "How old is Durai?", icon: <Calendar className="h-3 w-3" /> },
    { text: "Tell me about his background", icon: <MapPin className="h-3 w-3" /> },
    { text: "What makes him unique?", icon: <Sparkles className="h-3 w-3" /> },
    { text: "How can I hire him?", icon: <Star className="h-3 w-3" /> },
    { text: "When is his birthday?", icon: <Heart className="h-3 w-3" /> },
    { text: "What's his personality like?", icon: <Brain className="h-3 w-3" /> }
  ];

  const handleQuickStarter = (text: string) => {
    setInput(text);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
            Personal AI Assistant
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Have an intelligent conversation with Durai's AI! I'm not just a chatbot - I'm a knowledgeable assistant who knows everything about his skills, projects, and journey. Let's chat! 🚀
          </p>
        </div>

        <Card className="glass-card border-primary/20 glow-primary shadow-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-gradient-to-r from-primary via-accent to-purple-600 text-white">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xl">Chat with Durai's Personal AI</span>
                  <p className="text-sm text-muted-foreground font-normal">Intelligent • Interactive • Insightful</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-600 border-green-500/30">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  Online
                </Badge>
                {context.userName && (
                  <Badge variant="outline" className="border-primary/30">
                    <Heart className="h-3 w-3 mr-1" />
                    Hi, {context.userName}!
                  </Badge>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Messages Area */}
            <ScrollArea className="h-[500px] w-full border rounded-lg bg-background/50 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-3 ${
                      message.sender === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div className={`p-2 rounded-full flex-shrink-0 ${
                      message.sender === "user" 
                        ? "bg-gradient-to-r from-primary to-blue-600 text-white" 
                        : "bg-gradient-to-r from-accent via-purple-600 to-pink-600 text-white"
                    }`}>
                      {message.sender === "user" ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                    </div>
                    
                    <div className={`max-w-[85%] ${
                      message.sender === "user" ? "text-right" : ""
                    }`}>
                      <div className={`p-4 rounded-xl ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-primary/20 to-blue-600/20 border border-primary/30 ml-auto"
                          : message.type === "greeting"
                          ? "bg-gradient-to-r from-accent/10 via-purple-600/10 to-pink-600/10 border border-accent/20"
                          : "bg-secondary/60 border border-secondary"
                      }`}>
                        <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        {message.sender === "bot" && <Coffee className="h-3 w-3" />}
                        <span>{message.timestamp.toLocaleTimeString()}</span>
                        {message.emotion && (
                          <Badge variant="outline" className="text-xs">
                            {message.emotion === "excited" && "😄"}
                            {message.emotion === "happy" && "😊"}
                            {message.emotion === "thoughtful" && "🤔"}
                            {message.emotion === "helpful" && "🤝"}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-gradient-to-r from-accent via-purple-600 to-pink-600 text-white flex-shrink-0">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="bg-secondary/60 border border-secondary p-4 rounded-xl">
                      <div className="flex gap-1 items-center">
                        <span className="text-sm text-muted-foreground mr-3">Thinking...</span>
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-accent rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                          <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <Separator />

            {/* Quick Starters */}
            <div>
              <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Quick conversation starters:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {quickStarters.map((starter, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs glass-card border-primary/30 hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 transition-all duration-300 justify-start"
                    onClick={() => handleQuickStarter(starter.text)}
                  >
                    <span className="mr-2">{starter.icon}</span>
                    {starter.text}
                  </Button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="space-y-2">
              <div className="flex gap-3">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    context.userName 
                      ? `What would you like to know about Durai, ${context.userName}?` 
                      : "Start by telling me your name, then ask anything about Durai!"
                  }
                  className="glass-card border-primary/30 focus:glow-primary transition-all duration-300"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isTyping}
                  className="hero-gradient text-white px-6 hover:scale-105 transition-transform duration-200"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              {/* Chat Stats */}
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  {context.previousTopics.length > 0 && (
                    <span>Topics discussed: {context.previousTopics.slice(-3).join(", ")}</span>
                  )}
                  {context.userName && (
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      Chatting with {context.userName}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Brain className="h-3 w-3" />
                  AI Powered by Knowledge & Care
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PersonalChatAgent;