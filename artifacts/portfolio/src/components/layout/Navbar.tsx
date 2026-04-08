import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border/50 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="font-display font-bold text-xl tracking-wider text-white">
          SERGIO<span className="text-primary">.DEV</span>
        </a>
        
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-mono text-muted-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
      
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-primary origin-left"
        style={{ scaleX }}
      />
    </header>
  );
}
