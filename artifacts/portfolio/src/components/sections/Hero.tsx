import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Terminal, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 1,
  duration: Math.random() * 6 + 4,
  delay: Math.random() * 4,
}));

const TYPING_STRINGS = [
  "Je conçois des applications web modernes.",
  "Des solutions performantes et évolutives.",
  "Du code propre, fiable, structuré.",
];

export default function Hero() {
  const [textIndex, setTextIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const cursorRef = useRef(true);

  useEffect(() => {
    const full = TYPING_STRINGS[textIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < full.length) {
      timeout = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 45);
    } else if (!deleting && displayed.length === full.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 28);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setTextIndex((prev) => (prev + 1) % TYPING_STRINGS.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, textIndex]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) * 0.015);
    mouseY.set((e.clientY - rect.top - rect.height / 2) * 0.015);
  }

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      onMouseMove={handleMouseMove}
      data-testid="section-hero"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-grid opacity-100 pointer-events-none" />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.12),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background pointer-events-none" />

      {/* Floating particles */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: 0.3 + Math.random() * 0.3,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Parallax blob */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary)/0.08) 0%, transparent 70%)",
          x: smoothX,
          y: smoothY,
          left: "50%",
          top: "50%",
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/60 border border-border/60 text-sm font-mono text-muted-foreground mb-10 backdrop-blur-sm"
        >
          <Terminal className="w-3.5 h-3.5 text-primary" />
          <span>System.init()</span>
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-4 leading-none"
          data-testid="text-hero-name"
        >
          <span className="text-foreground">SERGIO </span>
          <motion.span
            className="text-primary glow-text inline-block"
            animate={{ filter: ["drop-shadow(0 0 8px hsl(199 89% 48% / 0.5))", "drop-shadow(0 0 20px hsl(199 89% 48% / 0.8))", "drop-shadow(0 0 8px hsl(199 89% 48% / 0.5))"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            AHOUANGONOU
          </motion.span>
        </motion.h1>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
          className="text-xl md:text-3xl text-muted-foreground font-mono mb-10 tracking-widest uppercase"
        >
          Développeur Web Full Stack
        </motion.h2>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="h-12 mb-6 flex items-center justify-center"
        >
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto font-light">
            {displayed}
            <motion.span
              className="text-primary font-bold"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              |
            </motion.span>
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
          className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto mb-14 border-l-2 border-primary pl-4 text-left"
        >
          Profil technique avec une base en systèmes électroniques et embarqués.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <motion.a
            href="#projects"
            data-testid="link-voir-projets"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="group relative px-8 py-4 bg-primary text-primary-foreground font-mono font-semibold rounded-lg overflow-hidden glow-border"
          >
            <motion.div
              className="absolute inset-0 bg-white/20 -skew-x-12"
              initial={{ x: "-120%" }}
              whileHover={{ x: "120%" }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative flex items-center gap-2">
              Voir mes projets
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.a>

          <motion.a
            href="#contact"
            data-testid="link-me-contacter"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="animated-border px-8 py-4 bg-secondary/60 text-foreground font-mono font-semibold rounded-lg border border-border hover:border-primary/50 hover:bg-secondary/80 transition-all duration-300 backdrop-blur-sm"
          >
            Me contacter
          </motion.a>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1 text-muted-foreground/50"
          >
            <span className="text-xs font-mono tracking-widest">SCROLL</span>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
