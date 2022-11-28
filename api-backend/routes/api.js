const express = require('express');
const router =  express.Router();
const Questionnaire = require('../models/questionnaire');
const controllers = require('../controllers/controllers');


//healthcheck
router.get("/admin/healthcheck", controllers.get_healthcheck);

// add new questionnaire to db
router.post("/admin/questionnaire_upd", controllers.post_questionnaire);

module.exports = router;