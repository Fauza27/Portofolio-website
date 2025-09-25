import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Sparkles, FileText, Mail, Github, Linkedin } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

export const Hero = () => {
  const techStack = ["Langchain", "TensorFlow", "FastAPI", "Next.js"];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Galaxy Background Effects */}
      <div className="absolute inset-0 star-field opacity-30" />

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-8">
            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 glass-card px-4 py-2 text-sm text-primary">
              <Sparkles className="w-4 h-4" />
              <span>Ready to Innovate</span>
            </motion.div>

            {/* Animated Title */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <TypeAnimation sequence={["Data Scientist", 2000, "AI/ML Engineer", 2000]} wrapper="span" speed={50} className="text-gradient" repeat={Infinity} />
              </h1>
            </div>

            {/* Description */}
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg lg:text-xl text-muted max-w-2xl leading-relaxed">
              Analyzing data, developing predictive models, as well as designing and implementing AI & Machine Learning solutions to efficiently and impactfully solve real-world problems.
            </motion.p>

            {/* Tech Stack Pills */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-wrap gap-3">
              {techStack.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="glass-card px-4 py-2 text-sm font-medium text-foreground hover:bg-primary/20 hover:border-primary/40 transition-all duration-300"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="flex flex-wrap gap-4">
              <button onClick={() => scrollToSection("Portfolio")} className="btn-glow flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Projects
              </button>
              <button onClick={() => scrollToSection("contact")} className="btn-glass flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Contact
              </button>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="relative">
            <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="relative z-10">
              <img src={heroImage} alt="AI/ML Development Illustration" className="w-full max-w-lg mx-auto rounded-2xl shadow-elevated" />
            </motion.div>

            {/* Decorative Elements */}
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute -top-4 -right-4 w-20 h-20 border-2 border-primary/30 rounded-full" />
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute -bottom-4 -left-4 w-16 h-16 border-2 border-secondary/30 rounded-full" />
          </motion.div>
        </div>

        {/* Social Links */}
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="absolute bottom-8 left-6 flex gap-4">
          <motion.a
            href="https://github.com/Fauza27"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card w-12 h-12 flex items-center justify-center text-foreground hover:text-primary hover:bg-primary/20 transition-all duration-300"
            whileHover={{ scale: 1.1, y: -5 }}
          >
            <Github className="w-5 h-5" />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/muhammad-fauza/"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card w-12 h-12 flex items-center justify-center text-foreground hover:text-primary hover:bg-primary/20 transition-all duration-300"
            whileHover={{ scale: 1.1, y: -5 }}
          >
            <Linkedin className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
