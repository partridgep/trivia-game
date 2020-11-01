import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './GamePage.css';

import Question from '../../components/Question/Question';
import AnswerSet from '../../components/AnswerSet/AnswerSet';
import Countdown from '../../components/Countdown/Countdown';

import triviaData from '../../assets/Apprentice_TandemFor400_Data.json';
import WonPopUp from '../../components/WonPopUp/WonPopUp';
import LostPopUp from '../../components/LostPopUp/LostPopUp';
import NamePrompt from '../../components/NamePrompt/NamePrompt';

class GamePage extends Component {

    // state of game 
    state = { 
        triviaQandA: {},
        addingScore: false,
     }

    // upon load, initialize game in state
    async componentDidMount() {
        await this.resetGame();
        // start both question and game timers
        this.timerId = setInterval(this.handleTick, 1000);
    }

    // clear the timer at end of component lifecycle
    componentWillUnmount() {
        clearInterval(this.timerId);
      }

    // randomly get idx for trivia question
    getTriviaIdx = () => {
        return Math.floor(Math.random()*(triviaData.length));
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
        // randomly order the question's answers
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
            let correctlyAnswered = this.state.correctlyAnswered + 1;
            this.setState({ correctlyAnswered });
            // tell player they've won if they answered all 10 questions
            if (this.state.count === 10) {
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
        // if question timer is down to 0,
        // stop clock on both timers
        else this.setState({isGameTiming: false, isQuestionTiming: false});
      }

    // increment game timer
    handleUpdateGameTimer = () => {
        // forfeit game if question timer is down to 0
        if (this.state.questionTimer === 1) {
            let gameTimer = this.state.gameTimer + 1;
            this.setState({ gameTimer, lost: true, disableAnswerBtns: true });
        }
        else {
            let gameTimer = this.state.gameTimer + 1;
            this.setState({ gameTimer });
        }
      }

    // decrease question timer
    handleUpdateQuestionTimer = () => {
        let questionTimer = this.state.questionTimer - 1;
        this.setState({ questionTimer });
    }

    handleAskToAddScore = () => {
        this.setState({ addingScore: true });
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
            isGameTiming: true,
            correctlyAnswered: 0
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
                    <Link to='/' className="GamePage-back">Back</Link>
                    <Countdown
                        questionTimer={this.state.questionTimer}
                    />
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
                    <LostPopUp 
                        resetGame={this.resetGame} 
                        handleAskToAddScore={this.handleAskToAddScore}
                        correctlyAnswered={this.state.correctlyAnswered}
                        gameTimer={this.state.gameTimer}
                        formatTime={this.props.formatTime}
                    />
                }
               {this.state.won && !this.state.addingScore &&
                    <WonPopUp 
                        resetGame={this.resetGame}
                        handleAskToAddScore={this.handleAskToAddScore}
                        correctlyAnswered={this.state.correctlyAnswered}
                        gameTimer={this.state.gameTimer}
                        formatTime={this.props.formatTime}
                    />
                }
                {this.state.addingScore && 
                    <NamePrompt 
                        count={this.state.count}
                        gameTimer={this.state.gameTimer}
                        lost={this.state.lost}
                    />
                }
           </div>
       )
    }
}

export default GamePage;