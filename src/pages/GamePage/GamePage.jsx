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
        count: 0,
        showNexButton: false,
        chosenAnswer: ''
    }

    async componentDidMount() {
        await this.resetGame();
    }

    // randomly get idx for trivia question
    getTriviaIdx = () => {
        return Math.floor(Math.random()*(triviaData.length-1)+1);
    }

    getNewQuestion = () => {
        // remove "Next Question" button
        this.setState({showNexButton: false, disableAnswerBtns: false});
        // get random question idx
        let triviaIdx = this.getTriviaIdx();
        // get new idx if question has already been asked
        while (this.state.askedQuestions.includes(triviaData[triviaIdx].question)) triviaIdx = this.getTriviaIdx();
        // grab JSON data for new question
        let triviaQandA = triviaData[triviaIdx];
        // update the question in state
        this.setState({triviaQandA});
        let randomlyOrderedAnswers = this.randomlyOrderAnswers(triviaQandA.incorrect, triviaQandA.correct);
        this.setState({randomlyOrderedAnswers});
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
        if (correct === true) {
            this.setState({showNexButton: true});
        }
        else this.setState({lost: true});
        this.setState({disableAnswerBtns: true, chosenAnswer: answer})
    }

    resetGame = async () => {
        await this.setState({
            lost: false,
            triviaQandA: {},
            askedQuestions: [],
            count: 0,
            showNexButton: false
        });
        this.getNewQuestion();
    }

    randomlyOrderAnswers(incorrect, correct) {
        // copy array of incorrect answers
        let possibleAnswers = [...incorrect];
        // insert correct answer at random index
        possibleAnswers.splice(Math.floor(Math.random()*(incorrect.length-0+1)), 0, correct);
        return possibleAnswers;
    } 

    render() {
        return (
           <div className='GamePage flex-ctr'>
                   <h1 className='GamePage-stat'>Round {this.state.count < 11 ? 1 : 2}</h1>
                   <h1 className='GamePage-stat'>Question {this.state.count}</h1>
                   <Question 
                       question={this.state.triviaQandA.question}
                   />
                   <AnswerSet
                       currentQandA={this.state.triviaQandA}
                       randomlyOrderedAnswers={this.state.randomlyOrderedAnswers}
                       checkIfCorrect={this.checkIfCorrect}
                       disableAnswerBtns={this.state.disableAnswerBtns}
                       chosenAnswer={this.state.chosenAnswer}
                   />
               {this.state.showNexButton && 
                    <button 
                        className='btn GamePage-proceed'
                        onClick={() => this.getNewQuestion()}
                    >
                        Next Question
                    </button>}
               {this.state.lost && 
                    <div>
                        <h1 className='GamePage-stat GamePage-lost'>You lost!</h1>
                        <button className='btn' onClick={() => this.resetGame()}>Play Again</button>
                    </div>
                }
           </div>
       )
    }
}

export default GamePage;