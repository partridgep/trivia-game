import React from 'react';
// import styles from './AnswerSet.module.css';

function randomlyOrderAnswers(incorrect, correct) {
    // copy array of incorrect answers
    let possibleAnswers = [...incorrect];
    // insert correct answer at random index
    possibleAnswers.splice(Math.floor(Math.random()*(incorrect.length-0+1)), 0, correct);
    return possibleAnswers;
} 

const AnswerSet = ({ currentQandA, checkIfCorrect }) => (
    <div>
        {currentQandA.incorrect && randomlyOrderAnswers(currentQandA.incorrect, currentQandA.correct).map((answer, idx) => 
            <button key={idx} onClick={() => checkIfCorrect(answer, currentQandA)}>{answer}</button>)
        }
    </div>
)

export default AnswerSet;