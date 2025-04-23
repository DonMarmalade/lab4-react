import React, { useState } from 'react';

function StartScreen({ onStart }) {
    const [name, setName] = useState('');
    const [order, setOrder] = useState('random');
    const [timeLimit, setTimeLimit] = useState('30');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (name.trim()) {
            onStart(name.trim(), order, timeLimit);
        }
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
                            onChange={(e) => setName(e.target.value)}
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
                            onChange={() => setOrder('random')}
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
                            onChange={() => setOrder('fixed')}
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
                            onChange={() => setTimeLimit('10')}
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
                            onChange={() => setTimeLimit('30')}
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
                            onChange={() => setTimeLimit('unlimited')}
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

export default StartScreen;
