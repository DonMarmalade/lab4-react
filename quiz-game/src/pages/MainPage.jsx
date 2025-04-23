import styles from './pages.module.css';
import { useNavigate } from "react-router-dom";
import {useStartContext} from "@context/StartContext.jsx";
import {useThemeContext} from "@context/ThemeContext.jsx";
import ThemeSwitcher from "@components/ThemeSwitcher/index.js";
import {useState} from "react";

function MainPage() {
    const {name, order, timeLimit, updateName, updateOrder, updateTimeLimit} = useStartContext();
    const { theme, toggleTheme } = useThemeContext();

    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const nameRegex = /^[a-zA-ZăâîșțĂÂÎȘȚ\s'-]+$/;

        if (!nameRegex.test(name)) {
            setErrorMessage("Name must contain only letters");
            return;
        }

        navigate('/quiz')
    };

    return (
        <div className={styles.mainPage}>
            <ThemeSwitcher theme={theme} onClick={toggleTheme} />

            <h1 className={styles.heading}>Welcome to the Quiz Game!</h1>

            {errorMessage &&
                <p className={styles.error}>
                    {errorMessage}
                </p>
            }

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nameInput">Your name:</label>
                        <input
                            id="nameInput"
                            type="text"
                            value={name}
                            onChange={(e) => updateName(e.target.value)}
                            required
                        />
                </div>

                <div className={styles.selectGroup}>
                    <label htmlFor="orderSelect">Question Order:</label>
                    <select
                        id="orderSelect"
                        value={order}
                        onChange={(e) => updateOrder(e.target.value)}
                    >
                        <option value="random">Random</option>
                        <option value="fixed">In JSON Order</option>
                    </select>
                </div>

                <div className={styles.optionGroup}>
                    <label htmlFor="timerSelect">Time per question:</label>
                    <select
                        id="timerSelect"
                        value={timeLimit}
                        onChange={(e) => updateTimeLimit(e.target.value)}
                    >
                        <option value="10">10 seconds</option>
                        <option value="30">30 seconds</option>
                        <option value="unlimited">Unlimited</option>
                    </select>
                </div>

                <button className={styles.button} type="submit">
                    Start Game
                </button>
            </form>
        </div>
    );
}

export default MainPage;