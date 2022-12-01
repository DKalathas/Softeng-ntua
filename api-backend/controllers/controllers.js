const Questionnaire = require("../models/questionnaire");


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
module.exports={
    post_questionnaire,
    resetall
}