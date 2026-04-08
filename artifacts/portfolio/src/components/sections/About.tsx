import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Code2, Cpu, Zap, BookOpen } from "lucide-react";
import { useRef } from "react";

const stats = [
  { label: "Projets réalisés", value: "12+" },
  { label: "Technologies maîtrisées", value: "15+" },
  { label: "Mois d'alternance", value: "18+" },
  { label: "Commits GitHub", value: "500+" },
];

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 25 });

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
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-28 relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border/50" />
          <h2 className="text-3xl md:text-4xl font-black text-foreground whitespace-nowrap">
            <span className="text-primary">01.</span> À propos
          </h2>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border/50" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-6"
          >
            <p className="text-muted-foreground leading-relaxed text-base">
              Je suis développeur web passionné par la création d'applications modernes avec{" "}
              <span className="text-primary font-mono font-semibold">JavaScript, Node.js et Laravel</span>.
            </p>
            <p className="text-muted-foreground leading-relaxed text-base">
              Mon parcours en{" "}
              <span className="text-accent font-medium">électrotechnique</span>{" "}
              m'a permis de développer une forte capacité d'analyse et une compréhension des systèmes techniques, que j'applique aujourd'hui dans le développement logiciel.
            </p>
            <p className="text-muted-foreground leading-relaxed text-base">
              Actuellement en alternance, je continue de renforcer mes compétences et de travailler sur des projets concrets, comblant le fossé entre le matériel et le logiciel.
            </p>

            {/* Icon badges */}
            <motion.div
              className="flex flex-wrap gap-3 pt-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {[
                { icon: <Code2 className="w-4 h-4" />, label: "Web Dev" },
                { icon: <Cpu className="w-4 h-4" />, label: "Hardware" },
                { icon: <Zap className="w-4 h-4" />, label: "Performance" },
                { icon: <BookOpen className="w-4 h-4" />, label: "En alternance" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/40 border border-border/60 text-sm font-mono text-foreground/80 hover:border-primary/50 hover:text-primary transition-all cursor-default"
                >
                  <span className="text-primary">{item.icon}</span>
                  {item.label}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: avatar + stats */}
          <div className="space-y-8">
            <TiltCard className="relative mx-auto w-full max-w-xs aspect-square cursor-pointer">
              <div className="absolute inset-0 bg-primary/15 rounded-full blur-3xl" />
              <div className="relative h-full w-full rounded-2xl border border-primary/25 bg-secondary/60 backdrop-blur-sm overflow-hidden flex items-center justify-center glow-box">
                <div className="absolute inset-0 bg-grid opacity-20" />
                {/* Geometric avatar */}
                <svg viewBox="0 0 200 200" className="w-40 h-40 text-primary/40" fill="none">
                  <circle cx="100" cy="75" r="35" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M40 180 Q100 120 160 180" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <rect x="20" y="20" width="30" height="2" fill="currentColor" opacity="0.4" />
                  <rect x="150" y="20" width="30" height="2" fill="currentColor" opacity="0.4" />
                  <rect x="20" y="178" width="30" height="2" fill="currentColor" opacity="0.4" />
                  <rect x="150" y="178" width="30" height="2" fill="currentColor" opacity="0.4" />
                  <rect x="20" y="20" width="2" height="30" fill="currentColor" opacity="0.4" />
                  <rect x="178" y="20" width="2" height="30" fill="currentColor" opacity="0.4" />
                  <rect x="20" y="150" width="2" height="30" fill="currentColor" opacity="0.4" />
                  <rect x="178" y="150" width="2" height="30" fill="currentColor" opacity="0.4" />
                </svg>
                {/* Corner accents */}
                <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-primary/60" />
                <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-primary/60" />
              </div>
            </TiltCard>

            {/* Stats grid */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, staggerChildren: 0.1 }}
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  whileHover={{ scale: 1.04, borderColor: "hsl(var(--primary) / 0.5)" }}
                  className="p-4 rounded-xl bg-secondary/30 border border-border/50 text-center cursor-default"
                  data-testid={`stat-${i}`}
                >
                  <div className="text-2xl font-black text-primary font-display glow-text">{stat.value}</div>
                  <div className="text-xs text-muted-foreground font-mono mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
