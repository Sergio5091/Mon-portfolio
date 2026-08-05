import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, FolderGit2, Info, X, CheckCircle2, Monitor, ChevronLeft, ChevronRight } from "lucide-react";
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
  image?: string;
  images?: string[];
}

const projects: Project[] = [
  {
    title: "INOVA MAKERS",
    shortDesc: "Plateforme e-commerce full-stack dédiée à l’ingénierie et aux solutions IoT avec dashboard admin.",
    fullDesc: "INOVA MAKERS est une application full-stack moderne combinant e-commerce et solutions technologiques innovantes. Elle intègre un système complet de gestion de produits, commandes et utilisateurs, ainsi qu’un dashboard administrateur avec statistiques en temps réel. L’application met l’accent sur la performance, la sécurité et une expérience utilisateur fluide.",
    features: [
      "Catalogue produits avec recherche et filtres",
      "Panier dynamique et gestion des commandes",
      "Authentification sécurisée avec rôles (admin/client)",
      "Dashboard admin avec analytics et gestion des stocks",
      "API REST sécurisée avec gestion des utilisateurs",
    ],
    stack: ["Next.js", "Node.js", "Express", "MySQL", "JWT", "TailwindCSS", "TypeScript"],
    liveUrl: "https://www.inovamakers.io/",
    githubUrl: "https://github.com/Sergio5091/innova-maker",
    image: "/inova-maker.png",
  },
  {
    title: "SWITCH SAB",
    shortDesc: "Système de gestion de salle de jeux vidéo avec pilotage hardware Arduino via port série USB.",
    fullDesc: "Switch SAB est une application fullstack locale déployée sur mini-PC en salle, conçue pour automatiser la gestion des postes gaming (PS4, PS5, Xbox) via un switch multi-relais Arduino branché en USB. L'admin configure la salle, les postes, les tarifs et les gérants. Le gérant démarre des sessions chronométrées pour les clients avec décompte en temps réel et extinction automatique du poste à la fin. Le client consulte son crédit, ses sessions et recharge via coupon. Le switch USB coupe physiquement l'alimentation de la TV à la fin de chaque session — sans intervention humaine.",
    features: [
      "Pilotage hardware via port série (serialport, 9600 baud) avec resynchronisation automatique des relais",
      "Détection hot-plug du switch et reconfiguration du port en temps réel via Socket.io",
      "Sessions chronométrées avec décompte en temps réel et extinction automatique du poste",
      "Système de licence RSA hors-ligne avec vérification de signature et détection de fraude",
      "Scheduler de sessions avec timers Node.js et reprise au redémarrage serveur",
      "Architecture multi-rôles : Admin / Gérant / Client avec JWT",
      "Rechargement de crédit client via coupons et gestion des tarifs par poste",
    ],
    stack: ["React", "TypeScript", "Tailwind", "shadcn/ui", "Node.js", "Express", "Prisma", "PostgreSQL", "Socket.io", "serialport"],
    liveUrl: "https://switch-sab.vercel.app/",
    githubUrl: "https://github.com/Sergio5091",
    image: "/projects/switch-sab/dashbord-admin.jpeg",
    images: [
      "/projects/switch-sab/dashbord-admin.jpeg",
      "/projects/switch-sab/login-page.jpeg.jpeg",
    ],
  },
  {
    title: "LE BAOBAB",
    shortDesc: "Site vitrine restaurant — menu en ligne, réservation de table et formulaire de contact.",
    fullDesc: "Le Baobab est un site vitrine moderne pour un restaurant, pensé pour offrir une expérience digitale soignée aux clients. Il permet de consulter le menu complet, de réserver une table directement en ligne et de contacter l'établissement via un formulaire. Le design met en valeur l'identité visuelle du restaurant avec une attention particulière portée à l'ambiance et à la lisibilité.",
    features: [
      "Affichage du menu complet avec catégories et descriptions",
      "Formulaire de réservation de table en ligne",
      "Section contact avec adresse, horaires et formulaire",
      "Design responsive adapté mobile et desktop",
      "Interface soignée reflétant l'identité visuelle du restaurant",
    ],
    stack: ["React", "TypeScript", "TailwindCSS", "shadcn/ui"],
    liveUrl: "https://lebaobab.vercel.app/",
    githubUrl: "https://github.com/Sergio5091",
    image: "/projects/baobab/baobab-hero.jpeg",
    images: [
      "/projects/baobab/baobab-hero.jpeg",
    ],
  },
  {
    title: "GUYZ MAKER",
    shortDesc: "Portfolio d'un ingénieur IoT et électronicien — je construis en public depuis le Bénin pour le monde entier.",
    fullDesc: "Guyz Maker est le portfolio personnel d'un ingénieur IoT et entrepreneur technologique béninois, convaincu que l'Afrique ne doit plus seulement consommer la technologie, mais la concevoir. Le site présente ses projets électroniques, ses compétences en systèmes embarqués et IoT, et sa vision : construire des solutions techniques locales avec un impact global. Un espace où hardware, firmware et passion pour l'innovation se rejoignent.",
    features: [
      "Présentation des projets électroniques et IoT avec détails techniques",
      "Vitrine des compétences en systèmes embarqués, Arduino, ESP32, etc.",
      "Blog et partage de ressources pour la communauté maker africaine",
      "Design moderne reflétant l'identité maker et tech africaine",
      "Section contact et collaboration pour projets IoT",
    ],
    stack: ["React", "TypeScript", "TailwindCSS", "Vite"],
    liveUrl: "https://guyzmaker.me/",
    githubUrl: "https://github.com/Sergio5091",
    image: "/projects/Guyz-maker/porfolio-guyz.jpeg",
    images: [
      "/projects/Guyz-maker/porfolio-guyz.jpeg",
    ],
  },
];

