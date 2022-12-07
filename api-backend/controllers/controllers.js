const Questionnaire = require("../models/questionnaire");
const Answer = require("../models/answers")
const mongoose = require('mongoose');
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
        Questionnaire.find({questionnaireID:ID['questionnaireID']},{questionnaireID:1,questionnaireTitle:1,keywords:1,questions:{qID:1,qtext:1,required:1,type:1},_id:0}).then(function(ans){
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
        Questionnaire.find({questionnaireID:que1},{questions:{$elemMatch:{qID:que2}}},{questionnaireID:1,questions:{qID:1,qtext:1,required:1,type:1,options:1},_id:0}).then(function(ans){
            res.send(ans)
        })
    }catch(err){
        res.json({status:'Failed',reason:err});
    }
};

module.exports={
    post_questionnaire,
    resetall,
    get_healthcheck,
    addAnswer,
    resetq,
    get_questionnaire,
    get_options

}