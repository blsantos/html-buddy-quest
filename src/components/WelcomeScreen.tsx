import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, Sparkles, Code } from "lucide-react";
import { toast } from "sonner";

interface WelcomeScreenProps {
  onStart: (email: string) => void;
}

export const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.includes("@institutsolacroup.com")) {
      toast.error("Utilise ton adresse email Solacroup (@institutsolacroup.com) 📧");
      return;
    }

    toast.success("C'est parti pour l'aventure HTML ! 🚀");
    onStart(email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl border-2 border-primary/20 bg-card/95 backdrop-blur">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="flex justify-center gap-4 mb-4">
            <div className="relative">
              <Code className="h-16 w-16 text-primary animate-pulse" />
              <Sparkles className="h-6 w-6 text-accent absolute -top-2 -right-2" />
            </div>
          </div>
          <CardTitle className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Les Bâtisseurs du Digital 🏗️
          </CardTitle>
          <CardDescription className="text-lg md:text-xl text-foreground/80">
            Bienvenue, apprenti bâtisseur ! Comme les Compagnons du Devoir bâtissent des cathédrales,<br />
            tu vas apprendre à bâtir le web avec le HTML. Prêt pour ton Tour de France du code ? 🌟
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-6 rounded-xl space-y-3 border border-primary/20">
            <h3 className="font-bold text-xl flex items-center gap-2 text-foreground">
              <Rocket className="h-5 w-5 text-primary" />
              Ton Tour de France du HTML :
            </h3>
            <ul className="space-y-2 text-foreground/90">
              <li className="flex items-start gap-2">
                <span className="text-success text-xl">🔨</span>
                <span><strong>Les fondations</strong> - Balises obligatoires pour toute construction web</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success text-xl">🏛️</span>
                <span><strong>L'architecture</strong> - Titres et structure de ton contenu</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success text-xl">🔗</span>
                <span><strong>Les connexions</strong> - Liens pour relier tes pages</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success text-xl">📋</span>
                <span><strong>Les listes et tableaux</strong> - Organiser l'information</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success text-xl">⚒️</span>
                <span><strong>La pratique</strong> - Écrire et corriger ton propre code</span>
              </li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Ton adresse email Solacroup 📧
              </label>
              <Input
                id="email"
                type="email"
                placeholder="prenom.nom@institutsolacroup.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-lg h-12 border-2 border-primary/30 focus:border-primary transition-colors"
              />
              <p className="text-sm text-muted-foreground">
                Tes résultats seront envoyés automatiquement à ton formateur ! 📨
              </p>
            </div>

            <Button 
              type="submit" 
              size="lg" 
              className="w-full h-14 text-xl font-bold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Débuter mon Tour de France 🏗️
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground pt-4 border-t border-border">
            <p className="flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              Prends ton temps, il n'y a pas de limite ! Tu peux le faire ! 💪
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
