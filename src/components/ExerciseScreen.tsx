import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, XCircle, Lightbulb, Trophy, Code } from "lucide-react";
import { Exercise } from "@/data/exercises";
import { toast } from "sonner";

interface ExerciseScreenProps {
  exercise: Exercise;
  exerciseNumber: number;
  totalExercises: number;
  onAnswer: (answer: string) => void;
  onNextQuestion: () => void;
  currentAnswer?: string;
}

export const ExerciseScreen = ({
  exercise,
  exerciseNumber,
  totalExercises,
  onAnswer,
  onNextQuestion,
  currentAnswer
}: ExerciseScreenProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [codeAnswer, setCodeAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const progress = (exerciseNumber / totalExercises) * 100;
  const isCodeExercise = exercise.type === "code";

  useEffect(() => {
    setSelectedAnswer(null);
    setCodeAnswer("");
    setShowFeedback(false);
  }, [exercise.id]);

  const handleAnswerClick = (answer: string) => {
    if (showFeedback) return;

    setSelectedAnswer(answer);
    setShowFeedback(true);

    const isCorrect = answer === exercise.correctAnswer;
    
    if (isCorrect) {
      toast.success(exercise.encouragement, {
        icon: "🎉",
        duration: 3000
      });
    } else {
      toast.error("Pas tout à fait ! Regarde l'explication 📚", {
        duration: 3000
      });
    }

    onAnswer(answer);
  };

  const handleCodeSubmit = () => {
    if (showFeedback || !codeAnswer.trim()) return;
    
    setShowFeedback(true);
    
    // Normalize both answers for comparison - focus on HTML structure, not content/spelling
    const normalizeCode = (code: string) => {
      return code
        .trim()
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .toLowerCase()
        .replace(/"/g, "'") // Normalize quotes
        .replace(/>\s+</g, '><'); // Remove spaces between tags
    };
    
    const normalizedUserCode = normalizeCode(codeAnswer);
    const normalizedCorrect = normalizeCode(exercise.correctAnswer);
    const isCorrect = normalizedUserCode === normalizedCorrect;
    
    if (isCorrect) {
      toast.success(exercise.encouragement, {
        icon: "🎉",
        duration: 3000
      });
      onAnswer(exercise.correctAnswer);
    } else {
      toast.error("Pas tout à fait ! Regarde l'explication 📚", {
        duration: 3000
      });
      onAnswer(codeAnswer);
    }
  };

  const normalizeForComparison = (code: string) => {
    return code
      .trim()
      .replace(/\s+/g, ' ')
      .toLowerCase()
      .replace(/"/g, "'")
      .replace(/>\s+</g, '><');
  };

  const isCorrect = isCodeExercise 
    ? normalizeForComparison(codeAnswer) === normalizeForComparison(exercise.correctAnswer)
    : selectedAnswer === exercise.correctAnswer;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl shadow-2xl border-2 border-primary/20 bg-card/95 backdrop-blur">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <CardDescription className="text-lg font-medium">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full border border-primary/20">
                <Trophy className="h-4 w-4" />
                {exercise.category}
              </span>
            </CardDescription>
            <span className="text-sm font-medium text-muted-foreground">
              Question {exerciseNumber} / {totalExercises}
            </span>
          </div>
          
          <div className="space-y-2">
            <Progress value={progress} className="h-3" />
            <p className="text-xs text-center text-muted-foreground">
              Tu progresses super bien ! Continue ! 🌟
            </p>
          </div>

          <CardTitle className="text-2xl md:text-3xl text-foreground pt-4">
            {exercise.question}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {isCodeExercise ? (
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg border-2 border-primary/20">
                <div className="flex items-center gap-2 mb-3">
                  <Code className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-foreground">Exercice pratique - Écris ton code HTML :</span>
                </div>
                <Textarea
                  value={codeAnswer}
                  onChange={(e) => setCodeAnswer(e.target.value)}
                  placeholder={exercise.placeholder || "Écris ton code HTML ici..."}
                  className="font-mono text-sm min-h-[200px] p-4 bg-background leading-relaxed"
                  disabled={showFeedback}
                  spellCheck={false}
                />
              </div>
              {!showFeedback ? (
                <Button
                  onClick={handleCodeSubmit}
                  disabled={!codeAnswer.trim()}
                  className="w-full h-14 text-lg font-bold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                >
                  Vérifier mon code 🔍
                </Button>
              ) : (
                <Button
                  onClick={onNextQuestion}
                  className="w-full h-14 text-lg font-bold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                >
                  Question suivante →
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="grid gap-3">
                {exercise.options?.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrectOption = option === exercise.correctAnswer;
              
              let buttonClass = "w-full h-auto min-h-[60px] text-left justify-start px-6 text-base md:text-lg font-medium transition-all duration-300 ";
              
              if (!showFeedback) {
                buttonClass += "bg-card hover:bg-primary/10 border-2 border-primary/20 hover:border-primary hover:shadow-lg";
              } else if (isCorrectOption) {
                buttonClass += "bg-success/20 border-2 border-success text-success-foreground hover:bg-success/20";
              } else if (isSelected && !isCorrectOption) {
                buttonClass += "bg-destructive/20 border-2 border-destructive text-destructive-foreground hover:bg-destructive/20";
              } else {
                buttonClass += "bg-muted/50 border-2 border-border opacity-60";
              }

              return (
                <Button
                  key={index}
                  onClick={() => handleAnswerClick(option)}
                  disabled={showFeedback}
                  className={buttonClass}
                  variant="outline"
                >
                  <span className="flex items-center gap-3 w-full">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1">{option}</span>
                    {showFeedback && isCorrectOption && (
                      <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0" />
                    )}
                    {showFeedback && isSelected && !isCorrectOption && (
                      <XCircle className="h-6 w-6 text-destructive flex-shrink-0" />
                    )}
                  </span>
                </Button>
              );
              })}
              </div>
              
              {showFeedback && (
                <Button
                  onClick={onNextQuestion}
                  className="w-full h-14 text-lg font-bold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 mt-3"
                >
                  Question suivante →
                </Button>
              )}
            </>
          )}

          {showFeedback && (
            <div className={`p-6 rounded-xl border-2 animate-in slide-in-from-bottom-4 duration-500 ${
              isCorrect 
                ? "bg-success/10 border-success/30" 
                : "bg-primary/10 border-primary/30"
            }`}>
              <div className="flex items-start gap-3">
                <Lightbulb className={`h-6 w-6 flex-shrink-0 mt-1 ${
                  isCorrect ? "text-success" : "text-primary"
                }`} />
                <div className="space-y-2">
                  <h4 className="font-bold text-lg text-foreground">
                    {isCorrect ? "Bravo ! C'est juste ! 🎉" : "Bonne tentative ! 💪"}
                  </h4>
                  <p className="text-foreground/90 leading-relaxed">
                    {exercise.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
