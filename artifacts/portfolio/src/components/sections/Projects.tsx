import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, ExternalLink, FolderGit2 } from "lucide-react";
import { useRef } from "react";

const projects = [
  {
    title: "WebApp Pro",
    description: "Application full stack moderne avec gestion d'état avancée et API RESTful complète. Architecture microservices avec authentification JWT.",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "E-commerce Dashboard",
    description: "Panneau d'administration complet pour la gestion des commandes, des produits et des utilisateurs avec tableaux de bord analytiques.",
    stack: ["Vue.js", "Laravel", "Tailwind CSS", "MySQL"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "IoT Monitor",
    description: "Système de surveillance en temps réel connectant des capteurs matériels à un tableau de bord web via WebSockets.",
    stack: ["Arduino", "Node.js", "WebSockets", "React"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Portfolio API",
    description: "API REST robuste avec authentification, validation des données, documentation Swagger et tests automatisés.",
    stack: ["Express", "TypeScript", "PostgreSQL", "Prisma"],
    liveUrl: "#",
    githubUrl: "#",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 200, damping: 30 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-testid={`card-project-${index}`}
      className="animated-border group relative flex flex-col p-8 rounded-2xl bg-card border border-border/60 hover:border-primary/50 transition-all duration-400 glow-box cursor-default"
    >
      {/* Glow fill on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, hsl(var(--primary) / 0.07), transparent 70%)",
          opacity: 0,
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />

      <div className="flex justify-between items-start mb-6">
        <motion.div
          whileHover={{ rotate: 15, scale: 1.15 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <FolderGit2 className="w-10 h-10 text-primary" strokeWidth={1.5} />
        </motion.div>
        <div className="flex gap-3">
          <motion.a
            href={project.githubUrl}
            whileHover={{ scale: 1.2, color: "hsl(var(--primary))" }}
            className="text-muted-foreground hover:text-primary transition-colors"
            data-testid={`link-github-${index}`}
          >
            <Github className="w-5 h-5" />
          </motion.a>
          <motion.a
            href={project.liveUrl}
            whileHover={{ scale: 1.2, color: "hsl(var(--primary))" }}
            className="text-muted-foreground hover:text-primary transition-colors"
            data-testid={`link-live-${index}`}
          >
            <ExternalLink className="w-5 h-5" />
          </motion.a>
        </div>
      </div>

      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 font-display">
        {project.title}
      </h3>

      <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto">
        {project.stack.map((tech, i) => (
          <span
            key={i}
            className="px-2.5 py-1 text-xs rounded-md bg-primary/8 text-primary border border-primary/20 font-mono"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-28 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border/50" />
          <h2 className="text-3xl md:text-4xl font-black text-foreground whitespace-nowrap">
            <span className="text-primary">03.</span> Projets Récents
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
