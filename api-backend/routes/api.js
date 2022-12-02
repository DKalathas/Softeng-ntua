const express = require('express');
const router =  express.Router();
const controllers = require('../controllers/controllers');


//------------------------------------------------Administrative---------------------------------------------
//perform healthcheck
router.get("/admin/healthcheck", controllers.get_healthcheck);
// add new questionnaire to db
router.post("/admin/questionnaire_upd", controllers.post_questionnaire);
// reset all
router.post("/admin/resetall",controllers.resetall);
//reset answers per question
router.post("/admin/resetq/:questionnaireID",controllers.resetq);

//------------------------------------------------Functional-------------------------------------------
//get questionnaire based on qID
//post answer
router.post('/doanswer/:questionnaireID/:questionID/:session/:optionID',controllers.addAnswer);
module.exports = router;