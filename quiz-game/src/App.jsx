import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {MainPage, QuizPage, ScorePage} from "@pages/index.js";
import {StartProvider} from "@context/StartContext.jsx";
import {ScoreProvider} from "@context/ScoreContext.jsx";
import {ThemeProvider} from "@context/ThemeContext.jsx";

function App() {
    return (
        <ThemeProvider>
            <StartProvider>
                <ScoreProvider>
                    <Router>
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/quiz" element={<QuizPage />} />
                            <Route path="/score" element={<ScorePage />} />
                        </Routes>
                    </Router>
                </ScoreProvider>
            </StartProvider>
        </ThemeProvider>
    )
}

export default App;