import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import PersonalChatAgent from "@/components/PersonalChatAgent";
import Contact from "@/components/Contact";
import FloatingChatWidget from "@/components/FloatingChatWidget";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main>
        <section id="hero">
          <Hero />
        </section>
        
        <section id="about">
          <About />
        </section>
        
        <section id="skills">
          <Skills />
        </section>
        
        <section id="projects">
          <Projects />
        </section>
        
        <section id="education">
          <Education />
        </section>
        
        <section id="ai-chat">
          <PersonalChatAgent />
        </section>
        
        <section id="contact">
          <Contact />
        </section>
      </main>
      
      {/* Footer */}
      <footer className="py-8 px-4 border-t border-primary/20 glass-card">
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
