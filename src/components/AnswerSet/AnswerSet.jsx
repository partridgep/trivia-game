import React from 'react';
// import styles from './AnswerSet.module.css';

function randomlyOrderAnswers(incorrect, correct) {
    let possibleAnswers = [...incorrect];
    possibleAnswers.splice(Math.floor(Math.random()*(incorrect.length-0+1)), 0, correct);
    return possibleAnswers;
} 

const AnswerSet = ({ incorrect, correct }) => (
    <div>
        {randomlyOrderAnswers(incorrect, correct).map(answer => <button>{answer}</button>)}
    </div>
)

export default AnswerSet;