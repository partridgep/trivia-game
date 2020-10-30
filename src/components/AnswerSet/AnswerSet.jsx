import React from 'react';
// import styles from './AnswerSet.module.css';

const AnswerSet = ({ currentQandA, checkIfCorrect, randomlyOrderedAnswers, disableAnswerBtns }) => (
    <div>
        {randomlyOrderedAnswers && randomlyOrderedAnswers.map((answer, idx) => 
            <button disabled={disableAnswerBtns && true} key={idx} onClick={() => checkIfCorrect(answer, currentQandA)}>{answer}</button>)
        }
    </div>
)

export default AnswerSet;