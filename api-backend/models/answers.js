import {nanoid} from 'nanoid';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ansSchema = new Schema({
    qID: {
        type: String,
        required: true
    },
    optID: {
        type: String,
        required: true
    }
});

const answerSchema = new Schema({
    questionnaireID: {
        type: String,
        required: true
    },
    sessionID: {
        type: String,
        required: true,
        default: () => nanoid(4),
        index: { unique: true },
    },
    ans: {
        type: [ansSchema],
        required: true
    }
});

const Answers = mongoose.model('Answer', answerSchema);
module.exports = Answers;