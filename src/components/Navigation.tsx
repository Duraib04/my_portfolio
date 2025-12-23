import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, User, Code, GraduationCap, Mail, Bot, Crown } from "lucide-react";

interface NavigationProps {
  activePage: string;
  onPageChange: (pageId: string) => void;
}

const Navigation = ({ activePage, onPageChange }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: "hero", label: "Home", icon: <Home className="h-4 w-4" /> },
    { id: "about", label: "About", icon: <User className="h-4 w-4" /> },
    { id: "skills", label: "Skills", icon: <Code className="h-4 w-4" /> },
    { id: "projects", label: "Projects", icon: <Code className="h-4 w-4" /> },
    { id: "education", label: "Education", icon: <GraduationCap className="h-4 w-4" /> },
    { id: "ai-chat", label: "AI Chat", icon: <Bot className="h-4 w-4" /> },
    { id: "contact", label: "Contact", icon: <Mail className="h-4 w-4" /> }
  ];

  const handleNavClick = (pageId: string) => {
    onPageChange(pageId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Fixed Navigation with Royal styling */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-gradient-to-r from-blue-950/90 via-[#0a0a1a]/95 to-blue-950/90 border-b border-blue-500/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Royal Logo */}
            <div className="flex items-center gap-3 cursor-pointer transition-all duration-200 group" onClick={() => handleNavClick("hero")}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                <Crown className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-gradient">Durai B</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 transition-all duration-200 ${
                    activePage === item.id
                      ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                      : "text-blue-200 hover:bg-blue-500/10 hover:text-blue-300"
                  }`}
                >
                  {item.icon}
                  <span className="hidden lg:inline">{item.label}</span>
                </Button>
              ))}

              {/* Royal Buy Project CTA */}
              <a
                href="https://dd-products.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2"
              >
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white font-semibold px-4 py-2 hover:scale-105 transition-transform duration-200 shadow-lg shadow-blue-500/30"
                >
                  Buy Project
                </Button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-blue-300 hover:bg-blue-500/10"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-gradient-to-b from-blue-950/95 to-[#0a0a1a]/98 border-t border-blue-500/20">
            <div className="container mx-auto px-4 py-4">
              <div className="grid grid-cols-2 gap-2">
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-2 justify-start transition-all duration-200 ${
                      activePage === item.id
                        ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                        : "text-blue-200 hover:bg-blue-500/10 hover:text-blue-300"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Button>
                ))}

                {/* Mobile Royal Buy CTA */}
                <a
                  href="https://dd-products.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="col-span-2 mt-2"
                >
                  <Button className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white font-semibold shadow-lg shadow-blue-500/30">Buy Project</Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content overlap */}
      <div className="h-16"></div>
    </>
  );
};

export default Navigation;