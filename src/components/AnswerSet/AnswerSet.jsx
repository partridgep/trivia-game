import React from 'react';
// import styles from './AnswerSet.module.css';

function randomlyOrderAnswers(incorrect, correct) {
    // copy array of incorrect answers
    let possibleAnswers = [...incorrect];
    // insert correct answer at random index
    possibleAnswers.splice(Math.floor(Math.random()*(incorrect.length-0+1)), 0, correct);
    return possibleAnswers;
} 

const AnswerSet = ({ incorrect, correct, checkIfCorrect, currentQandA }) => (
    <div>
        {randomlyOrderAnswers(incorrect, correct).map(answer => 
            <button onClick={() => checkIfCorrect(answer, currentQandA)}>{answer}</button>)
        }
    </div>
)

export default AnswerSet;