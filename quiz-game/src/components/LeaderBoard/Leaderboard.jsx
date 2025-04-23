import styles from  './Leaderboard.module.css'

function Leaderboard({ highScores }) {
    const sorted = [...highScores].sort((a, b) => b.score - a.score).slice(0, 10);

    return (
        <div className={styles.leaderboard}>
            <h3>Leaderboard</h3>
            <table>
                <thead>
                <tr>
                    <th>Player</th>
                    <th>Score</th>
                </tr>
                </thead>
                <tbody>
                {sorted.map((entry, idx) => (
                    <tr key={idx}>
                        <td>{entry.name}</td>
                        <td>{entry.score}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Leaderboard;