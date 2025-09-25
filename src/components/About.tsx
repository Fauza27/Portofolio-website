import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Sparkles, Download, Code, Award, Globe } from "lucide-react";
import profileImage from "@/assets/profile-image.jpg";

export const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    {
      icon: Code,
      number: 2,
      label: "TOTAL PROJECTS",
      description: "Crafting Smart Solutions with AI & Machine Learning",
    },
    {
      icon: Award,
      number: 18,
      label: "CERTIFICATES",
      description: "Professional skills validated",
    },
    {
      icon: Globe,
      number: 0,
      label: "YEARS OF EXPERIENCE",
      description: "Continuous learning journey",
    },
  ];

  const CountUp = ({ end, duration = 2 }: { end: number; duration?: number }) => {
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
      if (!inView) return;

      let startTime: number;
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / (duration * 1000);

        if (progress < 1) {
          setCount(Math.floor(end * progress));
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      requestAnimationFrame(animate);
    }, [inView, end, duration]);

    return <span>{count}</span>;
  };

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
    <section id="about" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold text-gradient mb-6">About Me</h2>
          <div className="flex items-center justify-center gap-4 text-primary">
            <Sparkles className="w-5 h-5" />
            <p className="text-lg font-medium">Passionate Learner | AI Enthusiast | Future Innovator</p>
            <Sparkles className="w-5 h-5" />
          </div>
        </motion.div>

        {/* About Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Text Content */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }} className="space-y-6">
            <div>
              <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                Hello, I'm
                <br />
                <span className="text-primary">Muhammad Fauza</span>
              </h3>
              <p className="text-lg text-muted leading-relaxed">
                I am an Informatics Engineering student with a strong passion for Artificial Intelligence, Machine Learning, and modern software development. I enjoy exploring algorithms and applying them to real-world problems, from
                building prediction systems and AI-powered chatbots to developing scalable web applications. Currently, I am working on projects that integrate technologies such as LangChain, AWS Bedrock, Qdrant, Next.js, TensorFlow, and
                PyTorch or Tensorflow to create intelligent and user-friendly solutions.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <motion.a href="/img/CV Utama Inggris.pdf" download className="btn-glow flex items-center gap-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Download className="w-4 h-4" />
                Download CV
              </motion.a>
              <motion.button onClick={() => scrollToSection("portfolio")} className="btn-glass flex items-center gap-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Code className="w-4 h-4" />
                View Projects
              </motion.button>
            </div>
          </motion.div>

          {/* Profile Image */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }} className="flex justify-center">
            <div className="relative">
              <motion.img src={profileImage} alt="Muhammad Fauza Profile" className="w-80 h-80 object-cover rounded-full border-4 border-primary/20 shadow-glow" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} />
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute -inset-4 border-2 border-primary/30 rounded-full" />
            </div>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <motion.div initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.6 }} className="grid md:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }} className="glass-card-hover p-8 text-center group">
                <div className="w-16 h-16 mx-auto mb-4 glass-card flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Icon className="w-8 h-8" />
                </div>
                <h4 className="text-4xl font-bold text-gradient mb-2">
                  <CountUp end={stat.number} />
                </h4>
                <p className="font-semibold text-foreground mb-2">{stat.label}</p>
                <p className="text-sm text-muted">{stat.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