function ImageCarousel({ images, title }: { images: string[]; title: string }) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <>
      <div className="rounded-xl overflow-hidden border border-border/60 bg-secondary/40">
        <div className="relative w-full group/carousel">
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={images[current]}
              alt={`${title} — capture ${current + 1}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
              className="w-full h-auto object-contain block cursor-zoom-in"
              onClick={() => setLightbox(true)}
            />
          </AnimatePresence>

          {/* Bouton plein écran */}
          <button
            onClick={() => setLightbox(true)}
            className="absolute top-2 right-2 p-1.5 rounded-md bg-black/50 hover:bg-black/80 text-white opacity-0 group-hover/carousel:opacity-100 transition-all duration-200"
            aria-label="Voir en plein écran"
            title="Voir en plein écran"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/>
              <path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>
            </svg>
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                aria-label="Image précédente"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                aria-label="Image suivante"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      i === current ? "bg-primary scale-125" : "bg-white/40"
                    }`}
                    aria-label={`Aller à l'image ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Thumbnails si plusieurs images */}
        {images.length > 1 && (
          <div className="flex gap-2 p-3 border-t border-border/40 bg-secondary/20">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`relative w-16 h-10 rounded overflow-hidden border-2 transition-all flex-shrink-0 ${
                  i === current
                    ? "border-primary shadow-[0_0_0_1px_hsl(var(--primary)/0.3)]"
                    : "border-border/40 opacity-60 hover:opacity-100"
                }`}
                aria-label={`Voir capture ${i + 1}`}
              >
                <img src={src} alt={`Miniature ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox plein écran */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/95 flex flex-col items-center justify-center"
            onClick={() => setLightbox(false)}
          >
            {/* Bouton fermer */}
            <button
              onClick={() => setLightbox(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Compteur */}
            {images.length > 1 && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-xs font-mono">
                {current + 1} / {images.length}
              </div>
            )}

            {/* Image */}
            <motion.img
              key={`lb-${current}`}
              src={images[current]}
              alt={`${title} — capture ${current + 1}`}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Navigation lightbox */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Image précédente"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Image suivante"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Thumbnails lightbox */}
            {images.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                    className={`w-20 h-12 rounded overflow-hidden border-2 transition-all ${
                      i === current ? "border-primary" : "border-white/20 opacity-50 hover:opacity-80"
                    }`}
                    aria-label={`Voir capture ${i + 1}`}
                  >
                    <img src={src} alt={`Miniature ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/30 text-xs font-mono mt-2">
              Cliquer en dehors pour fermer
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ProjectModal({ project, open, onClose }: { project: Project; open: boolean; onClose: () => void }) {
  const allImages = project.images ?? (project.image ? [project.image] : []);

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

        <div className="px-8 py-6 space-y-6 max-h-[80vh] overflow-y-auto">
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

          {/* Demo preview */}
          <div>
            <h4 className="text-xs font-mono text-primary uppercase tracking-widest mb-3">
              Aperçu {allImages.length > 1 && <span className="text-muted-foreground normal-case font-sans font-normal">({allImages.length} captures)</span>}
            </h4>
            {allImages.length > 0 ? (
              <ImageCarousel images={allImages} title={project.title} />
            ) : (
              <div className="rounded-xl border border-border/60 bg-secondary/40 py-12 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3 text-muted-foreground/50">
                  <Monitor className="w-10 h-10" />
                  <span className="text-xs font-mono">Aperçu disponible en live</span>
                </div>
              </div>
            )}
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
