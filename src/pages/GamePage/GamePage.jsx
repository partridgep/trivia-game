import React, { useState, useEffect } from 'react';
// import {Link} from 'react-router-dom';
import './GamePage.css';

import Question from '../../components/Question/Question';
import AnswerSet from '../../components/AnswerSet/AnswerSet';

import triviaData from '../../assets/Apprentice_TandemFor400_Data.json';

function GamePage(props) {

    // state of game (lost yet or not)
    const [gameStatus, updateGameStatus] = useState({
        lost: false
    })

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

    // randomly get idx for trivia question
    function getTriviaIdx() {
        return Math.floor(Math.random()*(triviaData.length-1)+1);
    }

    function getNewQuestion() {
        // get random question idx
        let triviaIdx = getTriviaIdx();
        // get new idx if question has already been asked
        while (alreadyAsked.askedQuestions.includes(triviaData[triviaIdx].question)) triviaIdx = getTriviaIdx();
        // grab JSON data for new question
        let triviaQandA = triviaData[triviaIdx];
        let question = triviaQandA.question;
        let incorrect = triviaQandA.incorrect;
        let correct = triviaQandA.correct;
        // update the question in state
        updateQuestion({question, incorrect, correct});
        // mark this question as already asked so it will not get repeated
        let askedQuestions = [...alreadyAsked.askedQuestions, question];
        markAsAsked({askedQuestions});
        // increment question count by one
        let count = numQuestions.count + 1;
        updateNumQuestions({count})
    }

    function checkIfCorrect(answer, currentQandA) {
        let correct = false;
        if (answer === currentQandA.correct) correct = true;
        if (correct === true) getNewQuestion();
        else updateGameStatus({lost: true});
    }

    function resetGame() {
        updateGameStatus({lost: false});
        markAsAsked({askedQuestions: []});
        updateNumQuestions({count: 0});
        getNewQuestion();
    }

    // initialize game and get new question on load
    useEffect(() => {
        getNewQuestion();
    }, [])


    return (
        <div className='GamePage'>
            { !gameStatus.lost ? 
            <div>
                <h1>Round {numQuestions.count < 11 ? 1 : 2}</h1>
                <h1>Question {numQuestions.count}</h1>
                <Question 
                    question={currentQandA.question}
                />
                <AnswerSet
                    currentQandA={currentQandA}
                    incorrect={currentQandA.incorrect}
                    correct={currentQandA.correct}
                    checkIfCorrect={checkIfCorrect}
                />
            </div>
            :
            <div>
                <h1>You lost!</h1>
                <button onClick={() => resetGame()}>Play Again</button>
            </div>
            }
        </div>
    )
}

export default GamePage;