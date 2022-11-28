const Questionnaire = require("../models/questionnaire");


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

module.exports={
    post_questionnaire
}