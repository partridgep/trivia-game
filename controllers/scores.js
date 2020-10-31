const Score = require('../models/score');

module.exports = {
    getHighScores,
    addHighScore
};

async function getHighScores(req, res) {
    
    try {
        const scores = await Score.find({}).
        sort({numQuestions: -1, seconds: 0});
        res.status(201).json(scores); 
    } catch (error) {
        res.status(400).json({message: 'something went wrong'});
    }
};

async function addHighScore(req, res) {
    
    try {
        await Score.create(req.body);
        getHighScores(req, res);
    } catch (error) {
        res.status(400).json({message: 'something went wrong'});
    }
};