import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import styles from './NamePrompt.module.css';

import highScoresService from '../../utils/highScoresService';

class NamePrompt extends Component {

    state = {
        name: "",
        toLeaderboard: false
    }

    // handle user input
    handleChange = e => {
        this.setState({ name: e.target.value });
    }

    // add score to leaderboard
    handleAddScore = async (e) => {
        // prevent submit from refreshing page
        e.preventDefault();
        // add # of questions answered, name, and total seconds to database
        await highScoresService.addScore({
            numQuestions: this.props.count, 
            name: this.state.name, 
            seconds: this.props.gameTimer
        });
        // redirect to leaderboard page
        this.setState({ toLeaderboard: true });
    }

    render() {

        if (this.state.toLeaderboard) {
            return <Redirect to='/leaderboard' />
        }

        return (
            <div className='WonLostPopUp flex-ctr' >
                <div className={styles.NamePrompt}>
                    <h1 className='GamePage-stat'>Enter Your Name:</h1>
                    <form className='flex-ctr' onSubmit={(e) => this.handleAddScore(e)}>
                        <input
                                type="text"
                                value={this.state.name} 
                                autoComplete="off"
                                onChange={(e) => this.handleChange(e)}
                            />
                        <button className='btn'>Submit</button>
                    </form>
                </div>
            </div>
        )
        
    }
}

export default NamePrompt;