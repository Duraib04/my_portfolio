import { useState } from "react";
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
  Zap
} from "lucide-react";
import { PersonalInfoHelper } from "@/data/personalInfo";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const FloatingChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Woof! 🐾 I'm Durai's friendly AI pet assistant! I know all about my human's skills, projects, and experience. Ask me anything - I love to chat! What's your name? 😊",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

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
      <div className="fixed bottom-6 right-6 z-50">
        {/* Animated Pet Button */}
        <div 
          onClick={() => setIsOpen(true)}
          className="cursor-pointer relative group"
        >
          {/* Pet Container with bounce animation */}
          <div className="relative animate-bounce hover:animate-none transition-all duration-300">
            {/* Pet body - rounded friendly shape */}
            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 rounded-full shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent animate-pulse"></div>
              
              {/* Pet face */}
              <div className="relative z-10">
                {/* Eyes */}
                <div className="flex gap-3 mb-2">
                  <div className="w-3 h-3 bg-white rounded-full shadow-inner relative">
                    <div className="absolute top-1 left-1 w-2 h-2 bg-gray-800 rounded-full animate-pulse"></div>
                  </div>
                  <div className="w-3 h-3 bg-white rounded-full shadow-inner relative">
                    <div className="absolute top-1 left-1 w-2 h-2 bg-gray-800 rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                {/* Nose/Mouth - cute smile */}
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 bg-pink-600 rounded-full"></div>
                  <div className="w-6 h-3 border-2 border-pink-600 rounded-b-full mt-1"></div>
                </div>
              </div>
              
              {/* Sparkles around pet */}
              <Sparkles className="absolute top-2 right-2 h-3 w-3 text-yellow-300 animate-spin" style={{ animationDuration: '3s' }} />
            </div>
            
            {/* Pet ears - animated */}
            <div className="absolute -top-2 left-2 w-4 h-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full transform -rotate-45 group-hover:rotate-[-30deg] transition-transform duration-300"></div>
            <div className="absolute -top-2 right-2 w-4 h-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full transform rotate-45 group-hover:rotate-[30deg] transition-transform duration-300"></div>
            
            {/* Pet tail - wagging animation */}
            <div className="absolute -bottom-1 -right-3 w-8 h-8">
              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-400 rounded-full animate-wag origin-left"></div>
            </div>
          </div>
          
          {/* Speech bubble notification */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg px-3 py-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            <p className="text-xs font-medium text-gray-800">Chat with me! 💬</p>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white"></div>
          </div>
        </div>
        
        {/* Notification badge */}
        <div className="absolute -top-2 -right-2">
          <div className="h-6 w-6 bg-red-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
            <span className="text-white text-xs font-bold">!</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`w-80 ${isMinimized ? 'h-16' : 'h-96'} glass-card border-primary/20 shadow-2xl transition-all duration-300`}>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              {/* Mini animated pet in header */}
              <div className="relative w-8 h-8">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 rounded-full shadow-lg flex items-center justify-center relative overflow-hidden animate-pulse">
                  {/* Eyes */}
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 bg-white rounded-full">
                      <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
                    </div>
                    <div className="w-1.5 h-1.5 bg-white rounded-full">
                      <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
                    </div>
                  </div>
                </div>
                {/* Mini ear */}
                <div className="absolute -top-1 left-1 w-2 h-3 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full transform -rotate-45"></div>
              </div>
              <span className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Pet Assistant</span>
              <Badge variant="outline" className="text-xs">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                Online
              </Badge>
            </div>
            <div className="flex items-center gap-1">
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
                        // Mini animated pet for bot messages
                        <div className="w-6 h-6 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 rounded-full shadow-md flex items-center justify-center relative">
                          <div className="flex gap-1">
                            <div className="w-1 h-1 bg-white rounded-full"></div>
                            <div className="w-1 h-1 bg-white rounded-full"></div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className={`max-w-[85%] ${
                      message.sender === "user" ? "text-right" : ""
                    }`}>
                      <div className={`p-2 rounded-lg text-xs ${
                        message.sender === "user"
                          ? "bg-primary/20 ml-auto"
                          : "bg-gradient-to-br from-gray-800 to-gray-900 border border-purple-500/30 text-white"
                      }`}>
                        <p className="leading-relaxed whitespace-pre-line">{message.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex items-start gap-2">
                    {/* Animated pet thinking */}
                    <div className="w-6 h-6 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 rounded-full shadow-md flex items-center justify-center relative animate-bounce flex-shrink-0">
                      <div className="flex gap-1">
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-purple-500/30 text-white p-2 rounded-lg">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
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