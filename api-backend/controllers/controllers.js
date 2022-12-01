const Questionnaire = require("../models/questionnaire");
const Answer = require("../models/answers")
const mongoose = require('mongoose');

const post_questionnaire = (req, res, next) => {
    Questionnaire.create(req.body).then(function(questionnaire) {
        res.send(questionnaire);
    }).catch(next);
}

const resetall = (req,res,next)=>{
    Questionnaire.remove({},function (err, result) {
        if (err){
            res.json({status:'failed',reason:err})
        }else{
            res.json({status:'OK'})
        }
    });
}

const get_healthcheck =(req,res)=>{
    mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result=>res.send({"status":"ok","dbconnection":process.env.DATABASE_URI}))
    .catch(err=>{
        res.send({"status":"failed", "dbconnection":process.env.DATABASE_URI})})
        }

const addAnswer = async (req, res, next) => {
    Answer.create(req.body).then(function(answer) {
        res.send(answer);
    }).catch(next);
  };
  

module.exports={
    post_questionnaire,
    resetall,
    get_healthcheck,
    addAnswer
}