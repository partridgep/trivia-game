import React from 'react';
import {Link} from 'react-router-dom';
import './LandingPage.css';

function LandingPage(props) {
    return (
        <div className="LandingPage flex-ctr">
            <h1 className="LandingPage-title">Tandem Trivia</h1>
            <Link className="btn LandingPage-btn" to="/play">New Game</Link>
            <Link className="btn LandingPage-btn" to="/leaderboard">Leaderboard</Link>
        </div>
    )
}

export default LandingPage;