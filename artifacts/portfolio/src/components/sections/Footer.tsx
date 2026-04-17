import { motion } from "framer-motion";
import { Github, Linkedin, ArrowUp } from "lucide-react";

export default function Footer() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="py-10 border-t border-border/30 bg-background relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo + copyright */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <motion.a
            href="#"
            whileHover={{ scale: 1.04 }}
            className="font-display font-bold text-lg text-foreground hover:text-primary transition-colors"
          >
            SERGIO<span className="text-primary glow-text">.DEV</span>
          </motion.a>
          <span className="text-xs text-muted-foreground font-mono">
            © {new Date().getFullYear()} Sergio Ahouangonou. Tous droits réservés.
          </span>
        </div>

        {/* Center: Freelance badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-secondary/40 border border-border/50"
          data-testid="badge-freelance"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
          </span>
          <span className="text-xs font-mono text-muted-foreground">
            Disponible pour freelance
          </span>
        </motion.div>

        {/* Right: social + back to top */}
        <div className="flex items-center gap-3">
          <motion.a
            href="https://github.com/Sergio5091"
            whileHover={{ scale: 1.12, y: -2 }}
            className="p-2.5 rounded-lg bg-secondary/40 border border-border/50 text-muted-foreground hover:text-foreground hover:border-border transition-all"
            aria-label="GitHub"
            data-testid="link-footer-github"
          >
            <Github className="w-4 h-4" />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/sergio-ahouangonou/"
            whileHover={{ scale: 1.12, y: -2 }}
            className="p-2.5 rounded-lg bg-secondary/40 border border-border/50 text-muted-foreground hover:text-accent hover:border-accent/30 transition-all"
            aria-label="LinkedIn"
            data-testid="link-footer-linkedin"
          >
            <Linkedin className="w-4 h-4" />
          </motion.a>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.12, y: -2 }}
            whileTap={{ scale: 0.93 }}
            className="p-2.5 rounded-lg bg-primary/10 border border-primary/25 text-primary hover:bg-primary/20 transition-all"
            aria-label="Back to top"
            data-testid="button-back-to-top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
