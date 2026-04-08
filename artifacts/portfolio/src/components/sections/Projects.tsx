import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, ExternalLink, FolderGit2, Info, X, CheckCircle2, Monitor } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Project {
  title: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  stack: string[];
  liveUrl: string;
  githubUrl: string;
  demo?: string;
}

const projects: Project[] = [
  {
    title: "WebApp Pro",
    shortDesc: "Application full stack moderne avec API RESTful et authentification JWT.",
    fullDesc: "WebApp Pro est une application full stack complète construite avec React et Node.js. Elle propose une gestion d'état avancée via Redux Toolkit, une API RESTful documentée avec Swagger, une authentification JWT sécurisée, ainsi qu'un dashboard analytique en temps réel.",
    features: [
      "Authentification JWT avec refresh tokens",
      "Dashboard analytique en temps réel",
      "API RESTful documentée avec Swagger",
      "Gestion d'état avancée via Redux Toolkit",
      "Tests unitaires et d'intégration",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "Redux", "JWT", "Swagger"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "E-commerce Dashboard",
    shortDesc: "Panneau d'administration complet pour la gestion des commandes et produits.",
    fullDesc: "Un tableau de bord e-commerce complet développé avec Vue.js et Laravel. Il inclut la gestion des commandes, des produits et des utilisateurs, des graphiques analytiques, une gestion des stocks, un système de notification en temps réel et une interface d'administration intuitive.",
    features: [
      "Gestion complète des commandes et produits",
      "Graphiques analytiques avec Chart.js",
      "Système de notification en temps réel",
      "Gestion des stocks avec alertes",
      "Export des données en CSV/PDF",
    ],
    stack: ["Vue.js", "Laravel", "Tailwind CSS", "MySQL", "Chart.js", "Redis"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "IoT Monitor",
    shortDesc: "Surveillance en temps réel de capteurs matériels via WebSockets.",
    fullDesc: "IoT Monitor est un système de surveillance connectant des capteurs Arduino à un tableau de bord web via WebSockets. Les données de température, humidité et pression sont collectées en temps réel, visualisées en graphiques et déclenchent des alertes automatiques en cas d'anomalie.",
    features: [
      "Connexion WebSocket en temps réel",
      "Visualisation de données multi-capteurs",
      "Système d'alertes automatiques",
      "Historique des données persisté",
      "Interface responsive mobile-first",
    ],
    stack: ["Arduino", "Node.js", "WebSockets", "React", "Chart.js", "PostgreSQL"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Portfolio API",
    shortDesc: "API REST robuste avec validation, Swagger et documentation complète.",
    fullDesc: "Une API REST robuste et bien documentée construite avec Express et TypeScript. Elle inclut une validation stricte des données via Zod, une documentation interactive Swagger/OpenAPI, un système de logging avec Pino, des tests automatisés et un pipeline CI/CD complet.",
    features: [
      "Validation stricte avec Zod",
      "Documentation Swagger/OpenAPI interactive",
      "Logging structuré avec Pino",
      "Tests avec Jest + Supertest",
      "Pipeline CI/CD via GitHub Actions",
    ],
    stack: ["Express", "TypeScript", "PostgreSQL", "Prisma", "Zod", "Jest", "Docker"],
    liveUrl: "#",
    githubUrl: "#",
  },
];

function ProjectModal({ project, open, onClose }: { project: Project; open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl bg-card border border-border/60 p-0 overflow-hidden">
        {/* Header band */}
        <div className="relative bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border/50 px-8 py-6">
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <DialogHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FolderGit2 className="w-5 h-5 text-primary" />
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Projet</span>
                </div>
                <DialogTitle className="text-2xl font-black text-foreground font-display">
                  {project.title}
                </DialogTitle>
              </div>
            </div>
          </DialogHeader>
        </div>

        <div className="px-8 py-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Description */}
          <div>
            <h4 className="text-xs font-mono text-primary uppercase tracking-widest mb-2">Description</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">{project.fullDesc}</p>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-xs font-mono text-primary uppercase tracking-widest mb-3">Fonctionnalités</h4>
            <ul className="space-y-2">
              {project.features.map((f, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  {f}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Tech stack */}
          <div>
            <h4 className="text-xs font-mono text-primary uppercase tracking-widest mb-3">Stack technique</h4>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="px-3 py-1.5 text-xs rounded-md bg-primary/10 text-primary border border-primary/25 font-mono"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Demo preview placeholder */}
          <div>
            <h4 className="text-xs font-mono text-primary uppercase tracking-widest mb-3">Aperçu</h4>
            <div className="rounded-xl overflow-hidden border border-border/60 bg-secondary/40 aspect-video flex items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-muted-foreground/50">
                <Monitor className="w-10 h-10" />
                <span className="text-xs font-mono">Aperçu disponible en live</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-primary-foreground font-mono font-semibold text-sm glow-border"
              data-testid="link-modal-demo"
            >
              <ExternalLink className="w-4 h-4" />
              Voir la démo live
            </motion.a>
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-secondary/60 text-foreground border border-border/60 hover:border-primary/40 font-mono font-semibold text-sm transition-all"
              data-testid="link-modal-github"
            >
              <Github className="w-4 h-4" />
              Code source
            </motion.a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 200, damping: 30 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleMouseLeave() { x.set(0); y.set(0); }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-testid={`card-project-${index}`}
      className="animated-border group relative flex flex-col p-8 rounded-2xl bg-card border border-border/60 hover:border-primary/50 transition-all duration-300 glow-box"
    >
      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ background: "radial-gradient(circle at center, hsl(var(--primary) / 0.06), transparent 70%)" }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />

      <div className="flex justify-between items-start mb-6">
        <motion.div whileHover={{ rotate: 15, scale: 1.15 }} transition={{ type: "spring", stiffness: 300 }}>
          <FolderGit2 className="w-10 h-10 text-primary" strokeWidth={1.5} />
        </motion.div>
        <div className="flex gap-3">
          <motion.a
            href={project.githubUrl}
            whileHover={{ scale: 1.2 }}
            className="text-muted-foreground hover:text-primary transition-colors"
            data-testid={`link-github-${index}`}
          >
            <Github className="w-5 h-5" />
          </motion.a>
          <motion.a
            href={project.liveUrl}
            whileHover={{ scale: 1.2 }}
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
        {project.shortDesc}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.stack.slice(0, 4).map((tech, i) => (
          <span key={i} className="px-2.5 py-1 text-xs rounded-md bg-primary/8 text-primary border border-primary/20 font-mono">
            {tech}
          </span>
        ))}
        {project.stack.length > 4 && (
          <span className="px-2.5 py-1 text-xs rounded-md bg-secondary/60 text-muted-foreground border border-border/40 font-mono">
            +{project.stack.length - 4}
          </span>
        )}
      </div>

      {/* Detail button */}
      <motion.button
        onClick={onOpen}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        data-testid={`button-details-${index}`}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-border/60 hover:border-primary/50 bg-secondary/30 hover:bg-primary/5 text-muted-foreground hover:text-primary text-sm font-mono transition-all duration-300"
      >
        <Info className="w-4 h-4" />
        Voir les détails
      </motion.button>
    </motion.div>
  );
}

export default function Projects() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
            <ProjectCard
              key={index}
              project={project}
              index={index}
              onOpen={() => setOpenIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {openIndex !== null && (
        <ProjectModal
          project={projects[openIndex]}
          open={openIndex !== null}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </section>
  );
}
