const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers');
var multer = require('multer')
var path = require('path');
var mkdirp = require('mkdirp');
var obj = {};
var diskStorage = multer.diskStorage({

    destination: function (req, file, cb) {

        var dest = path.join(__dirname, '../../data/questionnaires');

        mkdirp(dest, function (err) {
            if (err) cb(err, dest);
            else cb(null, dest);
        });
    },
    filename: function (req, file, cb) {
        var ext = path.extname(file.originalname);
        var file_name = Date.now() + ext;
        obj.file_name = file_name;
        cb(null, file_name);
    }
});
var upload = multer({ storage: diskStorage });



//------------------------------------------------Administrative---------------------------------------------
//perform healthcheck
router.get("/admin/healthcheck", controllers.get_healthcheck);

// add new questionnaire to db
router.post("/admin/questionnaire_upd", upload.single('file'), controllers.post_questionnaire);

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

//-------- extra-------//

router.get('/admin/getallquestionanswers', controllers.get_all_questionnaire);
router.get('/allquestionnaire/:questionnaireID', controllers.get_all_question);
router.get('/allanswers/:questionnaireID', controllers.get_all_answers);

module.exports = router;