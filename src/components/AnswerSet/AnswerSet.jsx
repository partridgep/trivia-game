import React from 'react';
import styles from './AnswerSet.module.css';

const AnswerSet = ({ currentQandA, checkIfCorrect, randomlyOrderedAnswers, disableAnswerBtns, chosenAnswer, questionTimer }) => (
    <div className={styles.AnswerSet}>
        {randomlyOrderedAnswers && randomlyOrderedAnswers.map((answer, idx) => 
            <button 
                className={['btn', 'flex-ctr', `${styles.answer}`].join(' ')} 
                style={{
                    background: (disableAnswerBtns === true && answer === currentQandA.correct && questionTimer > 0) ? 
                    "rgb(55, 193, 69)"
                    :
                    (disableAnswerBtns === true && chosenAnswer === answer && answer !== currentQandA.correct) && 
                    "rgb(110, 1, 2)"
                }}
                disabled={disableAnswerBtns && true} key={idx}
                onClick={() => checkIfCorrect(answer, currentQandA)}
            >
                {answer}
            </button>)
        }
    </div>
)

export default AnswerSet;