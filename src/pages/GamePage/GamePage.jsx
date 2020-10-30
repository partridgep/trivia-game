import React, { useState, useEffect, Component } from 'react';
// import {Link} from 'react-router-dom';
import './GamePage.css';

import Question from '../../components/Question/Question';
import AnswerSet from '../../components/AnswerSet/AnswerSet';

import triviaData from '../../assets/Apprentice_TandemFor400_Data.json';

class GamePage extends Component {

    // state of game 
    state = {
        lost: false,
        triviaQandA: {},
        askedQuestions: [],
        count: 0
    }

    async componentDidMount() {
        await this.resetGame();
    }

    // randomly get idx for trivia question
    getTriviaIdx = () => {
        return Math.floor(Math.random()*(triviaData.length-1)+1);
    }

    getNewQuestion = () => {
        // get random question idx
        let triviaIdx = this.getTriviaIdx();
        // get new idx if question has already been asked
        while (this.state.askedQuestions.includes(triviaData[triviaIdx].question)) triviaIdx = this.getTriviaIdx();
        // grab JSON data for new question
        let triviaQandA = triviaData[triviaIdx];
        // update the question in state
        this.setState({triviaQandA});
        // mark this question as already asked so it will not get repeated
        let askedQuestions = [...this.state.askedQuestions, triviaQandA.question];
        this.setState({askedQuestions});
        // increment question count by one
        let count = this.state.count + 1;
        this.setState({count})
    }

    checkIfCorrect = (answer, currentQandA) => {
        let correct = false;
        console.log(currentQandA);
        if (answer === currentQandA.correct) correct = true;
        if (correct === true) this.getNewQuestion();
        else this.setState({lost: true});
    }

    resetGame = async () => {
        await this.setState({
            lost: false,
            triviaQandA: {},
            question: "",
            incorrect: [],
            correct: "",
            askedQuestions: [],
            count: 0,
            readyToPlay: true
        });
        this.getNewQuestion();
    }

    // initialize game and get new question on load
    // useEffect(() => {
    //     resetGame();
    // }, [])

    // useEffect(() => {
    //     getNewQuestion();
    // }, [gameState.readyToPlay])


    render() {
        return (
           <div className='GamePage'>
               { !this.state.lost ? 
               <div>
                   <h1>Round {this.state.count < 11 ? 1 : 2}</h1>
                   <h1>Question {this.state.count}</h1>
                   <Question 
                       question={this.state.triviaQandA.question}
                   />
                   <AnswerSet
                       currentQandA={this.state.triviaQandA}
                       checkIfCorrect={this.checkIfCorrect}
                   />
               </div>
               :
               <div>
                   <h1>You lost!</h1>
                   <button onClick={() => this.resetGame()}>Play Again</button>
               </div>
               }
           </div>
       )
    }
}

export default GamePage;