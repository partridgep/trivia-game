const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scoreSchema = new Schema({
        name: String,
        numQuestions: Number,
        seconds: Number
    },
     {timestamps: true}
    );

module.exports = mongoose.model('Score', scoreSchema);