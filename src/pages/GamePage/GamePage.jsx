import React, { Component } from 'react';
// import {Link} from 'react-router-dom';
import './GamePage.css';

import Question from '../../components/Question/Question';
import AnswerSet from '../../components/AnswerSet/AnswerSet';
import Countdown from '../../components/Countdown/Countdown';

import triviaData from '../../assets/Apprentice_TandemFor400_Data.json';
import WonPopUp from '../../components/WonPopUp/WonPopUp';
import LostPopUp from '../../components/LostPopUp/LostPopUp';

import highScoresService from '../../utils/highScoresService';

class GamePage extends Component {

    // state of game 
    state = { triviaQandA: {} }

    // upon load, initialize game in state
    async componentDidMount() {
        await this.resetGame();
        this.timerId = setInterval(this.handleTick, 1000);
    }

    // clear the timer at end of component lifecycle
    componentWillUnmount() {
        clearInterval(this.timerId);
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
        // reset question timer
        this.setState({isQuestionTiming: true, questionTimer: 30});
    }

    checkIfCorrect = (answer, currentQandA) => {
        // pause timer on question
        this.setState({isQuestionTiming: false});
        // set default value for correct boolean
        let correct = false;
        // compare selected answer to the question's correct answer
        // change correct boolean to true if it matches
        if (answer === currentQandA.correct) correct = true;
        // if correct boolean is set to true
        if (correct === true) {
            // tell player they've won if they answered all questions
            if (this.state.count === 20) {
                this.setState({won: true, isGameTiming: false});
            }
            // otherwise show "Next Question" button
            else this.setState({showNexButton: true});
        }
        // else set lost boolean to true
        else this.setState({lost: true, isQuestionTiming: false, isGameTiming: false});
        // in any case, disable the answer buttons
        // so the user can't change their answer
        // and commit the chosen answer to state
        // so that it may be displayed in green
        this.setState({disableAnswerBtns: true, chosenAnswer: answer})
    }

    // every second, call methods to update their timers
    handleTick = () => {
        // increment game timer by 1
        // and decrease question timer by 1
        if (this.state.questionTimer !== 0) {
            if (this.state.isGameTiming) this.handleUpdateGameTimer();
            if (this.state.isQuestionTiming) this.handleUpdateQuestionTimer();
        }
        else this.setState({isGameTiming: false, isQuestionTiming: false});
      }

    // increment game timer
    handleUpdateGameTimer = () => {
        // forfeit game if question timer is down to 0
        if (this.state.questionTimer === 1) {
            this.setState({ gameTimer: ++this.state.gameTimer, lost: true, disableAnswerBtns: true });
        }
        else {
            this.setState({ gameTimer: ++this.state.gameTimer });
        }
      }

    // increment question timer
    handleUpdateQuestionTimer = () => {
        this.setState({ questionTimer: --this.state.questionTimer });
    }

    // add score to leaderboard
    handleAddScore = async () => {
        const scores = await highScoresService.addScore({numQuestions: this.state.count, name: 'Paul', seconds: this.state.gameTimer});
        console.log(scores);
        this.setState({ scores });
    }

    resetGame = async () => {
        await this.setState({
            lost: false,
            won: false,
            triviaQandA: {},
            askedQuestions: [],
            count: 0,
            showNexButton: false,
            questionTimer: 30,
            isQuestionTiming: true,
            gameTimer: 0,
            isGameTiming: true
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
                    <Countdown
                        questionTimer={this.state.questionTimer}
                    />
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
                       questionTimer={this.state.questionTimer}
                   />
               {this.state.showNexButton && 
                    <button 
                        className='btn GamePage-proceed'
                        onClick={() => this.getNewQuestion()}
                    >
                        Next Question
                    </button>}
               {this.state.lost && 
                    <LostPopUp resetGame={this.resetGame} />
                }
               {this.state.won && 
                    <WonPopUp 
                        resetGame={this.resetGame}
                        handleAddScore={this.handleAddScore}
                    />
                }
           </div>
       )
    }
}

export default GamePage;