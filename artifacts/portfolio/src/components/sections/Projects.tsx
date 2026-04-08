import { motion } from "framer-motion";
import { Github, ExternalLink, FolderGit2 } from "lucide-react";

const projects = [
  {
    title: "WebApp Pro",
    description: "Application full stack moderne avec gestion d'état complexe et API RESTful.",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "E-commerce Dashboard",
    description: "Panneau d'administration complet pour la gestion des commandes, des produits et des utilisateurs.",
    stack: ["Vue.js", "Laravel", "Tailwind CSS", "MySQL"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "IoT Monitor",
    description: "Système de surveillance en temps réel connectant des capteurs matériels à un tableau de bord web.",
    stack: ["Arduino", "Node.js", "WebSockets", "React"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "Portfolio API",
    description: "API REST robuste avec authentification, validation et documentation Swagger.",
    stack: ["Express", "TypeScript", "PostgreSQL", "Prisma"],
    liveUrl: "#",
    githubUrl: "#"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="h-[1px] flex-1 bg-border/50" />
          <h2 className="text-3xl md:text-4xl font-bold font-display text-white">
            <span className="text-primary">03.</span> Projets Récents
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col p-8 rounded-2xl bg-secondary/30 border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
              
              <div className="flex justify-between items-start mb-6">
                <FolderGit2 className="w-10 h-10 text-primary" />
                <div className="flex gap-4">
                  <a href={project.githubUrl} className="text-muted-foreground hover:text-primary transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href={project.liveUrl} className="text-muted-foreground hover:text-primary transition-colors">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                {project.description}
              </p>

              <ul className="flex flex-wrap gap-3 mt-auto font-mono text-xs text-primary/80">
                {project.stack.map((tech, i) => (
                  <li key={i}>{tech}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
