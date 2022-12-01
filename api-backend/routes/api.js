const express = require('express');
const router =  express.Router();
const Questionnaire = require('../models/questionnaire');
const controllers = require('../controllers/controllers');


//------------------------------------------------Administrative---------------------------------------------
//perform healthcheck
router.get("/admin/healthcheck", controllers.get_healthcheck);
// add new questionnaire to db
router.post("/admin/questionnaire_upd", controllers.post_questionnaire);
// reset all
router.post("/admin/resetall",controllers.resetall);



//------------------------------------------------Functional-------------------------------------------
//get questionnaire based on qID
//post answer
router.post('/doanswer/:questionnaireID/:questionID/:session/:optionID',controllers.addAnswer);
module.exports = router;