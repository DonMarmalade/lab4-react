import {createContext, useContext, useState} from "react";

const ScoreContext = createContext()

export function ScoreProvider({ children }) {
    const [history, setHistory] = useState([]);
    const [highScores, setHighScores] = useState([]);
    const [score, setScore] = useState(0);

    const updateHistory = (history) => setHistory(history);
    const updateHighScore = (highScore) => setHighScores(highScore);
    const updateScore = (score) => setScore(score);

    return (
        <ScoreContext.Provider value={{history, highScores, score, updateHistory, updateHighScore, updateScore}}>
            {children}
        </ScoreContext.Provider>
    )
}

export function useScoreContext(){
    return useContext(ScoreContext);
}