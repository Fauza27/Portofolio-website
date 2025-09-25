import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Portfolio } from "@/components/Portfolio";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ParticleBackground } from "@/components/ParticleBackground";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <ScrollProgress />
      
      <Header />
      
      <main>
        <Hero />
        <About />
        <Portfolio />
        <Contact />
      </main>
      
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
