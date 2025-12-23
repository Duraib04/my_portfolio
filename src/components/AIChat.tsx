import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, User, Sparkles, Heart, Coffee, Code, Briefcase } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  type?: "text" | "suggestion" | "action";
}

interface ConversationContext {
  userName?: string;
  previousTopics: string[];
  currentInterest?: string;
}

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm Durai's professional AI assistant. I can provide detailed information about his technical expertise, professional experience, project portfolio, and career background. How may I assist you today?",
      sender: "bot",
      timestamp: new Date(),
      type: "text"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [context, setContext] = useState<ConversationContext>({
    previousTopics: [],
    currentInterest: undefined
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedResponses = {
    skills: {
      text: "Durai is quite skilled! 💻 He's proficient in:\n\n🌐 **Web Development**: HTML, CSS, JavaScript, React, TypeScript\n🐍 **Programming**: Python, C, SQL\n☁️ **Cloud**: AWS services and deployment\n🔧 **IoT**: Microcontrollers, embedded systems\n🎨 **Design**: UI/UX, responsive design\n📊 **Databases**: MySQL, database design\n\nHe's always learning new technologies too! Is there a specific skill area you'd like to know more about?",
      suggestions: ["Tell me about his web development projects", "What IoT projects has he worked on?", "How experienced is he with cloud technologies?"]
    },
    projects: {
      text: "Durai has worked on some fascinating projects! 🚀\n\n🏥 **Healthcare Platform**: Voice assistant integration for patient care\n💼 **Portfolio Websites**: Responsive, modern designs\n🔥 **IoT Smoke Detector**: Smart home safety prototype\n🤖 **AI Chatbots**: Personal AI assistants like me!\n📱 **Mobile Apps**: Cross-platform applications\n\nEach project showcases his full-stack capabilities and problem-solving skills. Which type of project interests you most?",
      suggestions: ["Show me the healthcare platform details", "Tell me about his latest portfolio work", "How does the IoT smoke detector work?"]
    },
    education: {
      text: "Durai is currently pursuing his education with great dedication! 🎓\n\n📚 **Current**: Bachelor of Engineering in Computer Science with IoT specialization\n📊 **Performance**: 79.6% in higher secondary education\n🏆 **Certifications**: Multiple certifications from INFOSYS SPRINGBOARD, Machine Learning, IoT, and web development\n\nHe believes in continuous learning and staying updated with the latest technologies!",
      suggestions: ["What certifications does he have?", "Tell me about his IoT specialization", "How does he stay updated with technology?"]
    },
    contact: {
      text: "Ready to connect with Durai? 📞 Here's how you can reach him:\n\n📧 **Email**: duraib@gmail.com\n📱 **Phone**: +91 8770 6343\n📍 **Location**: Cuddalore District, Tamil Nadu\n\nHe's always open to:\n✨ Freelance projects\n🤝 Technical collaborations\n📖 Mentoring opportunities\n💼 Full-time positions\n\nFeel free to reach out - he loves connecting with fellow tech enthusiasts!",
      suggestions: ["What kind of projects is he looking for?", "Is he available for remote work?", "Does he offer mentoring services?"]
    },
    experience: {
      text: "Durai has hands-on experience across multiple domains! 💪\n\n🔧 **Full-Stack Development**: End-to-end web applications\n🌐 **IoT Systems**: Smart device integration and prototyping\n🤖 **Machine Learning**: AI model implementation and training\n🗄️ **Database Design**: Efficient data structure planning\n🏥 **Healthcare Tech**: Medical platform development\n\nHe's worked on real-world projects that solve actual problems. What kind of experience interests you?",
      suggestions: ["Tell me about his healthcare projects", "How much ML experience does he have?", "What's his biggest technical achievement?"]
    },
    certifications: {
      text: "Durai is certified in several cutting-edge technologies! 🏅\n\n📜 **INFOSYS SPRINGBOARD**: Programming Foundation\n🤖 **Machine Learning**: Sanmish Holdings certification\n🔧 **IoT Microcontrollers**: Embedded systems\n🚀 **Generative AI**: Latest AI workshop completion\n🌐 **Web Development**: Multiple web tech certifications\n\nHe's constantly upskilling to stay current with industry trends!",
      suggestions: ["Which certification was most valuable?", "Is he working on any new certifications?", "How does he choose which skills to learn?"]
    },
    personal: {
      text: "Beyond the technical stuff, Durai is passionate about technology's impact on society! 🌟\n\n💡 He loves solving real-world problems through code\n🎯 Enjoys mentoring others in their tech journey\n📚 Continuous learner who stays curious\n🤝 Believes in collaborative development\n☕ Probably coding with a cup of coffee right now!\n\nHe's not just a developer - he's someone who cares about making technology accessible and useful for everyone.",
      suggestions: ["What motivates him in tech?", "Does he contribute to open source?", "What's his development philosophy?"]
    }
  };

  const getPersonalizedGreeting = () => {
    const greetings = [
      "Great to meet you! 😊",
      "Awesome! Nice to have you here! 🎉",
      "Wonderful! Thanks for visiting! ✨",
      "Fantastic! I'm excited to chat with you! 🚀"
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  };

  const extractName = (message: string): string | null => {
    const namePatterns = [
      /my name is (\w+)/i,
      /i'm (\w+)/i,
      /i am (\w+)/i,
      /call me (\w+)/i,
      /(\w+) here/i
    ];
    
    for (const pattern of namePatterns) {
      const match = message.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const getContextualResponse = (userMessage: string): { text: string; suggestions?: string[] } => {
    const message = userMessage.toLowerCase();
    
    // Handle name introduction
    const extractedName = extractName(userMessage);
    if (extractedName && !context.userName) {
      setContext(prev => ({ ...prev, userName: extractedName }));
      return {
        text: `${getPersonalizedGreeting()} It's really nice to meet you, ${extractedName}! I'm here to tell you all about Durai B and his amazing work in technology. What would you like to know about him?`,
        suggestions: ["Tell me about his skills", "What projects has he worked on?", "How can I contact him?", "What's his background?"]
      };
    }

    // Conversational responses
    if (message.includes("thank") || message.includes("thanks")) {
      return {
        text: context.userName 
          ? `You're very welcome, ${context.userName}! 😊 I'm here whenever you need to know more about Durai. Is there anything else you'd like to explore?`
          : "You're very welcome! 😊 I'm here whenever you need to know more about Durai. Is there anything else you'd like to explore?",
        suggestions: ["Tell me something interesting about him", "What makes him unique?", "How can I work with him?"]
      };
    }

    if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
      return {
        text: context.userName 
          ? `Hello again, ${context.userName}! 👋 What else would you like to know about Durai?`
          : "Hello there! 👋 I'd love to know your name so we can have a more personal chat. What should I call you?",
        suggestions: ["My name is...", "Tell me about Durai's skills", "What projects has he worked on?"]
      };
    }

    // Technical queries
    if (message.includes("skill") || message.includes("technology") || message.includes("programming") || message.includes("tech stack")) {
      setContext(prev => ({ ...prev, currentInterest: "skills", previousTopics: [...prev.previousTopics, "skills"] }));
      return predefinedResponses.skills;
    }
    
    if (message.includes("project") || message.includes("work") || message.includes("portfolio") || message.includes("built")) {
      setContext(prev => ({ ...prev, currentInterest: "projects", previousTopics: [...prev.previousTopics, "projects"] }));
      return predefinedResponses.projects;
    }
    
    if (message.includes("education") || message.includes("study") || message.includes("degree") || message.includes("academic")) {
      setContext(prev => ({ ...prev, currentInterest: "education", previousTopics: [...prev.previousTopics, "education"] }));
      return predefinedResponses.education;
    }
    
    if (message.includes("contact") || message.includes("reach") || message.includes("email") || message.includes("phone") || message.includes("hire")) {
      setContext(prev => ({ ...prev, currentInterest: "contact", previousTopics: [...prev.previousTopics, "contact"] }));
      return predefinedResponses.contact;
    }
    
    if (message.includes("experience") || message.includes("background") || message.includes("worked") || message.includes("career")) {
      setContext(prev => ({ ...prev, currentInterest: "experience", previousTopics: [...prev.previousTopics, "experience"] }));
      return predefinedResponses.experience;
    }
    
    if (message.includes("certification") || message.includes("certificate") || message.includes("course") || message.includes("qualified")) {
      setContext(prev => ({ ...prev, currentInterest: "certifications", previousTopics: [...prev.previousTopics, "certifications"] }));
      return predefinedResponses.certifications;
    }

    if (message.includes("person") || message.includes("personality") || message.includes("about him") || message.includes("who is")) {
      setContext(prev => ({ ...prev, currentInterest: "personal", previousTopics: [...prev.previousTopics, "personal"] }));
      return predefinedResponses.personal;
    }

    // Handle follow-up questions based on context
    if (context.currentInterest && (message.includes("more") || message.includes("detail") || message.includes("tell me about"))) {
      const currentTopic = context.currentInterest as keyof typeof predefinedResponses;
      return predefinedResponses[currentTopic] || { text: "I'd be happy to share more! What specific aspect interests you?" };
    }

    // Default conversational response
    const userName = context.userName ? `, ${context.userName}` : "";
    return {
      text: `That's a great question${userName}! 🤔 I can tell you about Durai's skills, projects, education, experience, certifications, or how to contact him. I can also share some personal insights about what makes him unique as a developer. What interests you most?`,
      suggestions: ["Tell me about his technical skills", "What makes him unique?", "Show me his best projects", "How can I get in touch?"]
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

    // Simulate AI thinking time with realistic delay
    setTimeout(() => {
      const response = getContextualResponse(userInput);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: "bot",
        timestamp: new Date(),
        type: "text"
      };
      
      setMessages(prev => [...prev, botResponse]);
      
      // Add suggestions as separate messages if available
      if (response.suggestions && response.suggestions.length > 0) {
        setTimeout(() => {
          const suggestionMessage: Message = {
            id: (Date.now() + 2).toString(),
            text: "Here are some things you might want to ask:",
            sender: "bot",
            timestamp: new Date(),
            type: "suggestion"
          };
          setMessages(prev => [...prev, suggestionMessage]);
        }, 500);
      }
      
      setIsTyping(false);
    }, Math.random() * 1000 + 800); // More natural response time
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "What are Durai's main skills?",
    "Tell me about his best projects",
    "How can I contact him?",
    "What's his educational background?",
    "What makes him unique?",
    "Is he available for freelance work?"
  ];

  const handleQuickQuestion = (question: string) => {
    setInput(question);
    // Auto-send the question
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Personal AI Assistant</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have a conversation with Durai's AI! Ask questions, get to know him better, and discover his expertise in an interactive chat experience.
          </p>
        </div>

        <Card className="glass-card border-primary/20 glow-primary bg-gradient-to-br from-gray-900/50 to-black/50">
          <CardHeader className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700">
            <CardTitle className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-black rounded-full shadow-lg flex items-center justify-center border-2 border-primary/30 hover:scale-110 transition-transform duration-300">
                <Bot className="h-6 w-6 text-primary" />
              </div>
              <span className="text-white font-bold">Professional AI Assistant</span>
              <Badge className="bg-gradient-to-r from-primary/20 to-blue-600/20 text-primary border-primary/50">
                <Bot className="h-3 w-3 mr-1" />
                Expert Mode
              </Badge>
              {context.userName && (
                <Badge variant="outline" className="ml-auto border-primary/30 text-primary">
                  <User className="h-3 w-3 mr-1" />
                  {context.userName}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Messages */}
            <div className="h-96 overflow-y-auto mb-6 space-y-4 p-4 rounded-lg bg-background/50 border">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.sender === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div className={`flex-shrink-0 ${
                    message.sender === "user" 
                      ? "p-2 rounded-full bg-gradient-to-r from-primary to-blue-600 text-white" 
                      : ""
                  }`}>
                    {message.sender === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-black rounded-full shadow-lg flex items-center justify-center border-2 border-primary/30">
                        <Bot className="h-5 w-5 text-primary" />
                      </div>
                    )}
                  </div>
                  <div className={`max-w-[80%] ${
                    message.sender === "user" ? "text-right" : ""
                  }`}>
                    <div className={`p-4 rounded-lg ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-primary/20 to-blue-600/20 border border-primary/30 ml-auto"
                        : message.type === "suggestion"
                        ? "bg-gradient-to-r from-gray-800 to-gray-900 border-2 border-purple-400/40 text-white"
                        : "bg-gradient-to-br from-gray-800 to-gray-900 border border-purple-500/30 text-white"
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      {message.sender === "bot" && <Bot className="h-3 w-3" />}
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-black rounded-full shadow-lg flex items-center justify-center border-2 border-primary/30">
                    <Bot className="h-5 w-5 text-primary animate-pulse" />
                  </div>
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-primary/30 text-white p-4 rounded-lg">
                    <div className="flex gap-1 items-center">
                      <span className="text-sm text-primary/70 mr-2">Processing...</span>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Quick conversation starters:
              </p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs glass-card border-primary/30 hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 transition-all duration-300"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    <span className="mr-1">
                      {index === 0 && <Code className="h-3 w-3" />}
                      {index === 1 && <Briefcase className="h-3 w-3" />}
                      {index === 2 && <Send className="h-3 w-3" />}
                      {index === 3 && <User className="h-3 w-3" />}
                      {index === 4 && <Sparkles className="h-3 w-3" />}
                      {index === 5 && <Coffee className="h-3 w-3" />}
                    </span>
                    {question}
                  </Button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  context.userName 
                    ? `Ask me anything about Durai, ${context.userName}...` 
                    : "Start by telling me your name, then ask about Durai..."
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

            {/* Conversation stats */}
            {context.previousTopics.length > 0 && (
              <div className="mt-4 text-xs text-muted-foreground text-center">
                <p>Topics we've discussed: {context.previousTopics.join(", ")} 
                  {context.userName && ` • Chatting with ${context.userName}`}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AIChat;