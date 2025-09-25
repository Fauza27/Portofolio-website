import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github, Code, Lightbulb, Zap } from "lucide-react";
import { projects } from "@/data/projects";

export const ProjectDetail = () => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gradient mb-4">Project Not Found</h1>
          <Link to="/" className="btn-glass inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-background/95 to-primary/5" />
      
      <div className="relative z-10">
        {/* Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-6 py-8"
        >
          <Link 
            to="/" 
            className="btn-glass inline-flex items-center gap-2 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </motion.div>

        {/* Project Content */}
        <div className="container mx-auto px-6 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            {/* Project Header */}
            <div className="glass-card p-8 mb-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs px-3 py-1 bg-primary/20 text-primary rounded-full">
                      {project.category}
                    </span>
                  </div>
                  <h1 className="text-4xl font-bold text-gradient mb-4">
                    {project.title}
                  </h1>
                  <p className="text-muted text-lg leading-relaxed mb-6">
                    {project.description}
                  </p>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <motion.a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-glass flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </motion.a>
                    <motion.a
                      href={project.detailsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-glass flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Github className="w-4 h-4" />
                      Source Code
                    </motion.a>
                  </div>
                </div>
                
                <div className="relative">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="overflow-hidden rounded-2xl shadow-2xl"
                  >
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-auto"
                    />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Technologies & Tools */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-card p-8 mb-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 glass-card flex items-center justify-center text-primary">
                  <Code className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-gradient">Tools & Technologies</h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {project.technologies.map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className="glass-card-hover p-4 text-center"
                  >
                    <span className="font-medium text-foreground">{tech}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Project Features */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="glass-card p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 glass-card flex items-center justify-center text-primary">
                  <Zap className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-gradient">Key Features</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {project.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    className="flex items-start gap-3 p-4 glass-card-hover"
                  >
                    <div className="w-6 h-6 flex items-center justify-center text-primary mt-1">
                      <Lightbulb className="w-4 h-4" />
                    </div>
                    <span className="text-foreground leading-relaxed">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};