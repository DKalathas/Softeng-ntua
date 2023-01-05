const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers');



//------------------------------------------------Administrative---------------------------------------------
//perform healthcheck
router.get("/admin/healthcheck", controllers.get_healthcheck);

// add new questionnaire to db
router.post("/admin/questionnaire_upd", controllers.post_questionnaire);

// reset all
router.post("/admin/resetall", controllers.resetall);

//reset answers per question
router.post("/admin/resetq/:questionnaireID", controllers.resetq);

//------------------------------------------------Functional-------------------------------------------
//get questionnaire based on qID
router.get('/questionnaire/:questionnaireID', controllers.get_questionnaire);
//post answer
router.post('/doanswer/:questionnaireID/:questionID/:session/:optionID', controllers.addAnswer);
//get question of a questionnaire based on IDs
router.get('/question/:questionnaireID/:questionID', controllers.get_options);
//get answer on questionnaire id and on session
router.get('/getsessionanswers/:questionnaireID/:session', controllers.get_session_answers);
//get question on questionnaire ID and on question ID
router.get('/getquestionanswers/:questionnaireID/:questionID', controllers.get_question_answers);

//--------one extra-------//

router.get('/admin/getallquestionanswers', controllers.get_all_questionnaire);

module.exports = router;