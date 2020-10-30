import React from 'react';
import {Link} from 'react-router-dom';
import './LandingPage.css';

function LandingPage(props) {
    return (
        <div className="LandingPage flex-ctr">
            <h1 className="LandingPage-title">Tandem Trivia</h1>
            <button className="btn"><Link to="/play">New Game</Link></button>
        </div>
    )
}

export default LandingPage;