const Questionnaire = require("../models/questionnaire");


const post_questionnaire = (req, res, next) => {
    Questionnaire.create(req.body).then(function(questionnaire) {
        res.send(questionnaire);
    }).catch(next);
}

module.exports={
    post_questionnaire
}