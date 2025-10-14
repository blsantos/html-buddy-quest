import { useState } from "react";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { ExerciseScreen } from "@/components/ExerciseScreen";
import { ResultsScreen } from "@/components/ResultsScreen";
import { exercises } from "@/data/exercises";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<"welcome" | "exercise" | "results">("welcome");
  const [userEmail, setUserEmail] = useState("");
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [totalTime, setTotalTime] = useState<number>(0);

  const handleStart = (email: string) => {
    setUserEmail(email);
    setCurrentStep("exercise");
    setStartTime(Date.now());
  };

  const handleAnswer = (answer: string) => {
    const currentExercise = exercises[currentExerciseIndex];
    const isCorrect = answer === currentExercise.correctAnswer;
    
    setAnswers({ ...answers, [currentExerciseIndex]: answer });
    
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      if (startTime) {
        setTotalTime(Math.floor((Date.now() - startTime) / 1000));
      }
      setCurrentStep("results");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10">
      {currentStep === "welcome" && <WelcomeScreen onStart={handleStart} />}
      {currentStep === "exercise" && (
        <ExerciseScreen
          exercise={exercises[currentExerciseIndex]}
          exerciseNumber={currentExerciseIndex + 1}
          totalExercises={exercises.length}
          onAnswer={handleAnswer}
          onNextQuestion={handleNextQuestion}
          currentAnswer={answers[currentExerciseIndex]}
        />
      )}
      {currentStep === "results" && (
        <ResultsScreen
          score={score}
          totalQuestions={exercises.length}
          userEmail={userEmail}
          answers={answers}
          exercises={exercises}
          totalTime={totalTime}
        />
      )}
    </div>
  );
};

export default Index;
