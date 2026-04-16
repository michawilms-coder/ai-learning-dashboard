import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const tasksPool = [
  { id: 1, category: "Prompt Engineering", text: "Erstelle einen Prompt zur Analyse eines Jahresabschlusses." },
  { id: 2, category: "KI Basics", text: "Erkläre in 3 Sätzen, was ein LLM ist." },
  { id: 3, category: "Steuer-KI", text: "Überlege dir 2 Anwendungsfälle für KI in der Steuerabteilung." },
  { id: 4, category: "Automation", text: "Wie könnte ein Reporting-Prozess automatisiert werden?" }
];

const quizPool = [
  {
    question: "Was ist ein Large Language Model?",
    options: [
      "Ein Datenbanksystem",
      "Ein KI-Modell zur Sprachverarbeitung",
      "Ein Steuer-Tool",
      "Ein Excel-Plugin"
    ],
    answer: 1
  }
];

export default function AILearningDashboard() {
  const [progress, setProgress] = useState(0);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [todayTasks, setTodayTasks] = useState([]);
  const [streak, setStreak] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState(null);

  useEffect(() => {
    const savedProgress = localStorage.getItem("progress");
    const savedStreak = localStorage.getItem("streak");

    if (savedProgress) setProgress(parseInt(savedProgress));
    if (savedStreak) setStreak(parseInt(savedStreak));

    generateDailyTasks();
  }, []);

  useEffect(() => {
    localStorage.setItem("progress", progress);
    localStorage.setItem("streak", streak);
  }, [progress, streak]);

  const generateDailyTasks = () => {
    const shuffled = [...tasksPool].sort(() => 0.5 - Math.random());
    setTodayTasks(shuffled.slice(0, 2));
    setCompletedTasks([]);
  };

  const completeTask = (id) => {
    if (!completedTasks.includes(id)) {
      setCompletedTasks([...completedTasks, id]);
      setProgress(progress + 5);
    }
  };

  const finishDay = () => {
    if (completedTasks.length === todayTasks.length) {
      setStreak(streak + 1);
    }
  };

  return (
    <div className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">AI Learning Dashboard</h1>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl mb-2">Fortschritt</h2>
          <Progress value={progress} />
          <p className="mt-2">{progress}% abgeschlossen</p>
          <p>🔥 Streak: {streak} Tage</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl mb-2">Tägliche Aufgaben</h2>
          {todayTasks.map((task) => (
            <div key={task.id} className="mb-3">
              <p><strong>{task.category}:</strong> {task.text}</p>
              <Button
                onClick={() => completeTask(task.id)}
                disabled={completedTasks.includes(task.id)}
              >
                {completedTasks.includes(task.id) ? "Erledigt" : "Erledigen"}
              </Button>
            </div>
          ))}
          <Button className="mt-3" onClick={finishDay}>Tag abschließen</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl mb-2">Quiz</h2>
          <p>{quizPool[0].question}</p>
          {quizPool[0].options.map((opt, i) => (
            <Button key={i} className="block mt-2" onClick={() => setQuizAnswer(i)}>
              {opt}
            </Button>
          ))}
          {quizAnswer !== null && (
            <p className="mt-2">
              {quizAnswer === quizPool[0].answer ? "✅ Richtig!" : "❌ Falsch"}
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl mb-2">Lernbereiche</h2>
          <ul className="list-disc ml-6">
            <li>KI Basics</li>
            <li>Prompt Engineering</li>
            <li>Steuer-Anwendungen</li>
            <li>Automatisierung</li>
          </ul>
        </CardContent>
      </Card>

      <Button onClick={generateDailyTasks}>Neue Aufgaben generieren</Button>
    </div>
  );
}
