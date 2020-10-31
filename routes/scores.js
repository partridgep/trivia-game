const express = require('express');
const router = express.Router();
const scoresCtrl = require('../controllers/scores');

// GET /api/scores
router.get('/', scoresCtrl.getHighScores);

// POST /api/scores
router.post('/', scoresCtrl.addHighScore);

module.exports = router;