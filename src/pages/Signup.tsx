import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Shield, Mail, Lock, ArrowRight, Check, AlertTriangle } from "lucide-react";
import { translateSupabaseError, isRateLimitError } from "@/lib/supabase-errors";
import { checkSupabaseConnection } from "@/integrations/supabase/client";
import { PageTransition } from "@/components/animations/PageTransition";
import { FloatingElements } from "@/components/animations/FloatingElements";
import { SlideIn } from "@/components/animations/SlideIn";
import { motion } from "framer-motion";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rateLimitHit, setRateLimitHit] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const passwordRequirements = [
    { met: password.length >= 8, text: "8+ caractères" },
    { met: /[A-Z]/.test(password), text: "Une majuscule" },
    { met: /[0-9]/.test(password), text: "Un chiffre" },
  ];

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 8) {
      toast({
        title: "Erreur",
        description: "Le mot de passe doit contenir au moins 8 caractères",
        variant: "destructive",
      });
      return;
    }

    if (!acceptTerms) {
      toast({
        title: "Erreur",
        description: "Veuillez accepter les conditions d'utilisation",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setRateLimitHit(false);

    try {
      const isConnected = await checkSupabaseConnection();
      if (!isConnected) {
        toast({
          title: "Erreur de connexion",
          description: "Impossible de joindre le serveur. Vérifiez votre connexion internet.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });

      if (error) throw error;

      toast({
        title: "Inscription réussie !",
        description: "Vérifiez votre email pour confirmer votre compte.",
      });
      navigate("/login");
    } catch (error: any) {
      const message = error?.message || "Une erreur inattendue est survenue.";
      const translated = translateSupabaseError(message);

      if (isRateLimitError(message)) {
        setRateLimitHit(true);
      }

      toast({
        title: isRateLimitError(message) ? "Limite atteinte" : "Erreur d'inscription",
        description: translated,
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
                  whileHover={{ rotate: -15, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                >
                  <Shield className="w-6 h-6 text-primary-foreground" />
                </motion.div>
                <span className="text-gradient">DocuSphere</span>
              </Link>
              <h1 className="text-2xl font-semibold text-foreground mb-2">
                Créez votre compte
              </h1>
              <p className="text-muted-foreground text-sm">
                Créez votre coffre-fort sécurisé
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
              {rateLimitHit && (
                <motion.div
                  className="mb-4 p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-sm text-destructive flex items-start gap-3"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Limite de tentatives atteinte</p>
                    <p className="mt-1 text-destructive/80">
                      Le service d'envoi d'emails est temporairement limité.
                      Veuillez patienter environ 1 heure avant de réessayer.
                      Si vous avez déjà reçu un email de confirmation, vérifiez votre boîte de réception et vos spams.
                    </p>
                  </div>
                </motion.div>
              )}
              <form onSubmit={handleSignup} className="space-y-5">
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
                  <Label htmlFor="password" className="text-sm font-medium">Mot de passe</Label>
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
                  {password && (
                    <motion.div
                      className="flex flex-wrap gap-2 mt-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                    >
                      {passwordRequirements.map((req, i) => (
                        <motion.span
                          key={i}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full transition-colors ${
                            req.met
                              ? "bg-green-500/10 text-green-600 dark:text-green-400"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {req.met && <Check className="w-3 h-3" />}
                          {req.text}
                        </motion.span>
                      ))}
                    </motion.div>
                  )}
                </motion.div>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 }}
                >
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirmer le mot de passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`pl-10 h-11 bg-background/50 border-border/50 focus:border-primary/50 transition-colors ${
                        confirmPassword && password !== confirmPassword
                          ? "border-red-500/50 focus:border-red-500"
                          : confirmPassword && password === confirmPassword
                            ? "border-green-500/50 focus:border-green-500"
                            : ""
                      }`}
                      required
                    />
                    {confirmPassword && password === confirmPassword && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                      </motion.div>
                    )}
                  </div>
                  {confirmPassword && password !== confirmPassword && (
                    <motion.p
                      className="text-xs text-red-500"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      Les mots de passe ne correspondent pas
                    </motion.p>
                  )}
                </motion.div>

                <motion.div
                  className="flex items-start space-x-3 pt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                    className="mt-0.5"
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed text-muted-foreground cursor-pointer">
                    J'accepte les{" "}
                    <a href="#" className="text-primary hover:underline font-medium">conditions d'utilisation</a>
                    {" "}et la{" "}
                    <a href="#" className="text-primary hover:underline font-medium">politique de confidentialité</a>
                  </Label>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                >
                  <Button
                    type="submit"
                    className="w-full h-11 gradient-hero text-primary-foreground font-medium shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all group"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Création en cours...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Créer mon coffre-fort
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </Button>
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
                transition={{ delay: 0.65 }}
              >
                Déjà un compte ?{" "}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Se connecter
                </Link>
              </motion.div>
            </motion.div>
          </SlideIn>

          <motion.div
            className="flex flex-col items-center gap-2 text-xs text-muted-foreground mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5" />
              <span>Vos données sont chiffrées et sécurisées</span>
            </div>
            <span>Hébergé en Europe - RGPD compliant</span>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
