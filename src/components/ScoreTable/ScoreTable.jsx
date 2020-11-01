import React from 'react';
import styles from './ScoreTable.module.css';

const ScoreTable = ({ scores, formatTime }) => (
    <table className={styles.ScoreTable}>
        <thead>
            <tr>
                <th>Name</th>
                <th># Answered</th>
                <th>Time</th>
            </tr>
        </thead>
        <tbody>
            {scores.map((score, idx) => 
                <tr key={idx}>
                    <td>{score.name}</td>
                    <td>{score.numQuestions}</td>
                    <td>{formatTime(score.seconds)}</td>
                </tr>
            )}
        </tbody>
    </table>
)

export default ScoreTable;