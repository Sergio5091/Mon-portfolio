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
    label: "sergioahouangonou693@gmail.com",
    href: "mailto:sergioahouangonou693@gmail.com",
    type: "email",
    whatsapp: false,
  },
  {
    icon: Phone,
    label: "+229 01 60 21 47 60",
    href: "tel:+2290160214760",
    type: "phone",
    whatsapp: false,
  },
  {
    icon: null,
    label: "+229 01 50 91 90 54",
    href: "https://wa.me/2290150919054",
    type: "whatsapp",
    whatsapp: true,
  },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/Sergio5091", label: "GitHub", color: "hover:text-foreground" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/sergio-ahouangonou/", label: "LinkedIn", color: "hover:text-accent" },
  
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
                    target={item.whatsapp ? "_blank" : undefined}
                    rel={item.whatsapp ? "noopener noreferrer" : undefined}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-all duration-300 group"
                    data-testid={`link-contact-${i}`}
                  >
                    <div className={`p-3 rounded-lg border transition-all duration-300 ${
                      item.whatsapp
                        ? "bg-green-500/10 border-green-500/25 group-hover:bg-green-500/20 group-hover:border-green-500/50"
                        : "bg-secondary/50 border-border/60 group-hover:bg-primary/10 group-hover:border-primary/30"
                    }`}>
                      {item.whatsapp ? (
                        <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                      ) : (
                        Icon && <Icon className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono text-sm">{item.label}</span>
                      {item.whatsapp && (
                        <span className="text-xs text-green-500/70 font-mono">WhatsApp</span>
                      )}
                    </div>
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
                            placeholder="sergio@example.com"
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
