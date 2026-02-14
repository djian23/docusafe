import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Shield, Mail, Lock, ArrowRight } from "lucide-react";
import { LogoIcon } from "@/components/ui/LogoIcon";
import { translateSupabaseError } from "@/lib/supabase-errors";
import { PageTransition } from "@/components/animations/PageTransition";
import { FloatingElements } from "@/components/animations/FloatingElements";
import { SlideIn } from "@/components/animations/SlideIn";
import { motion } from "framer-motion";
import { Suspense, lazy } from "react";

const MorphingBlob = lazy(() => import('@/components/animations/MorphingBlob').then(m => ({ default: m.MorphingBlob })));

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur Koffr !",
      });
      navigate("/dashboard");
    } catch (error: any) {
      const message = error?.message || "Une erreur inattendue est survenue.";
      toast({
        title: "Erreur de connexion",
        description: translateSupabaseError(message),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition direction="right">
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-accent/50 to-background p-4 relative overflow-hidden">
        <FloatingElements />

        {/* 3D morphing blobs in background */}
        <Suspense fallback={null}>
          <MorphingBlob className="opacity-30" />
        </Suspense>

        {/* Animated floating shapes */}
        <motion.div
          className="absolute top-[15%] left-[10%] w-16 h-16 rounded-2xl border border-primary/10 bg-primary/5"
          animate={{ rotate: 360, y: [0, -20, 0] }}
          transition={{ rotate: { duration: 20, repeat: Infinity, ease: 'linear' }, y: { duration: 5, repeat: Infinity } }}
          style={{ perspective: 600 }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[8%] w-12 h-12 rounded-full border border-sphere-family/10 bg-sphere-family/5"
          animate={{ rotate: -360, scale: [1, 1.2, 1] }}
          transition={{ rotate: { duration: 15, repeat: Infinity, ease: 'linear' }, scale: { duration: 4, repeat: Infinity } }}
        />
        <motion.div
          className="absolute top-[40%] right-[15%] w-8 h-8 rounded-lg border border-sphere-housing/15 bg-sphere-housing/5"
          animate={{ rotate: 180, x: [0, 15, 0], y: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="w-full max-w-md relative z-10">
          <SlideIn direction="down" delay={0.1}>
            <div className="text-center mb-8">
              <Link to="/" className="inline-flex items-center gap-3 font-bold text-2xl mb-4 group justify-center">
                <motion.div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-shadow overflow-hidden"
                  whileHover={{ rotate: 15, scale: 1.1, rotateY: 180 }}
                  whileTap={{ scale: 0.9 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <LogoIcon size={48} />
                </motion.div>
                <span className="text-gradient">Koffr</span>
              </Link>
              <motion.h1
                className="text-2xl font-semibold text-foreground mb-2"
                initial={{ opacity: 0, rotateX: 45 }}
                animate={{ opacity: 1, rotateX: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
                style={{ perspective: 600 }}
              >
                Bon retour parmi nous
              </motion.h1>
              <p className="text-muted-foreground text-sm">
                Connectez-vous à votre coffre-fort
              </p>
            </div>
          </SlideIn>

          <SlideIn direction="up" delay={0.2}>
            <motion.div
              className="backdrop-blur-xl bg-card/80 rounded-2xl p-8 shadow-2xl border border-white/10 ring-1 ring-black/5"
              initial={{ scale: 0.95, rotateX: 10 }}
              animate={{ scale: 1, rotateX: 0 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              style={{ perspective: 800, transformStyle: 'preserve-3d' }}
            >
              <form onSubmit={handleLogin} className="space-y-4">
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
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
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium">Mot de passe</Label>
                    <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                      Mot de passe oublié ?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      className="w-full h-11 gradient-hero text-primary-foreground font-medium shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all group"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          Connexion...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Se connecter
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      )}
                    </Button>
                  </motion.div>
                </motion.div>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">ou</span>
                </div>
              </div>

              <motion.div
                className="text-center text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Pas encore de compte ?{" "}
                <Link to="/signup" className="text-primary hover:underline font-medium">
                  S'inscrire gratuitement
                </Link>
              </motion.div>
            </motion.div>
          </SlideIn>

          <motion.div
            className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Connexion sécurisée avec chiffrement SSL</span>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
