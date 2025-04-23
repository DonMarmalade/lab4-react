import styles from './pages.module.css';
import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import questionData from "@data/questions.json";
import QuestionCard from "@components/QuestionCard/index.js";
import {useStartContext} from "@context/StartContext.jsx";
import {useScoreContext} from "@context/ScoreContext.jsx";
import {useThemeContext} from "@context/ThemeContext.jsx";
import ThemeSwitcher from "@components/ThemeSwitcher/index.js";

function QuizPage() {
    const {name, order, timeLimit} = useStartContext();
    const {highScores, score, updateHistory, updateHighScore, updateScore} = useScoreContext();
    const { theme, toggleTheme } = useThemeContext();

    const [questionList, setQuestionList] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [round, setRound] = useState(1);
    const [timeLeft, setTimeLeft] = useState(null);

    const navigate = useNavigate();

    const isTimerActive = useRef(false);

    useEffect(() => {
        const savedScores = JSON.parse(localStorage.getItem('quizHighScores')) || [];
        updateHighScore(savedScores);
    }, []);

    useEffect(() => {
        let selectedQuestions = [...questionData.questions];

        if (order === 'random') {
            selectedQuestions.sort(() => Math.random() - 0.5);
        } else {
            selectedQuestions.sort((a, b) => a.id - b.id);
        }

        setQuestionList(selectedQuestions);
        setCurrentQuestion(selectedQuestions[0]);
    }, [order]);

    useEffect(() => {
        if (!currentQuestion || timeLimit === 'unlimited') return;
        isTimerActive.current = true;
        setTimeLeft(parseInt(timeLimit, 10));

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
    }, [currentQuestion, timeLimit]);

    const handleAnswer = (selectedAnswer) => {
        const userAnswer = selectedAnswer || 'Unspecified';
        const isCorrect = userAnswer === currentQuestion.correct;

        updateHistory((prev) => [ // problem
            ...prev,
            {
                question: currentQuestion.question,
                selectedAnswer: userAnswer,
                correctAnswer: currentQuestion.correct,
                isCorrect
            }
        ]);

        if (isCorrect) {
            updateScore((prev) => prev + 1);
        }

        setTimeout(() => {
            if (round < 10) {
                setRound((prev) => prev + 1);
                setCurrentQuestion(questionList[round]);
            } else {
                const newScore = {name: name, score};
                const updatedScores = [...highScores, newScore];
                localStorage.setItem('quizHighScores', JSON.stringify(updatedScores));
                updateHighScore(updatedScores);
                navigate('/score');
            }
        }, 1000);
    };

    return (
        <div className={styles.quizPage}>
            <ThemeSwitcher theme={theme} onClick={toggleTheme} />

            <h2>Round {round}/10</h2>

            {currentQuestion &&
                <div className={styles.questionMeta}>
                    <div className={styles.categoryBadge}>
                        Category: {currentQuestion.category}
                    </div>

                    <div
                        className={`${styles.difficultyBadge} ${
                            currentQuestion.difficulty === 'Easy'
                                ? styles.easy
                                : currentQuestion.difficulty === 'Medium'
                                    ? styles.medium
                                    : styles.hard
                        }`}
                    >
                        Difficulty: {currentQuestion.difficulty}
                    </div>
                </div>
            }

            {timeLimit !== 'unlimited' &&
                <p>Time Left: {timeLeft}s</p>
            }

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

export default QuizPage;