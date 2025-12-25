import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, User, Code, GraduationCap, Mail, Bot } from "lucide-react";

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
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-primary/20 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer transition-all duration-200" onClick={() => handleNavClick("hero")}>
              <div className="w-10 h-10 rounded-full hero-gradient flex items-center justify-center text-white font-bold">
                DB
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
                      ? "bg-primary/20 text-primary"
                      : "hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {item.icon}
                  <span className="hidden lg:inline">{item.label}</span>
                </Button>
              ))}

              {/* Buy Project CTA */}
              <a
                href="https://dd-products.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2"
              >
                <Button
                  size="sm"
                  className="hero-gradient text-white px-4 py-2 hover:scale-105 transition-transform duration-200"
                >
                  Buy Project
                </Button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden glass-card border-t border-primary/20">
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
                        ? "bg-primary/20 text-primary"
                        : "hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Button>
                ))}

                {/* Mobile Buy CTA */}
                <a
                  href="https://dd-products.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="col-span-2 mt-2"
                >
                  <Button className="w-full hero-gradient text-white">Buy Project</Button>
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