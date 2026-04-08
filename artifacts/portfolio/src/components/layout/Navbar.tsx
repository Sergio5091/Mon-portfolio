import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "À propos", href: "#about" },
    { name: "Compétences", href: "#skills" },
    { name: "Projets", href: "#projects" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-lg border-b border-border/50 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a
          href="#"
          className="font-display font-bold text-xl tracking-wider text-foreground hover:text-primary transition-colors duration-300"
        >
          SERGIO<span className="text-primary glow-text">.DEV</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-sm font-mono text-muted-foreground hover:text-primary transition-colors duration-300 group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <motion.button
            onClick={toggle}
            data-testid="button-theme-toggle"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            className="p-2 rounded-lg bg-secondary/60 border border-border hover:border-primary/50 text-muted-foreground hover:text-primary transition-all duration-300"
            aria-label="Toggle theme"
          >
            <motion.div
              key={theme}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </motion.div>
          </motion.button>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg bg-secondary/60 border border-border text-muted-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: mobileOpen ? "auto" : 0, opacity: mobileOpen ? 1 : 0 }}
        className="md:hidden overflow-hidden bg-background/95 backdrop-blur-lg border-t border-border/50"
      >
        <nav className="flex flex-col px-6 py-4 gap-4">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-mono text-muted-foreground hover:text-primary transition-colors py-2 border-b border-border/30"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </motion.div>

      {/* Scroll progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-accent to-primary origin-left"
        style={{ scaleX }}
      />
    </header>
  );
}
