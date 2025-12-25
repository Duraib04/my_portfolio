import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Minimize2, 
  Maximize2,
  Sparkles,
  Zap,
  Move
} from "lucide-react";
import { PersonalInfoHelper } from "@/data/personalInfo";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface Position {
  x: number;
  y: number;
}

const FloatingChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm Durai's AI assistant. I can provide information about his professional background, technical skills, and project portfolio. How may I assist you today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [position, setPosition] = useState<Position>({ x: window.innerWidth - 120, y: window.innerHeight - 120 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const widgetRef = useRef<HTMLDivElement>(null);

  const quickResponses = {
    "contact": "📧 Email: duraib@gmail.com\n📱 Phone: +91 8770 6343\n\nHe's available for freelance work and collaborations!",
    "skills": "🔧 Full-stack development\n🌐 React, TypeScript, Python\n☁️ AWS & cloud deployment\n🔌 IoT & embedded systems",
    "projects": "🏥 Healthcare platforms\n💼 Portfolio websites\n🔥 IoT smoke detectors\n🤖 AI chatbots like me!",
    "hire": "Yes! Durai is available for:\n• Freelance projects\n• Full-time positions\n• Technical consulting\n• Mentoring\n\nReady to discuss your project!",
    "age": () => `Durai is currently ${PersonalInfoHelper.getFormattedAge()}! 🎂\nBorn: ${PersonalInfoHelper.getBirthDate()}\nNext birthday: ${PersonalInfoHelper.getNextBirthday()}`,
    "personal": () => `${PersonalInfoHelper.getFormattedAge()} developer from Tamil Nadu! 🌟\nZodiac: ${PersonalInfoHelper.getZodiacSign()}\nPassionate about tech and social impact!`,
    "default": "I can help with info about Durai's skills, projects, contact details, age, or availability. For a detailed conversation, check out the main chat section below! 🚀"
  };

  const getQuickResponse = (message: string): string => {
    const msg = message.toLowerCase();
    if (msg.includes("contact") || msg.includes("email") || msg.includes("phone")) {
      return quickResponses.contact;
    } else if (msg.includes("skill") || msg.includes("technology") || msg.includes("programming")) {
      return quickResponses.skills;
    } else if (msg.includes("project") || msg.includes("work") || msg.includes("portfolio")) {
      return quickResponses.projects;
    } else if (msg.includes("hire") || msg.includes("available") || msg.includes("freelance")) {
      return quickResponses.hire;
    } else if (msg.includes("age") || msg.includes("old") || msg.includes("birthday") || msg.includes("born")) {
      return typeof quickResponses.age === 'function' ? quickResponses.age() : quickResponses.age;
    } else if (msg.includes("personal") || msg.includes("background") || msg.includes("about him")) {
      return typeof quickResponses.personal === 'function' ? quickResponses.personal() : quickResponses.personal;
    } else if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
      return "Hello! 👋 I'm here to help with quick questions about Durai. What would you like to know?";
    } else {
      return quickResponses.default;
    }
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const userInput = input;
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getQuickResponse(userInput),
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    
    const rect = widgetRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const widgetWidth = widgetRef.current?.offsetWidth || (isOpen ? 320 : 64);
      const widgetHeight = widgetRef.current?.offsetHeight || (isOpen ? (isMinimized ? 64 : 384) : 64);
      
      // Calculate new position based on cursor
      let newX = e.clientX - dragOffset.x;
      let newY = e.clientY - dragOffset.y;
      
      // Keep widget within viewport bounds
      newX = Math.max(0, Math.min(newX, window.innerWidth - widgetWidth));
      newY = Math.max(0, Math.min(newY, window.innerHeight - widgetHeight));
      
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none';
    } else {
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
    };
  }, [isDragging, dragOffset, isOpen, isMinimized]);

  const quickQuestions = [
    "How old is Durai?",
    "What are his skills?", 
    "Is he available for hire?",
    "Tell me about him"
  ];

  const scrollToMainChat = () => {
    const chatSection = document.getElementById('ai-chat');
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <div 
        ref={widgetRef}
        className="fixed z-50"
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
      >
        <div
          onMouseDown={handleMouseDown}
          className="relative group"
        >
          <Button
            onClick={(e) => {
              if (!isDragging) {
                e.stopPropagation();
                setIsOpen(true);
              }
            }}
            size="lg"
            className="h-16 w-16 rounded-full shadow-2xl bg-gradient-to-br from-[#0b1026] via-[#120c2c] to-[#0a081a] border-2 border-primary/30 hover:border-accent hover:scale-110 transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/10 to-transparent group-hover:via-primary/20 transition-all duration-300"></div>
            <Bot className="h-8 w-8 text-primary relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute -top-1 -right-1">
              <div className="h-5 w-5 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-2 border-gray-900">
                <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="absolute -top-1 -left-1">
              <Move className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={widgetRef}
      className="fixed z-50"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`
      }}
    >
      <Card className={`w-80 ${isMinimized ? 'h-16' : 'h-96'} glass-card border-primary/25 shadow-2xl transition-all duration-300`}>
        <CardHeader 
          className="pb-2 bg-gradient-to-r from-[#0b1026] via-[#120c2c] to-[#1b0f35] border-b border-primary/25 cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
        >
          <CardTitle className="flex items-center justify-between text-sm pointer-events-none">
            <div className="flex items-center gap-2">
              <Move className="h-4 w-4 text-gray-400 pointer-events-none" />
              <div className="relative w-8 h-8 bg-gradient-to-br from-gray-800 to-black rounded-full flex items-center justify-center border border-primary/30">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <span className="font-bold text-white">AI Assistant</span>
              <Badge variant="outline" className="text-xs border-green-500/50 text-green-400">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                Online
              </Badge>
            </div>
            <div className="flex items-center gap-1 pointer-events-auto">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-6 w-6 p-0"
              >
                {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-3 space-y-3">
            {/* Messages */}
            <ScrollArea className="h-48 w-full border rounded-lg bg-background/50 p-2">
              <div className="space-y-2">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-2 ${
                      message.sender === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    {/* Avatar */}
                    <div className={`flex-shrink-0 ${
                      message.sender === "user" 
                        ? "p-1 rounded-full bg-primary/20 text-primary" 
                        : ""
                    }`}>
                      {message.sender === "user" ? (
                        <User className="h-3 w-3" />
                      ) : (
                        <div className="w-6 h-6 bg-gradient-to-br from-gray-800 to-black rounded-full shadow-md flex items-center justify-center border border-primary/30">
                          <Bot className="h-3 w-3 text-primary" />
                        </div>
                      )}
                    </div>
                    <div className={`max-w-[85%] ${
                      message.sender === "user" ? "text-right" : ""
                    }`}>
                      <div className={`p-2 rounded-lg text-xs ${
                        message.sender === "user" 
                          ? "bg-primary/25 ml-auto"
                          : "bg-gradient-to-br from-[#0f1430] to-[#120c2c] border border-primary/25 text-white"
                      }`}>
                        <p className="leading-relaxed whitespace-pre-line">{message.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-gray-800 to-black rounded-full shadow-md flex items-center justify-center border border-primary/30 flex-shrink-0">
                      <Bot className="h-3 w-3 text-primary animate-pulse" />
                    </div>
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-primary/30 text-white p-2 rounded-lg">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Quick Questions */}
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Quick questions:</p>
              <div className="grid grid-cols-2 gap-1">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs h-8 p-1 border-primary/30"
                    onClick={() => setInput(question)}
                  >
                    {question.split(' ').slice(0, 2).join(' ')}...
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
                placeholder="Quick question..."
                className="text-xs h-8"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || isTyping}
                size="sm"
                className="h-8 w-8 p-0 hero-gradient text-white"
              >
                <Send className="h-3 w-3" />
              </Button>
            </div>

            {/* Link to main chat */}
            <Button
              onClick={scrollToMainChat}
              variant="outline"
              size="sm"
              className="w-full text-xs border-accent/30 hover:bg-accent/10"
            >
              <Zap className="h-3 w-3 mr-1" />
              Full Conversation Mode
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default FloatingChatWidget;