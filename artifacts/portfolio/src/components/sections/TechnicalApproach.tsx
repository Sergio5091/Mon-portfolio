import { motion } from "framer-motion";
import { Cpu } from "lucide-react";

export default function TechnicalApproach() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-secondary/50 mb-8 border border-primary/20 shadow-[0_0_30px_rgba(14,165,233,0.15)]">
            <Cpu className="w-8 h-8 text-primary" />
          </div>
          
          <blockquote className="text-2xl md:text-4xl font-display font-medium leading-tight text-white">
            "Grâce à mon background en électrotechnique, j'aborde chaque projet avec une <span className="text-primary glow-text">logique d'ingénierie</span>, en mettant l'accent sur la fiabilité, la performance et la structure des systèmes."
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
