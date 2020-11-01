import React from 'react';

const LostPopUp = ({ resetGame, handleAskToAddScore, correctlyAnswered, gameTimer, formatTime }) => (
    <div className='WonLostPopUp flex-ctr'>
        <h1 className='GamePage-stat GamePage-lost'>You Lost!</h1>
        <h2 className='GamePage-stat GamePage-finalResult'>
            You answered {correctlyAnswered === 1 ? `${correctlyAnswered} question` : `${correctlyAnswered} questions`} correctly in {formatTime(gameTimer)}
        </h2>
        <div className='flex-ctr'>
            {correctlyAnswered > 0 &&
                <button className='btn' onClick={() => handleAskToAddScore()}>Enter Leaderboard</button>
            }
            <button className='btn' onClick={() => resetGame()}>Try Again</button>
        </div>
    </div>
)

export default LostPopUp;