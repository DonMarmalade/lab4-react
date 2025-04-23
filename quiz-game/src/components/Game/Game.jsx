import styles from './Game.module.css'
import React, {useEffect, useRef, useState} from "react";
import questionData from "@data/questions.json";
import StartScreen from "@components/StartScreen/index.js";
import Leaderboard from "@components/LeaderBoard/index.js";
import QuestionCard from "@components/QuestionCard/index.js";

function Game () {
    const [userName, setUserName] = useState('');
    const [hasStarted, setHasStarted] = useState(false);
    const [useRandomOrder, setUseRandomOrder] = useState(true);
    const [questionList, setQuestionList] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [round, setRound] = useState(1);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [history, setHistory] = useState([]);
    const [highScores, setHighScores] = useState([]);
    const [timeLeft, setTimeLeft] = useState(null);
    const [timerSetting, setTimerSetting] = useState('30');

    const isTimerActive = useRef(false);

    useEffect(() => {
        const savedScores = JSON.parse(localStorage.getItem('quizHighScores')) || [];
        setHighScores(savedScores);
    }, []);

    useEffect(() => {
        if (hasStarted) {
            let selectedQuestions = [...questionData.questions];

            if (useRandomOrder) {
                selectedQuestions.sort(() => Math.random() - 0.5);
            } else {
                selectedQuestions.sort((a, b) => a.id - b.id);
            }

            setQuestionList(selectedQuestions);
            setCurrentQuestion(selectedQuestions[0]);
        }
    }, [hasStarted, useRandomOrder]);

    useEffect(() => {
        if (!currentQuestion || timerSetting === 'unlimited' || gameOver) return;
        isTimerActive.current = true;
        setTimeLeft(parseInt(timerSetting, 10));

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1 && isTimerActive.current) {
                    isTimerActive.current = false;
                    clearInterval(timer);
                    handleAnswer(null);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [currentQuestion, timerSetting, gameOver]);

    const handleStart = (name, order, timeLimit) => {
        setUserName(name);
        setUseRandomOrder(order === 'random');
        setTimerSetting(timeLimit);
        setHasStarted(true);
    };

    const handleAnswer = (selectedAnswer) => {
        const userAnswer = selectedAnswer || 'Unspecified';
        const isCorrect = userAnswer === currentQuestion.correct;

        setHistory((prev) => [
            ...prev,
            {
                question: currentQuestion.question,
                selectedAnswer: userAnswer,
                correctAnswer: currentQuestion.correct,
                isCorrect
            }
        ]);

        if (isCorrect) {
            setScore((prev) => prev + 1);
        }

        setTimeout(() => {
            if (round < 10) {
                setRound((prev) => prev + 1);
                setCurrentQuestion(questionList[round]);
            } else {
                setGameOver(true);
                const newScore = { name: userName, score };
                const updatedScores = [...highScores, newScore];
                localStorage.setItem('quizHighScores', JSON.stringify(updatedScores));
                setHighScores(updatedScores);
            }
        }, 1000);
    };


    const resetGame = () => {
        setScore(0);
        setRound(1);
        setHistory([]);
        setGameOver(false);
        setHasStarted(false);
        setUserName('');
        setQuestionList([]);
        setCurrentQuestion(null);
    };

    if (!hasStarted) {
        return <StartScreen onStart={handleStart} />;
    }

    if (gameOver) {
        return (
            <div>
                <h2>Game Over, {userName}! Your score: {score}/10</h2>
                <h3>Answers Summary:</h3>
                <ul>
                    {history.map((entry, idx) => (
                        <li key={idx} style={{ marginBottom: '1rem' }}>
                            <strong>Q{idx + 1}: {entry.question}</strong><br />
                            Your answer: <span style={{ color: entry.isCorrect ? 'green' : 'red' }}>
                {entry.selectedAnswer}
              </span><br />
                            {!entry.isCorrect && <>Correct answer: <strong>{entry.correctAnswer}</strong></>}
                        </li>
                    ))}
                </ul>
                <Leaderboard highScores={highScores} />
                <button onClick={resetGame} style={{ marginTop: '1rem' }}>
                    🔁 Play Again
                </button>
            </div>
        );
    }

    return (
        <div>
            <h2>Round {round}/10</h2>
            {timerSetting !== 'unlimited' && <p>⏱ Time Left: {timeLeft}s</p>}
            {currentQuestion && (
                <QuestionCard
                    question={currentQuestion.question}
                    answers={currentQuestion.answers}
                    onAnswerClick={handleAnswer}
                />
            )}
        </div>
    );
}

export default Game;