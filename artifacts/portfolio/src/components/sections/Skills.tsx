import { motion } from "framer-motion";

const skills = [
  {
    category: "Développement Web",
    items: ["HTML", "CSS", "JavaScript", "React", "Vue.js", "Node.js", "Laravel", "TypeScript"]
  },
  {
    category: "Compétences techniques",
    items: ["Arduino", "Microcontrôleurs", "Électricité industrielle"]
  },
  {
    category: "Outils",
    items: ["Git", "VPS", "Figma", "Canva", "Linux"]
  }
];

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="skills" className="py-24 relative bg-secondary/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display text-white">
            <span className="text-primary">02.</span> Compétences
          </h2>
          <div className="h-[1px] flex-1 bg-border/50" />
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {skills.map((skillGroup, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="p-6 rounded-xl bg-background border border-border hover:border-primary/50 transition-colors group"
            >
              <h3 className="text-xl font-mono text-white mb-6 flex items-center gap-2">
                <span className="text-primary opacity-50 group-hover:opacity-100 transition-opacity">/</span>
                {skillGroup.category}
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((item, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1.5 text-sm rounded-md bg-secondary/50 text-muted-foreground border border-border/50 hover:text-primary hover:border-primary/30 transition-all cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
