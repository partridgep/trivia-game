import React from 'react';

const WonPopUp = ({ resetGame, handleAskToAddScore, correctlyAnswered, gameTimer, formatTime }) => (
    <div className='WonLostPopUp flex-ctr'>
        <h1 className='GamePage-stat GamePage-won'>You won!</h1>
        <h2 className='GamePage-stat GamePage-finalResult'>
            You answered {correctlyAnswered === 1 ? `${correctlyAnswered} question` : `${correctlyAnswered} questions`} correctly in {formatTime(gameTimer)}
        </h2>
        <div className='flex-ctr'>
            <button className='btn' onClick={() => handleAskToAddScore()}>Enter Leaderboard</button>
            <button className='btn' onClick={() => resetGame()}>Play Again</button>
        </div>
    </div>
)

export default WonPopUp;