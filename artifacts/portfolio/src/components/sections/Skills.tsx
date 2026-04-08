import { motion } from "framer-motion";
import { Globe, Cpu, Wrench } from "lucide-react";

const skills = [
  {
    category: "Développement Web",
    icon: <Globe className="w-5 h-5" />,
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Vue.js", "Node.js", "Laravel"],
    color: "primary",
  },
  {
    category: "Compétences techniques",
    icon: <Cpu className="w-5 h-5" />,
    items: ["Arduino", "Microcontrôleurs", "Électricité industrielle"],
    color: "accent",
  },
  {
    category: "Outils",
    icon: <Wrench className="w-5 h-5" />,
    items: ["Git", "VPS", "Linux", "Figma", "Canva"],
    color: "primary",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, delay: i * 0.05, ease: "backOut" },
  }),
};

export default function Skills() {
  return (
    <section id="skills" className="py-28 relative bg-secondary/15">
      {/* Top/bottom gradient borders */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute inset-0 bg-grid-light opacity-100 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-black text-foreground whitespace-nowrap">
            <span className="text-primary">02.</span> Compétences
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-border/60 to-transparent" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {skills.map((group, gi) => (
            <motion.div
              key={gi}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="animated-border group relative p-8 rounded-2xl bg-background border border-border/60 hover:border-primary/40 transition-all duration-400 glow-box"
              data-testid={`card-skill-${gi}`}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-primary/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary/20 transition-colors">
                  {group.icon}
                </div>
                <h3 className="text-base font-mono text-foreground font-semibold">
                  {group.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.items.map((item, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={badgeVariants}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="px-3 py-1.5 text-sm rounded-md bg-secondary/60 text-muted-foreground border border-border/50 hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 cursor-default font-mono"
                    data-testid={`badge-skill-${gi}-${i}`}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
