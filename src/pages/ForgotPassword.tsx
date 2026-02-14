import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { translateSupabaseError } from "@/lib/supabase-errors";
import { PageTransition } from "@/components/animations/PageTransition";
import { FloatingElements } from "@/components/animations/FloatingElements";
import { SlideIn } from "@/components/animations/SlideIn";
import { motion } from "framer-motion";
import { Shield, Mail, ArrowLeft } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { toast } = useToast();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setSent(true);
      toast({
        title: "Email envoyé !",
        description: "Vérifiez votre boîte mail pour réinitialiser votre mot de passe.",
      });
    } catch (error: any) {
      const message = error?.message || "Une erreur inattendue est survenue.";
      toast({
        title: "Erreur",
        description: translateSupabaseError(message),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition direction="left">
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-accent/50 to-background p-4 relative overflow-hidden">
        <FloatingElements />

        <div className="w-full max-w-md relative z-10">
          <SlideIn direction="down" delay={0.1}>
            <div className="text-center mb-8">
              <Link to="/" className="inline-flex items-center gap-3 font-bold text-2xl mb-4 group justify-center">
                <motion.div
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-shadow"
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Shield className="w-6 h-6 text-primary-foreground" />
                </motion.div>
                <span className="text-gradient">Koffr</span>
              </Link>
              <p className="text-muted-foreground">
                Réinitialiser votre mot de passe
              </p>
            </div>
          </SlideIn>

          <SlideIn direction="up" delay={0.2}>
            <motion.div
              className="backdrop-blur-xl bg-card/80 rounded-2xl p-8 shadow-2xl border border-white/10 ring-1 ring-black/5"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            >
              {sent ? (
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <motion.div
                    className="mb-4"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                  >
                    <Mail className="w-16 h-16 mx-auto text-primary" />
                  </motion.div>
                  <h2 className="text-xl font-semibold mb-2">Email envoyé !</h2>
                  <p className="text-muted-foreground mb-6">
                    Nous avons envoyé un lien de réinitialisation à <strong>{email}</strong>
                  </p>
                  <Link to="/login">
                    <Button variant="outline" className="w-full gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      Retour à la connexion
                    </Button>
                  </Link>
                </motion.div>
              ) : (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <motion.p
                    className="text-sm text-muted-foreground mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                  >
                    Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
                  </motion.p>

                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="vous@exemple.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-11 bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Button
                      type="submit"
                      className="w-full h-11 gradient-hero text-primary-foreground"
                      disabled={loading}
                    >
                      {loading ? "Envoi..." : "Envoyer le lien"}
                    </Button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.55 }}
                  >
                    <Link to="/login" className="block">
                      <Button variant="ghost" className="w-full gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Retour à la connexion
                      </Button>
                    </Link>
                  </motion.div>
                </form>
              )}
            </motion.div>
          </SlideIn>
        </div>
      </div>
    </PageTransition>
  );
}
