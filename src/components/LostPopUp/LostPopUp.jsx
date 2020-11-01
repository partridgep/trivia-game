import React from 'react';

const LostPopUp = ({ resetGame, handleAskToAddScore, count }) => (
    <div className='WonLostPopUp flex-ctr'>
        <h1 className='GamePage-stat GamePage-lost'>You Lost!</h1>
        <div className='flex-ctr'>
            {count > 1 &&
                <button className='btn' onClick={() => handleAskToAddScore()}>Enter Leaderboard</button>
            }
            <button className='btn' onClick={() => resetGame()}>Try Again</button>
        </div>
    </div>
)

export default LostPopUp;