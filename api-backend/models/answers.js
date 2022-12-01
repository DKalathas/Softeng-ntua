const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    questionnaireID: {
        type: String,
        required: true
    },
    questionID: {
        type: String,
        required: true,
    },
    session: {
        type: String,
        required: true,
    },
    optionID : {
        type: String,
        required: true
    }
});

const Answers = mongoose.model('Answer', answerSchema);
module.exports = Answers;