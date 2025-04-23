import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {MainPage, QuizPage, ScorePage} from "@pages/index.js";
import {StartProvider} from "@context/StartContext.jsx";
import {ScoreProvider} from "@context/ScoreContext.jsx";

function App() {
    return (
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
    )
}

export default App;

// TODO: Make main code more optimized
// TODO: Question Into Romanian
// TODO: CSS (Responsive)
// TODO: Light/Dark Theme
// TODO: Make Callbacks