const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const optionSchema = new Schema({
    optID: {
        type: String,
        required: true
    },
    opttxt: {
        type: String,
        required: true
    },
    nextqID: {
        type: String,
        required: true
    },
});

const questionSchema = new Schema({
    qID: {
        type: String,
        required: true
    },
    qtext: {
        type: String,
        required: true
    },
    required: {
        type: String,       // Boolean?
        required: true
    },
    type: {
        type: String,
        required: true
    },
    options: {
        type: [optionSchema],
        required: true
    } 
});

const questionnaireSchema = new Schema({
    questionnaireID: {
        type: String,
        required: true
    },
    questionnaireTitle: {
        type: String,
        required: true
    },
    keywords: {
        type: [String],
    },
    questions: {
        type: [questionSchema],
        required: true
    }
});

const Questionnaire = mongoose.model('Questionnaire', questionnaireSchema);
module.exports = Questionnaire;