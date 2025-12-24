import { useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import PersonalChatAgent from "@/components/PersonalChatAgent";
import Contact from "@/components/Contact";
import FloatingChatWidget from "@/components/FloatingChatWidget";
import MinecraftBackground from "@/components/MinecraftBackground";

const Index = () => {
  const [activePage, setActivePage] = useState("hero");
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePageChange = (pageId: string) => {
    if (pageId === activePage) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setActivePage(pageId);
      setTimeout(() => setIsAnimating(false), 50);
    }, 300);
  };

  const renderPage = () => {
    const pageClass = `transition-all duration-300 ${
      isAnimating ? 'opacity-0 translate-y-8 scale-95' : 'opacity-100 translate-y-0 scale-100'
    }`;

    switch (activePage) {
      case "hero":
        return <div className={pageClass}><Hero /></div>;
      case "about":
        return <div className={pageClass}><About /></div>;
      case "skills":
        return <div className={pageClass}><Skills /></div>;
      case "projects":
        return <div className={pageClass}><Projects /></div>;
      case "education":
        return <div className={pageClass}><Education /></div>;
      case "ai-chat":
        return <div className={pageClass}><PersonalChatAgent /></div>;
      case "contact":
        return <div className={pageClass}><Contact /></div>;
      default:
        return <div className={pageClass}><Hero /></div>;
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Minecraft World Background */}
      <MinecraftBackground />
      
      <Navigation activePage={activePage} onPageChange={handlePageChange} />
      
      <main className="min-h-[calc(100vh-8rem)] relative z-10">
        {renderPage()}
      </main>
      
      {/* Footer */}
      <footer className="py-8 px-4 border-t border-primary/20 glass-card relative z-10">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 Durai B. Built with passion and modern web technologies.
          </p>
        </div>
      </footer>

      {/* Floating Chat Widget */}
      <FloatingChatWidget />
    </div>
  );
};

export default Index;
