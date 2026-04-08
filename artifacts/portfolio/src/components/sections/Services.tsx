import { motion } from "framer-motion";
import { Globe, Server, Settings } from "lucide-react";

const services = [
  {
    icon: <Globe className="w-8 h-8 text-primary" />,
    title: "Développement Web",
    description: "Création de sites vitrines modernes et d'applications web full stack performantes, avec une architecture solide et évolutive."
  },
  {
    icon: <Server className="w-8 h-8 text-accent" />,
    title: "Déploiement & DevOps",
    description: "Mise en ligne, configuration de VPS, optimisation des performances et mise en place de pipelines CI/CD."
  },
  {
    icon: <Settings className="w-8 h-8 text-primary" />,
    title: "Solutions techniques",
    description: "Automatisation de processus, conception de logique technique complexe et intégration de systèmes IoT."
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 relative bg-secondary/10 border-y border-border/30">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display text-white">
            <span className="text-primary">04.</span> Services
          </h2>
          <div className="h-[1px] flex-1 bg-border/50" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="p-8 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 hover:bg-secondary/20 transition-all group"
            >
              <div className="mb-6 p-4 inline-block rounded-lg bg-secondary/50 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
