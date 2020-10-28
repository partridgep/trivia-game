import React from 'react';
import {Link} from 'react-router-dom';
import './LandingPage.css';

function LandingPage(props) {
    return (
        <div className='LandingPage'>
            <h1>Tandem Trivia</h1>
            <Link to="/play">New Game</Link>
        </div>
    )
}

export default LandingPage;