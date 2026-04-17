import { motion, useMotionValue, useSpring, useAnimationControls } from "framer-motion";
import { ArrowRight, Terminal, ChevronDown, Camera } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const PARTICLES = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 1,
  duration: Math.random() * 6 + 5,
  delay: Math.random() * 4,
}));

const TYPING_STRINGS = [
  "Je conçois des applications web modernes.",
  "Des solutions performantes et évolutives.",
  "Du code propre, fiable, structuré.",
];

function PhotoAvatar() {
  const [hovered, setHovered] = useState(false);
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start({
      background: hovered
        ? [
            "conic-gradient(from 0deg, hsl(199 89% 48%), hsl(258 90% 66%), hsl(199 89% 48%))",
            "conic-gradient(from 360deg, hsl(199 89% 48%), hsl(258 90% 66%), hsl(199 89% 48%))",
          ]
        : [
            "conic-gradient(from 0deg, hsl(199 89% 48% / 0.6), hsl(199 89% 48% / 0.2), hsl(199 89% 48% / 0.6))",
            "conic-gradient(from 360deg, hsl(199 89% 48% / 0.6), hsl(199 89% 48% / 0.2), hsl(199 89% 48% / 0.6))",
          ],
      transition: { duration: hovered ? 1.5 : 3, repeat: Infinity, ease: "linear" },
    });
  }, [hovered, controls]);

  return (
    <motion.div
      className="relative mx-auto"
      style={{ width: 280, height: 280 }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Outer ambient glow */}
      <motion.div
        className="absolute inset-[-20px] rounded-full pointer-events-none"
        animate={{
          background: hovered
            ? "radial-gradient(circle, hsl(258 90% 66% / 0.25) 0%, transparent 70%)"
            : "radial-gradient(circle, hsl(199 89% 48% / 0.15) 0%, transparent 70%)",
        }}
        transition={{ duration: 0.8 }}
      />

      {/* Spinning gradient ring */}
      <motion.div
        animate={controls}
        className="absolute inset-[-4px] rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, hsl(199 89% 48% / 0.7), hsl(199 89% 48% / 0.2), hsl(199 89% 48% / 0.7))",
          padding: 3,
          borderRadius: "50%",
        }}
      />

      {/* Inner white separator ring */}
      <div className="absolute inset-0 rounded-full bg-background" style={{ margin: 3 }} />

      {/* Photo container */}
      <motion.div
        className="absolute rounded-full overflow-hidden bg-secondary/80 flex items-center justify-center cursor-pointer"
        style={{ inset: 6 }}
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Subtle grid bg */}
        <div className="absolute inset-0 bg-grid opacity-20" />

        {/* Photo */}
        <img
          src="/avec-fond.jpg"
          alt="Sergio Ahouangonou"
          className="w-full h-full object-cover"
        />

        {/* Hover overlay — color shift */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          animate={{
            background: hovered
              ? "linear-gradient(135deg, hsl(258 90% 66% / 0.2), hsl(199 89% 48% / 0.1))"
              : "transparent",
          }}
          transition={{ duration: 0.5 }}
        />

      </motion.div>

      {/* Status badge */}
      <motion.div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full bg-background border border-border shadow-lg text-xs font-mono text-muted-foreground whitespace-nowrap"
        animate={{ y: hovered ? -4 : 0 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        Disponible
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const [textIndex, setTextIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

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
    mouseX.set((e.clientX - rect.left - rect.width / 2) * 0.012);
    mouseY.set((e.clientY - rect.top - rect.height / 2) * 0.012);
  }

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      onMouseMove={handleMouseMove}
      data-testid="section-hero"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_30%_50%,hsl(var(--primary)/0.1),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_50%,hsl(var(--accent)/0.07),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />

      {/* Floating particles */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary pointer-events-none"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -18, 0], opacity: [0.15, 0.5, 0.15] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Parallax blob */}
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary)/0.07) 0%, transparent 70%)",
          x: smoothX, y: smoothY,
          left: "30%", top: "50%",
          translateX: "-50%", translateY: "-50%",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">

          {/* Left: text content */}
          <div className="flex flex-col justify-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/60 border border-border/60 text-sm font-mono text-muted-foreground mb-8 w-fit backdrop-blur-sm"
            >
              <Terminal className="w-3.5 h-3.5 text-primary" />
              <span>System.init()</span>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4 leading-none"
              data-testid="text-hero-name"
            >
              <span className="text-foreground block">SERGIO</span>
              <motion.span
                className="text-primary glow-text block"
                animate={{
                  filter: [
                    "drop-shadow(0 0 6px hsl(199 89% 48% / 0.5))",
                    "drop-shadow(0 0 18px hsl(199 89% 48% / 0.85))",
                    "drop-shadow(0 0 6px hsl(199 89% 48% / 0.5))",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                AHOUANGONOU
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-base md:text-xl text-muted-foreground font-mono mb-8 tracking-widest uppercase"
            >
              Développeur Web Full Stack
            </motion.h2>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="h-10 mb-4 flex items-center"
            >
              <p className="text-base md:text-lg text-foreground/80 font-light">
                {displayed}
                <motion.span
                  className="text-primary font-bold"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >|</motion.span>
              </p>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="text-sm text-muted-foreground max-w-md mb-10 border-l-2 border-primary pl-4"
            >
              Profil technique avec une base en systèmes électroniques et embarqués.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="#projects"
                data-testid="link-voir-projets"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="group relative px-7 py-3.5 bg-primary text-primary-foreground font-mono font-semibold rounded-lg overflow-hidden glow-border"
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
                className="animated-border px-7 py-3.5 bg-secondary/60 text-foreground font-mono font-semibold rounded-lg border border-border hover:border-primary/50 hover:bg-secondary/80 transition-all duration-300 backdrop-blur-sm"
              >
                Me contacter
              </motion.a>
            </motion.div>
          </div>

          {/* Right: Photo */}
          <div className="flex justify-center lg:justify-end items-center">
            <PhotoAvatar />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 text-muted-foreground/40"
        >
          <span className="text-xs font-mono tracking-widest">SCROLL</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
