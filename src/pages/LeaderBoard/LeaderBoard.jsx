import React, { useState, UseEffect, useEffect } from 'react';
import {Link} from 'react-router-dom';
import './LeaderBoard.css';

import highScoresService from '../../utils/highScoresService';
import ScoreTable from '../../components/ScoreTable/ScoreTable';

function LeaderBoard(props) {

    const [state, setState] = useState({scores: []});

    useEffect( async () => {
        const scores = await highScoresService.getScores();
        console.log(scores);
        setState({ scores });
    }, []);

    return (
        <div className="LeaderBoard flex-ctr">
            <Link to='/' className="LeaderBoard-back">Home</Link>
            <h1 className="LeaderBoard-title">Leaderboard</h1>
            <ScoreTable scores={state.scores} />
        </div>
    )
}

export default LeaderBoard;