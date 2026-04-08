import { motion } from "framer-motion";
import { Globe, Server, Settings } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Développement Web",
    description: "Création de sites vitrines modernes et d'applications web full stack performantes, avec une architecture solide et évolutive.",
    color: "primary",
  },
  {
    icon: Server,
    title: "Déploiement & DevOps",
    description: "Mise en ligne, configuration de VPS, optimisation des performances et mise en place de pipelines CI/CD.",
    color: "accent",
  },
  {
    icon: Settings,
    title: "Solutions techniques",
    description: "Automatisation de processus, conception de logique technique complexe et intégration de systèmes IoT.",
    color: "primary",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-secondary/10" />
      <div className="absolute inset-0 bg-grid-light opacity-100 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-black text-foreground whitespace-nowrap">
            <span className="text-primary">04.</span> Services
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-border/60 to-transparent" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isPrimary = service.color === "primary";
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -8 }}
                data-testid={`card-service-${index}`}
                className="animated-border group relative p-8 rounded-2xl bg-background/80 backdrop-blur-sm border border-border/60 hover:border-primary/40 transition-all duration-400 glow-box"
              >
                {/* Icon with animated ring */}
                <div className="relative mb-6 inline-block">
                  <motion.div
                    className={`p-4 rounded-xl ${isPrimary ? "bg-primary/10 border border-primary/25" : "bg-accent/10 border border-accent/25"}`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon
                      className={`w-7 h-7 ${isPrimary ? "text-primary" : "text-accent"}`}
                      strokeWidth={1.5}
                    />
                  </motion.div>
                  {/* Animated pulse ring */}
                  <motion.div
                    className={`absolute inset-0 rounded-xl ${isPrimary ? "border border-primary/30" : "border border-accent/30"}`}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.5 }}
                  />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3 font-display group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Bottom accent line */}
                <motion.div
                  className={`absolute bottom-0 left-0 h-0.5 rounded-b-2xl ${isPrimary ? "bg-primary" : "bg-accent"}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.15 }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
