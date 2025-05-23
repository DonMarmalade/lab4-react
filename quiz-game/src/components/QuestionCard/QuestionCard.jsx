import styles from './QuestionCard.module.css';

function QuestionCard({question, answers, onAnswerClick}) {
    return (
        <div className={styles.question}>
            <h3>{question}</h3>
            <div>
                {answers.map((answer, index) => (
                    <button key={index} onClick={() => onAnswerClick(answer)}>
                        {answer}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default QuestionCard;