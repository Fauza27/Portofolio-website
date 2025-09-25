import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code, Award, Layers, ExternalLink, Github, Eye, X, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { certificates } from "@/data/certificates";
import { techStack } from "@/data/techstack";

export const Portfolio = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const tabs = [
    { id: "projects", label: "Projects", icon: Code },
    { id: "certificates", label: "Certificates", icon: Award },
    { id: "techstack", label: "Tech Stack", icon: Layers }
  ];

  const ProjectsTab = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grid md:grid-cols-2 gap-8"
    >
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="glass-card-hover p-6 group"
        >
          <div className="mb-4 overflow-hidden rounded-xl">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => (
              <span key={tech} className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-md">
                {tech}
              </span>
            ))}
          </div>

          <h3 className="text-xl font-bold text-gradient mb-3">{project.title}</h3>
          <p className="text-muted text-sm mb-4 line-clamp-3">{project.description}</p>

          <div className="flex gap-2 flex-wrap">
            <motion.a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass text-sm flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
            >
              <ExternalLink className="w-3 h-3" />
              Live Demo
            </motion.a>
            <motion.a
              href={project.detailsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass text-sm flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
            >
              <Github className="w-3 h-3" />
              Details
            </motion.a>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to={`/projects/${project.slug}`}
                className="btn-glass text-sm flex items-center gap-1"
              >
                <FileText className="w-3 h-3" />
                Explanation
              </Link>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );

  const CertificatesTab = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {certificates.map((cert, index) => (
        <motion.div
          key={cert.credential}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.05 }}
          className="glass-card-hover p-6 group cursor-pointer"
          onClick={() => setSelectedCertificate(cert)}
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 glass-card flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <Award className="w-6 h-6" />
            </div>
            <button className="glass-card px-3 py-1 text-xs text-primary hover:bg-primary hover:text-white transition-all duration-300">
              <Eye className="w-3 h-3 inline mr-1" />
              View Fullscreen
            </button>
          </div>
          
          <h3 className="font-semibold text-foreground mb-2 text-sm leading-tight">{cert.title}</h3>
          <p className="text-primary text-sm font-medium mb-1">{cert.issuer}</p>
          <p className="text-muted text-xs mb-2">{cert.date}</p>
          <p className="text-muted text-xs">{cert.credential}</p>
        </motion.div>
      ))}
    </motion.div>
  );

  const TechStackTab = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
    >
      {techStack.map((tech, index) => (
        <motion.div
          key={tech.name}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          className="glass-card-hover p-4 text-center group"
        >
          <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center">
            <img 
              src={tech.icon} 
              alt={tech.name}
              className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <span className="text-sm font-medium text-foreground">{tech.name}</span>
        </motion.div>
      ))}
    </motion.div>
  );

  return (
    <section id="portfolio" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-gradient mb-6">Portfolio Showcase</h2>
          <p className="text-lg text-muted max-w-3xl mx-auto">
            Explore my journey through projects, certifications, and technical expertise. 
            Each section represents a milestone in my continuous learning path.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="glass-card p-2 flex gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-primary text-white shadow-glow"
                      : "text-muted hover:text-foreground hover:bg-primary/10"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <div key={activeTab}>
            {activeTab === "projects" && <ProjectsTab />}
            {activeTab === "certificates" && <CertificatesTab />}
            {activeTab === "techstack" && <TechStackTab />}
          </div>
        </AnimatePresence>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCertificate(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="glass-card max-w-4xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gradient">{selectedCertificate.title}</h3>
                  <button
                    onClick={() => setSelectedCertificate(null)}
                    className="glass-card w-10 h-10 flex items-center justify-center text-muted hover:text-foreground"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <img 
                  src={selectedCertificate.image} 
                  alt={selectedCertificate.title}
                  className="w-full h-auto rounded-xl"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};