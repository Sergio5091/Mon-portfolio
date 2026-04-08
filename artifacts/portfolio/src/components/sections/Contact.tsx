import { motion } from "framer-motion";
import { Mail, Phone, Github, Linkedin, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

export default function Contact() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Message envoyé !",
      description: "Merci de m'avoir contacté. Je vous répondrai dans les plus brefs délais.",
    });
    form.reset();
  }

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display text-white">
            <span className="text-primary">05.</span> Contact
          </h2>
          <div className="h-[1px] flex-1 bg-border/50" />
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Discutons de votre projet</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Je suis actuellement à la recherche de nouvelles opportunités, que ce soit pour des missions freelance ou des postes intéressants. Ma boîte de réception est toujours ouverte.
              </p>
            </div>

            <div className="space-y-6">
              <a href="mailto:contact@sergio-dev.fr" className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group">
                <div className="p-3 bg-secondary/50 rounded-lg group-hover:bg-primary/10">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="font-mono text-sm">contact@sergio-dev.fr</span>
              </a>
              
              <a href="tel:+33600000000" className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group">
                <div className="p-3 bg-secondary/50 rounded-lg group-hover:bg-primary/10">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="font-mono text-sm">+33 6 XX XX XX XX</span>
              </a>
            </div>

            <div className="pt-8 flex gap-4">
              <a href="#" className="p-3 bg-secondary rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="p-3 bg-secondary rounded-lg text-muted-foreground hover:text-accent hover:bg-accent/10 transition-all">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-3 p-8 rounded-2xl bg-secondary/20 border border-border"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground font-mono text-xs uppercase tracking-wider">Nom</FormLabel>
                        <FormControl>
                          <Input className="bg-background border-border/50 focus:border-primary focus:ring-primary/20 transition-all font-sans" placeholder="John Doe" {...field} />
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
                        <FormLabel className="text-muted-foreground font-mono text-xs uppercase tracking-wider">Email</FormLabel>
                        <FormControl>
                          <Input className="bg-background border-border/50 focus:border-primary focus:ring-primary/20 transition-all font-sans" placeholder="john@example.com" type="email" {...field} />
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
                      <FormLabel className="text-muted-foreground font-mono text-xs uppercase tracking-wider">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          className="bg-background border-border/50 focus:border-primary focus:ring-primary/20 min-h-[150px] resize-none transition-all font-sans" 
                          placeholder="Bonjour, je vous contacte pour..." 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-destructive text-xs" />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-mono font-medium gap-2 glow-border transition-all h-12"
                >
                  <Send className="w-4 h-4" />
                  Envoyer le message
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
