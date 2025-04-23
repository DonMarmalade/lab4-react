import styles from './pages.module.css';
import {useStartContext} from "@context/StartContext.jsx";
import {useScoreContext} from "@context/ScoreContext.jsx";
import { useNavigate } from "react-router-dom";
import Leaderboard from "@components/LeaderBoard/index.js";

function ScorePage() {
    const {name, updateName} = useStartContext();
    const {history, highScores, score, updateHistory, updateScore} = useScoreContext();

    const navigate = useNavigate();

    const resetGame = () => {
        updateName('');
        updateScore(0);
        updateHistory([]);
        navigate('/');
    };

    return (
        <div>
            <h2>Game Over, {name}! Your score: {score}/10</h2>
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
                Play Again
            </button>
        </div>
    );
}

export default ScorePage;