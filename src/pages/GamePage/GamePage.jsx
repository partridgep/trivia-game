import React, { useState, useEffect } from 'react';
// import {Link} from 'react-router-dom';
import './GamePage.css';

import Question from '../../components/Question/Question';
import AnswerSet from '../../components/AnswerSet/AnswerSet';

import triviaData from '../../assets/Apprentice_TandemFor400_Data.json';

function GamePage(props) {

    // state for current question and answers
    const [currentQandA, updateQuestion] = useState({
        question: "",
        incorrect: [],
        correct: ""
    });

    // state for questions already asked
    const [alreadyAsked, markAsAsked] = useState({
        askedQuestions: []
    });

    // state for # of questions asked 
    const [numQuestions, updateNumQuestions] = useState({
        count: 0
    })

    // need funcion to feed new question into question component
    function getNewQuestion() {
        console.log(triviaData)
        // get trivia JSON data
        let triviaQandA = triviaData[Math.floor(Math.random()*(triviaData.length-1)+1)];
        let question = triviaQandA.question;
        let incorrect = triviaQandA.incorrect;
        let correct = triviaQandA.correct;
        // update the question in tate
        updateQuestion({question, incorrect, correct});
        // mark this question as already asked so it will not get repeated
        console.log(alreadyAsked);
        let askedQuestions = [...alreadyAsked.askedQuestions, question];
        console.log(askedQuestions)
        markAsAsked({askedQuestions});
        // increment question count by one
        let count = numQuestions.count + 1;
        updateNumQuestions({count})
    }

    useEffect(() => {
        getNewQuestion();
    }, []
    )


    return (
        <div className='GamePage'>
            <h1>Round {numQuestions.count < 11 ? 1 : 2}</h1>
            <h1>Question {numQuestions.count}</h1>
            <Question 
                question={currentQandA.question}
            />
            <AnswerSet
                incorrect={currentQandA.incorrect}
                correct={currentQandA.correct}
            />
        </div>
    )
}

export default GamePage;