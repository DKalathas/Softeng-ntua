const Questionnaire = require("../models/questionnaire");
const Answer = require("../models/answers")
const mongoose = require('mongoose');

const post_questionnaire = (req, res, next) => {
    Questionnaire.create(req.body).then(function(questionnaire) {
        res.send(questionnaire);
    }).catch(next);
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

const get_healthcheck =(req,res)=>{
    mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result=>res.send({"status":"ok","dbconnection":process.env.DATABASE_URI}))
    .catch(err=>{
        res.send({"status":"failed", "dbconnection":process.env.DATABASE_URI})})
        }

const resetq = async (req,res)=>{
    const ID = req.params; 
    try{
        await Answer.deleteMany({qID:ID})
        res.json({status:'OK'});
    }catch(err){
        res.json({status:'Failed',reason:err});
    }
}

const addAnswer = async (req, res, next) => {
    Answer.create(req.params).then(function(answer) {
        res.send(answer);
    }).catch(next);
      };


  

module.exports={
    post_questionnaire,
    resetall,
    get_healthcheck,
    addAnswer,
    resetq
}