import React from 'react';

const LostPopUp = ({ resetGame }) => (
    <div className='WonLostPopUp flex-ctr'>
        <h1 className='GamePage-stat GamePage-lost'>You Lost!</h1>
        <div className='flex-ctr'>
            <button className='btn' onClick={() => resetGame()}>Try Again</button>
        </div>
    </div>
)

export default LostPopUp;