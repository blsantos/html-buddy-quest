import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Mail, RefreshCw, Star, Award, Sparkles } from "lucide-react";
import { Exercise } from "@/data/exercises";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  userEmail: string;
  answers: Record<number, string>;
  exercises: Exercise[];
}

export const ResultsScreen = ({
  score,
  totalQuestions,
  userEmail,
  answers,
  exercises
}: ResultsScreenProps) => {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const percentage = Math.round((score / totalQuestions) * 100);

  useEffect(() => {
    sendResults();
  }, []);

  const sendResults = async () => {
    setSending(true);
    
    try {
      const resultsHtml = `
        <h1>🎉 Résultats de l'exercice HTML</h1>
        <h2>Stagiaire : ${userEmail}</h2>
        <h3>Score : ${score}/${totalQuestions} (${percentage}%)</h3>
        
        <h3>Détails des réponses :</h3>
        <ul>
          ${exercises.map((ex, idx) => {
            const userAnswer = answers[idx] || "Pas de réponse";
            const isCorrect = userAnswer === ex.correctAnswer;
            return `
              <li>
                <strong>Question ${idx + 1}</strong> (${ex.category}): ${ex.question}
                <br/>
                Réponse donnée : ${userAnswer} ${isCorrect ? '✅' : '❌'}
                <br/>
                Bonne réponse : ${ex.correctAnswer}
              </li>
            `;
          }).join('')}
        </ul>
      `;

      const { error } = await supabase.functions.invoke('send-results', {
        body: {
          userEmail,
          score,
          totalQuestions,
          percentage,
          resultsHtml
        }
      });

      if (error) throw error;

      setSent(true);
      toast.success("Tes résultats ont été envoyés à ton formateur ! 📧");
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      toast.error("Erreur lors de l'envoi des résultats");
    } finally {
      setSending(false);
    }
  };

  const getMessage = () => {
    if (percentage === 100) {
      return {
        title: "PARFAIT ! 🏆",
        message: "Tu es un champion du HTML ! Tu as tout compris ! Continue comme ça !",
        icon: Trophy,
        color: "text-accent"
      };
    } else if (percentage >= 80) {
      return {
        title: "EXCELLENT ! 🌟",
        message: "Super travail ! Tu maîtrises très bien les bases du HTML !",
        icon: Award,
        color: "text-success"
      };
    } else if (percentage >= 60) {
      return {
        title: "BIEN JOUÉ ! 💪",
        message: "Beau parcours ! Continue à t'entraîner, tu es sur la bonne voie !",
        icon: Star,
        color: "text-primary"
      };
    } else {
      return {
        title: "CONTINUE ! 🚀",
        message: "C'est un bon début ! N'hésite pas à refaire l'exercice pour progresser !",
        icon: Sparkles,
        color: "text-secondary"
      };
    }
  };

  const messageData = getMessage();
  const MessageIcon = messageData.icon;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl shadow-2xl border-2 border-primary/20 bg-card/95 backdrop-blur">
        <CardHeader className="text-center space-y-6 pb-8">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-full blur-xl opacity-50 animate-pulse" />
              <div className="relative bg-gradient-to-br from-primary to-secondary rounded-full p-8">
                <MessageIcon className="h-20 w-20 text-white" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <CardTitle className={`text-5xl font-bold ${messageData.color}`}>
              Félicitations, Bâtisseur ! 🏗️
            </CardTitle>
            <CardDescription className="text-xl text-foreground/80">
              {percentage === 100 ? "🏆 Tu as terminé ton Tour de France avec un chef-d'œuvre ! Tu es prêt à bâtir le web !" :
               percentage >= 80 ? "🌟 Excellent travail ! Tu as bien compris les fondations. Continue à perfectionner ton art !" :
               percentage >= 60 ? "💪 Bien joué apprenti ! Tu progresses bien. Continue ton apprentissage avec détermination !" :
               "🚀 Bon début ! Chaque compagnon commence par apprendre. Refais le parcours pour progresser !"}
            </CardDescription>
          </div>

          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-8 rounded-2xl border-2 border-primary/20">
            <div className="text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2">
              {score}/{totalQuestions}
            </div>
            <div className="text-3xl font-bold text-foreground">
              {percentage}%
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-muted/50 p-6 rounded-xl space-y-3">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Mail className={`h-5 w-5 ${sent ? 'text-success' : 'text-primary'}`} />
              Envoi des résultats
            </h3>
            <p className="text-sm text-muted-foreground">
              {sending && "Envoi en cours..."}
              {sent && "✅ Tes résultats ont été envoyés à bruno.2santos@institutsolacroup.com"}
              {!sending && !sent && "Les résultats vont être envoyés..."}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-lg">Ton parcours :</h3>
            <div className="space-y-2">
              {exercises.map((ex, idx) => {
                const userAnswer = answers[idx];
                const isCorrect = userAnswer === ex.correctAnswer;
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border-2 ${
                      isCorrect
                        ? "bg-success/10 border-success/30"
                        : "bg-destructive/10 border-destructive/30"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="font-medium text-sm text-foreground/80">
                          Question {idx + 1} - {ex.category}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {ex.question}
                        </p>
                      </div>
                      <span className="text-2xl flex-shrink-0">
                        {isCorrect ? "✅" : "❌"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Button
            onClick={() => window.location.reload()}
            size="lg"
            className="w-full h-14 text-xl font-bold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Recommencer mon Tour de France ! 🏗️
          </Button>

          <div className="text-center text-sm text-muted-foreground pt-4 border-t border-border space-y-2">
            <p className="font-medium text-foreground">
              Continue à apprendre et à progresser ! 💪
            </p>
            <p>
              Chaque exercice te rapproche de la maîtrise du HTML ! 🌟
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
