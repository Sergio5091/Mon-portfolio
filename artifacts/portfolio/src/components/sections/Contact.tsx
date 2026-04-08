import { motion } from "framer-motion";
import { Mail, Phone, Github, Linkedin, Send, MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

const contactLinks = [
  {
    icon: Mail,
    label: "contact@sergio-dev.fr",
    href: "mailto:contact@sergio-dev.fr",
    type: "email",
  },
  {
    icon: Phone,
    label: "+33 6 XX XX XX XX",
    href: "tel:+33600000000",
    type: "whatsapp",
  },
];

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub", color: "hover:text-foreground" },
  { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:text-accent" },
];

export default function Contact() {
  const { toast } = useToast();
  const [sent, setSent] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  function onSubmit(_values: z.infer<typeof formSchema>) {
    setSent(true);
    toast({
      title: "Message envoyé !",
      description: "Merci de m'avoir contacté. Je vous répondrai dans les plus brefs délais.",
    });
    setTimeout(() => {
      setSent(false);
      form.reset();
    }, 3000);
  }

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-black text-foreground whitespace-nowrap">
            <span className="text-primary">05.</span> Contact
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-border/60 to-transparent" />
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12">
          {/* Left side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="md:col-span-2 space-y-8"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold text-foreground font-display">Discutons de votre projet</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Je suis disponible pour des missions freelance ou des opportunités intéressantes. Ma boîte de réception est toujours ouverte.
              </p>
            </div>

            <div className="space-y-4">
              {contactLinks.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={i}
                    href={item.href}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-all duration-300 group"
                    data-testid={`link-contact-${i}`}
                  >
                    <div className="p-3 bg-secondary/50 rounded-lg border border-border/60 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-sm">{item.label}</span>
                  </motion.a>
                );
              })}
            </div>

            <div className="flex gap-3 pt-4">
              {socialLinks.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={i}
                    href={item.href}
                    whileHover={{ scale: 1.12, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 bg-secondary/50 rounded-lg border border-border/60 text-muted-foreground ${item.color} hover:bg-secondary hover:border-border transition-all duration-300`}
                    aria-label={item.label}
                    data-testid={`link-social-${i}`}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="animated-border md:col-span-3 p-8 rounded-2xl bg-card border border-border/60 glow-box"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground font-mono text-xs uppercase tracking-widest">Nom</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-background/60 border-border/60 focus:border-primary transition-all font-sans"
                            placeholder="Jean Dupont"
                            data-testid="input-name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-destructive text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground font-mono text-xs uppercase tracking-widest">Email</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-background/60 border-border/60 focus:border-primary transition-all font-sans"
                            placeholder="jean@example.com"
                            type="email"
                            data-testid="input-email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-destructive text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground font-mono text-xs uppercase tracking-widest">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          className="bg-background/60 border-border/60 focus:border-primary min-h-[140px] resize-none transition-all font-sans"
                          placeholder="Bonjour, je vous contacte pour..."
                          data-testid="input-message"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-destructive text-xs" />
                    </FormItem>
                  )}
                />

                <motion.button
                  type="submit"
                  data-testid="button-send"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={sent}
                  className="w-full flex items-center justify-center gap-2 h-12 rounded-lg bg-primary text-primary-foreground font-mono font-semibold glow-border transition-all duration-300 disabled:opacity-70"
                >
                  {sent ? (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-2"
                    >
                      ✓ Message envoyé !
                    </motion.span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Envoyer le message
                    </>
                  )}
                </motion.button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
