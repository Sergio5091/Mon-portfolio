import { motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
  const [text, setText] = useState("");
  const fullText = "Je conçois des applications web modernes, performantes et évolutives.";
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-border text-sm font-mono text-muted-foreground mb-8"
        >
          <Terminal className="w-4 h-4 text-primary" />
          <span>System.init()</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-4"
        >
          SERGIO <span className="text-primary glow-text">AHOUANGONOU</span>
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl md:text-3xl text-muted-foreground font-mono mb-8"
        >
          Développeur Web Full Stack
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="h-16 md:h-12 mb-6"
        >
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            {text}<span className="animate-pulse text-primary">_</span>
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto mb-12 border-l-2 border-primary pl-4 text-left"
        >
          Profil technique avec une base en systèmes électroniques et embarqués.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a 
            href="#projects"
            className="group relative px-8 py-4 bg-primary text-primary-foreground font-mono font-medium rounded-md overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
            <span className="relative flex items-center gap-2">
              Voir mes projets
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
          <a 
            href="#contact"
            className="px-8 py-4 bg-secondary text-foreground font-mono font-medium rounded-md border border-border hover:border-primary/50 hover:bg-secondary/80 transition-colors"
          >
            Me contacter
          </a>
        </motion.div>
      </div>
    </section>
  );
}
