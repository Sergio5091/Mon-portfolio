import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Cpu, Zap } from "lucide-react";
import { useRef } from "react";

export default function TechnicalApproach() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const springProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });
  const x = useTransform(springProgress, [0, 1], [-30, 30]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="py-36 relative overflow-hidden">
      {/* Animated background glow */}
      <motion.div
        style={{ x }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,hsl(var(--primary)/0.08),transparent)] pointer-events-none"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_50%_50%,hsl(var(--accent)/0.05),transparent)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          style={{ opacity }}
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Icon badge */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-secondary/50 mb-10 border border-primary/25"
            style={{ animation: "pulse-glow 3s ease-in-out infinite" }}
          >
            <Cpu className="w-5 h-5 text-primary" />
            <span className="text-sm font-mono text-muted-foreground">Approche technique</span>
            <Zap className="w-4 h-4 text-accent" />
          </motion.div>

          {/* Quote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-4xl font-bold leading-snug text-foreground font-display"
          >
            "Grâce à mon background en électrotechnique, j'aborde chaque projet avec une{" "}
            <motion.span
              className="text-primary glow-text"
              animate={{
                textShadow: [
                  "0 0 8px hsl(199 89% 48% / 0.4)",
                  "0 0 20px hsl(199 89% 48% / 0.8)",
                  "0 0 8px hsl(199 89% 48% / 0.4)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              logique d'ingénierie
            </motion.span>
            , en mettant l'accent sur la{" "}
            <span className="text-accent glow-text-accent">fiabilité</span>, la{" "}
            <span className="text-accent glow-text-accent">performance</span> et la structure des systèmes."
          </motion.blockquote>

          {/* Divider lines */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-12 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
