import { useUsernameContext } from "@/components/context/usernameContext";
import useHistory from "@/hooks/useHistory";
import { Question } from "@/pages/menu/[username]";
import { HistoryQuizzAnswered } from "@/pages/myaccount";
import Link from "next/link";
import { useState } from "react";

type GameQuizzProps = {
  quizzChosen: {
    theme: string;
    played: number;
    name: string;
    difficulty: string;
    date: string;
    image: string;
    questions: Question[];
  };
  historyData: HistoryQuizzAnswered[];
};
const GameQuizz = ({ quizzChosen, historyData }: GameQuizzProps) => {
  const { username } = useUsernameContext();
  const { handleHistoryQuizz } = useHistory();

  const [isQuizzStarted, setIsQuizzStarted] = useState(false);
  const [isQuizzFinished, setIsQuizzFinished] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [currentIndexQuestion, setCurrentIndexQuestion] = useState(0);
  const question = quizzChosen?.questions[currentIndexQuestion];

  function handleAnswerClicked(choice: string) {
    setCurrentIndexQuestion(currentIndexQuestion + 1);
    let correctAnswerUpdated = correctAnswer + 1;

    if (choice === question?.answer) {
      setCorrectAnswer(correctAnswerUpdated);
    }
    if (currentIndexQuestion === quizzChosen?.questions.length - 1) {
      const newQuizzAnsweredToAdd = {
        name: quizzChosen?.name,
        score: correctAnswerUpdated,
        image: quizzChosen?.image,
        createdAt: new Date().toLocaleDateString("fr"),
        id: crypto.randomUUID(),
      };
      handleHistoryQuizz(newQuizzAnsweredToAdd, username, historyData);
      setIsQuizzStarted(false);
      setIsQuizzFinished(true);
    }
  }

  return (
    <div className="quizz-container">
      <div className="quizz-top">
        <Link href={`/menu/${username}`}>Retourner à l{"'"}accueil</Link>
        <h1 className="quizz-name">Quizz : {quizzChosen.name}</h1>
        <div className="quizzparameters">
          <span>{quizzChosen?.theme}</span>
          <span> {quizzChosen?.difficulty}</span>
        </div>
      </div>
      <div className="quizz-maincontainer">
        {isQuizzStarted && (
          <div className="game">
            <h1>Question n*{currentIndexQuestion + 1}</h1>
            <h2 className="question">{question?.question}</h2>
            <div className="choices">
              {question?.choices.map((choice) => (
                <span key={choice} onClick={() => handleAnswerClicked(choice)}>
                  {choice}
                </span>
              ))}
            </div>
            <span>
              Score actuel : {correctAnswer}/{currentIndexQuestion}
            </span>
          </div>
        )}
        {isQuizzFinished && (
          <h2>
            Score : {correctAnswer}/{currentIndexQuestion}
          </h2>
        )}
        {!isQuizzStarted && !isQuizzFinished && (
          <button onClick={() => setIsQuizzStarted(true)}>
            COMMENCER LE QUIZZ
          </button>
        )}
      </div>
    </div>
  );
};

export default GameQuizz;
