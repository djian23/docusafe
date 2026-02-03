import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

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

    try {
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
      toast({
        title: "Erreur d'inscription",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-accent/50 to-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 font-bold text-2xl mb-2">
            <span className="text-3xl">🔐</span>
            <span className="text-gradient">DocuSafe</span>
          </Link>
          <p className="text-muted-foreground">
            Créez votre coffre-fort sécurisé
          </p>
        </div>

        <div className="bg-card rounded-xl p-8 shadow-soft border border-border">
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="vous@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Minimum 8 caractères
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox 
                id="terms" 
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm leading-tight">
                J'accepte les{" "}
                <a href="#" className="text-primary hover:underline">conditions d'utilisation</a>
                {" "}et la{" "}
                <a href="#" className="text-primary hover:underline">politique de confidentialité</a>
              </Label>
            </div>

            <Button 
              type="submit" 
              className="w-full gradient-hero text-primary-foreground"
              disabled={loading}
            >
              {loading ? "Création..." : "Créer mon coffre-fort"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Déjà un compte ?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Se connecter
            </Link>
          </div>
        </div>

        <div className="text-center text-xs text-muted-foreground mt-6 space-y-1">
          <p>🔒 Vos données sont chiffrées et sécurisées</p>
          <p>🇪🇺 Hébergé en Europe • RGPD compliant</p>
        </div>
      </div>
    </div>
  );
}
