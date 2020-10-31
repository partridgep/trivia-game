import React from 'react';

const WonPopUp = ({ resetGame, handleAskToAddScore }) => (
    <div className='WonLostPopUp flex-ctr'>
        <h1 className='GamePage-stat GamePage-won'>You won!</h1>
        <div className='flex-ctr'>
            <button className='btn' onClick={() => handleAskToAddScore()}>Enter Leaderboard</button>
            <button className='btn' onClick={() => resetGame()}>Play Again</button>
        </div>
    </div>
)

export default WonPopUp;