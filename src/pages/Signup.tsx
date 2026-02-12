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
          emailRedirectTo: window.location.origin,
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-accent/50 to-background p-4">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 font-bold text-2xl mb-4 group justify-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-shadow">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-gradient">DocuSphere</span>
          </Link>
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Créez votre compte
          </h1>
          <p className="text-muted-foreground text-sm">
            Créez votre coffre-fort sécurisé
          </p>
        </div>

        <div className="backdrop-blur-xl bg-card/80 rounded-2xl p-8 shadow-2xl border border-white/10 ring-1 ring-black/5">
          {rateLimitHit && (
            <div className="mb-4 p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-sm text-destructive flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Limite de tentatives atteinte</p>
                <p className="mt-1 text-destructive/80">
                  Le service d'envoi d'emails est temporairement limité.
                  Veuillez patienter environ 1 heure avant de réessayer.
                  Si vous avez déjà reçu un email de confirmation, vérifiez votre boîte de réception et vos spams.
                </p>
              </div>
            </div>
          )}
          <form onSubmit={handleSignup} className="space-y-5">
            <div className="space-y-2">
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
            </div>

            <div className="space-y-2">
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
                <div className="flex flex-wrap gap-2 mt-2">
                  {passwordRequirements.map((req, i) => (
                    <span
                      key={i}
                      className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full transition-colors ${
                        req.met 
                          ? "bg-green-500/10 text-green-600 dark:text-green-400" 
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {req.met && <Check className="w-3 h-3" />}
                      {req.text}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
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
                  <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                )}
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-red-500">Les mots de passe ne correspondent pas</p>
              )}
            </div>

            <div className="flex items-start space-x-3 pt-2">
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
            </div>

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
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">ou</span>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Déjà un compte ?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Se connecter
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 text-xs text-muted-foreground mt-6">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5" />
            <span>Vos données sont chiffrées et sécurisées</span>
          </div>
          <span>🇪🇺 Hébergé en Europe • RGPD compliant</span>
        </div>
      </div>
    </div>
  );
}
