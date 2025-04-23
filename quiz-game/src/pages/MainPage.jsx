import styles from './pages.module.css';
import { useNavigate } from "react-router-dom";
import {useStartContext} from "@context/StartContext.jsx";

function MainPage() {
    const {name, order, timeLimit, updateName, updateOrder, updateTimeLimit} = useStartContext();

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/quiz')
    };

    return (
        <div className="start-screen">
            <h1>Welcome to the Quiz Game!</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Your name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => updateName(e.target.value)}
                            required
                        />
                    </label>
                </div>

                <div style={{ marginTop: '1rem' }}>
                    <p>Question Order:</p>
                    <label>
                        <input
                            type="radio"
                            name="order"
                            value="random"
                            checked={order === 'random'}
                            onChange={() => updateOrder('random')}
                        />
                        Random
                    </label>
                    <br />
                    <label>
                        <input
                            type="radio"
                            name="order"
                            value="fixed"
                            checked={order === 'fixed'}
                            onChange={() => updateOrder('fixed')}
                        />
                        In JSON Order
                    </label>
                </div>

                <div style={{ marginTop: '1rem' }}>
                    <p>Time Limit Per Question:</p>
                    <label>
                        <input
                            type="radio"
                            name="timeLimit"
                            value="10"
                            checked={timeLimit === '10'}
                            onChange={() => updateTimeLimit('10')}
                        />
                        10 seconds
                    </label>
                    <br />
                    <label>
                        <input
                            type="radio"
                            name="timeLimit"
                            value="30"
                            checked={timeLimit === '30'}
                            onChange={() => updateTimeLimit('30')}
                        />
                        30 seconds
                    </label>
                    <br />
                    <label>
                        <input
                            type="radio"
                            name="timeLimit"
                            value="unlimited"
                            checked={timeLimit === 'unlimited'}
                            onChange={() => updateTimeLimit('unlimited')}
                        />
                        Unlimited
                    </label>
                </div>

                <button type="submit" style={{ marginTop: '1rem' }}>
                    Start Game
                </button>
            </form>
        </div>
    );
}

export default MainPage;