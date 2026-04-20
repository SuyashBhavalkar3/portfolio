import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Send, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

export function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }
      );

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      toast({
        title: "Failed to send message",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-primary/5 rounded-full blur-[80px] md:blur-[120px] -z-10" />
      
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary font-bold mb-4">
            Connect
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-semibold text-foreground">
            Get In Touch
          </h2>
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Contact Info (Column 1 & 2) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8 md:space-y-12"
          >
            <div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                Let's innovate <span className="hidden md:inline"><br /></span>
                <span className="text-primary">together</span>
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                I'm always open to discussing cutting-edge AI projects, fullstack collaborations, 
                or any creative engineering challenges.
              </p>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div className="group flex items-center gap-4 md:gap-6 p-3 md:p-4 rounded-xl md:rounded-2xl hover:bg-secondary/10 transition-colors">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                  <Mail className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground font-bold mb-1">Email</p>
                  <p className="text-foreground font-semibold text-sm md:text-lg hover:text-primary transition-colors cursor-pointer truncate">
                    suyashbhavalkar82@gmail.com
                  </p>
                </div>
              </div>

              <div className="group flex items-center gap-4 md:gap-6 p-3 md:p-4 rounded-xl md:rounded-2xl hover:bg-secondary/10 transition-colors">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground font-bold mb-1">Location</p>
                  <p className="text-foreground font-semibold text-sm md:text-lg">
                    Pune, Maharashtra
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form (Column 3, 4 & 5) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 bg-secondary/10 backdrop-blur-xl border border-border/50 p-6 md:p-12 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl relative overflow-hidden"
          >
            {/* Form Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 relative">
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-muted-foreground ml-1">Name</label>
                  <Input
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="rounded-xl bg-background/50 border-border/50 focus:border-primary/50 h-10 md:h-12 text-sm md:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-muted-foreground ml-1">Email</label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="rounded-xl bg-background/50 border-border/50 focus:border-primary/50 h-10 md:h-12 text-sm md:text-base"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-muted-foreground ml-1">Message</label>
                <Textarea
                  placeholder="How can I help you?"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  rows={4}
                  className="rounded-xl bg-background/50 border-border/50 focus:border-primary/50 resize-none text-sm md:text-base"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full rounded-2xl h-12 md:h-14 font-bold text-base md:text-lg group overflow-hidden relative"
                disabled={isSubmitting}
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isSubmitting ? (
                    "Transmitting..."
                  ) : (
                    <>
                      Send Transmission
                      <Send className="w-4 h-4 md:w-5 md:h-5 ml-2 md:ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </span>
                <motion.div 
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-white/10 skew-x-12 translate-x-full"
                />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}