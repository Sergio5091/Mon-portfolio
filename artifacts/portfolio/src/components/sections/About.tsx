import { motion } from "framer-motion";
import { User, Code2, Cpu } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-12"
        >
          <div className="h-[1px] flex-1 bg-border/50" />
          <h2 className="text-3xl md:text-4xl font-bold font-display text-white">
            <span className="text-primary">01.</span> À propos
          </h2>
          <div className="h-[1px] flex-1 bg-border/50" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6 text-muted-foreground leading-relaxed"
          >
            <p>
              Je suis développeur web passionné par la création d'applications modernes avec <strong className="text-foreground font-mono">JavaScript, Node.js et Laravel</strong>.
            </p>
            <p>
              Mon parcours en électrotechnique m'a permis de développer une forte capacité d'analyse et une compréhension des systèmes techniques, que j'applique aujourd'hui dans le développement logiciel.
            </p>
            <p>
              Actuellement en alternance, je continue de renforcer mes compétences et de travailler sur des projets concrets, comblant le fossé entre le matériel et le logiciel.
            </p>

            <div className="flex gap-4 pt-4">
              <div className="flex flex-col gap-2 p-4 rounded-lg bg-secondary/30 border border-border/50">
                <Code2 className="w-6 h-6 text-primary" />
                <span className="font-mono text-sm text-foreground">Web Dev</span>
              </div>
              <div className="flex flex-col gap-2 p-4 rounded-lg bg-secondary/30 border border-border/50">
                <Cpu className="w-6 h-6 text-primary" />
                <span className="font-mono text-sm text-foreground">Hardware</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative mx-auto w-full max-w-sm aspect-square group"
          >
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors duration-500" />
            <div className="relative h-full w-full rounded-2xl border-2 border-primary/30 bg-secondary/80 backdrop-blur-sm overflow-hidden flex items-center justify-center">
              {/* Abstract avatar representation */}
              <div className="absolute inset-0 bg-grid opacity-30" />
              <User className="w-32 h-32 text-primary/50" strokeWidth={1} />
              
              {/* Decorative engineering lines */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-primary/50" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-primary/50" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
