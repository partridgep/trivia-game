import React from 'react';
import styles from './Question.module.css';

const Question = ({ question }) => (
    <h2 className={styles.question}>{question}</h2>
)

export default Question;