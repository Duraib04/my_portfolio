import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Contact from "@/components/Contact";
import FloatingChatWidget from "@/components/FloatingChatWidget";

const ContactPage = () => {
  const [activePage, setActivePage] = useState("contact");
  const navigate = useNavigate();

  const handlePageChange = (pageId: string) => {
    setActivePage(pageId);
    const routes: Record<string, string> = {
      hero: "/",
      about: "/about",
      skills: "/skills",
      projects: "/projects",
      education: "/education",
      "ai-chat": "/chat",
      contact: "/contact"
    };
    if (routes[pageId]) {
      navigate(routes[pageId]);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation activePage={activePage} onPageChange={handlePageChange} />
      <main>
        <Contact />
      </main>
      <FloatingChatWidget />
      
      <footer className="py-8 px-4 border-t border-primary/20 glass-card">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 Durai B. Built with passion and modern web technologies.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;
