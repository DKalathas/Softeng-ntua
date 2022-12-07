const Questionnaire = require("../models/questionnaire");
const Answer = require("../models/answers")
const mongoose = require('mongoose');
const Answers = require("../models/answers");
require('dotenv').config();


const post_questionnaire = (req, res, next) => {
    Questionnaire.create(req.body).then(function(questionnaire) {
        res.send(questionnaire);
    }).catch(next);
}
const get_healthcheck =(req,res)=>{
    mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result=>res.send({"status":"ok","dbconnection":process.env.DATABASE_URI}))
    .catch(err=>{
        res.send({"status":"failed", "dbconnection":process.env.DATABASE_URI})})
        }

const resetall = async (req,res)=>{
    try{
        await Questionnaire.deleteMany();
        await Answer.deleteMany();
        res.json({status:'OK'});
    }catch(err){
        res.json({status:'Failed',reason:err});
    }
};

const addAnswer = async (req, res, next) => {
    try{
        Answer.create(req.params).then(function(answer) {
        res.send(answer);
    })
    }catch(err){
        res.json({status:'Failed',reason:err});
    };
};

const resetq = async (req,res)=>{
    const ID = req.params; 
    try{
        await Answer.deleteMany({qID:ID})
        res.json({status:'OK'});
    }catch(err){
        res.json({status:'Failed',reason:err});
    }
}

const get_questionnaire = (req,res) => {
    const ID = req.params;
    try{
        Questionnaire.find({questionnaireID:ID['questionnaireID']},{_id:0,questionnaireID:1,questionnaireTitle:1,keywords:1,"questions.qID":1,"questions.qtext":1,"questions.required":1,"questions.type":1}).then(function(ans){
            res.send(ans)
        })
    }catch(err){
        res.json({status:'Failed',reason:err});
    }
};
  
const get_options = (req,res) => {
    const query = req.params;
    const que1 = query['questionnaireID']
    const que2 = query['questionID']
    try{
        Questionnaire.aggregate([
            {
              '$unwind': {
                'path': '$questions'
              }
            }, {
              '$match': {
                '$and': [
                  {
                    'questionnaireID': que1, 
                    'questions.qID': que2
                  }
                ]
              }
            }, {
              '$project': {
                'questionnaireID': 1, 
                'qID': '$questions.qID', 
                'qtext': '$questions.qtext', 
                'required': '$questions.required', 
                'type': '$questions.type', 
                'options': '$questions.options'
              }
            }
          ]).then(function(ans){
            res.send(ans)
        })
    }catch(err){
        res.json({status:'Failed',reason:err});
    }
};

const get_session_answers = (req,res) => {
    const query = req.params;
    que1=query['questionnaireID']
    que2=query['session']
    //console.log(que1)
    //console.log(que2)
    try{
        Answers.aggregate([
            {
              '$match': {
                '$and': [
                  {
                    'questionnaireID': que1, 
                    'session': que2
                  }
                ]
              }
            }, {
              '$group': {
                '_id': {
                  'questionnaireID': '$questionnaireID', 
                  'session': '$session'
                }, 
                'answers': {
                  '$push': {
                    'questionID': '$questionID', 
                    'ans': '$optionID'
                  }
                }
              }
            }, {
              '$project': {
                '_id': 0, 
                'questionnaireID': '$_id.questionnaireID', 
                'session': '$_id.session', 
                'qID': '$questionID', 
                'answers': '$answers'
              }
            }
          ]).then(function(ans){
            res.send(ans)
        })}catch(err){
        res.json({status:'Failed',reason:err});
    }
};


const get_question_answers = (req,res) => {
    const query = req.params;
    que1=query['questionnaireID']
    que2=query['questionID']
    //console.log(que1)
    //console.log(que2)
    try{
        Answers.aggregate([
            {
              '$match': {
                '$and': [
                  {
                    'questionID': que2, 
                    'questionnaireID': que1
                  }
                ]
              }
            }, {
              '$group': {
                '_id': {
                  'questionnaireID': '$questionnaireID', 
                  'questionID': '$questionID'
                }, 
                'answers': {
                  '$push': {
                    'session': '$session', 
                    'ans': '$optionID'
                  }
                }
              }
            }, {
              '$project': {
                '_id': 0, 
                'questionnaireID': '$_id.questionnaireID', 
                'questionID': '$_id.questionID', 
                'answers': '$answers'
              }
            }
          ]).then(function(ans){
            res.send(ans)
        })}catch(err){
        res.json({status:'Failed',reason:err});
    }
}

module.exports={
    post_questionnaire,
    resetall,
    get_healthcheck,
    addAnswer,
    resetq,
    get_questionnaire,
    get_options,
    get_session_answers,
    get_question_answers
}