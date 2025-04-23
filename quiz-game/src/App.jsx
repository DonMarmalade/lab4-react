import {Router, Routes, Route} from "@components/navigation";
import {MainPage, QuizPage, ScorePage} from "@pages/index.js";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/">
                    <MainPage />
                </Route>
                <Route path="/quiz">
                    <QuizPage />
                </Route>
                <Route path="/score">
                    <ScorePage />
                </Route>
            </Routes>
        </Router>
    )
}

export default App;

// TODO: Context
// TODO: Pages
// TODO: Make main code more optimized
// TODO: Question Into Romanian
// TODO: CSS (Responsive)
// TODO: Light/Dark Theme
// TODO: Make Callbacks