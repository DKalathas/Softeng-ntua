const Questionnaire = require("../models/questionnaire");
const Answer = require("../models/answers")
const mongoose = require('mongoose');
const Answers = require("../models/answers");
const { parse } = require('json2csv');
const fs = require('fs')
require('dotenv').config();


// add new questionnaire to db

const post_questionnaire = (req, res, next) => {
  const format = req.query.format;
  if (format !== 'json' && format !== 'csv' && format !== undefined) {
    res.status(400).send({ "status": "missing or invalid parameters" });
    return;
  }
  if (req.file !== undefined) {
    fs.readFile(req.file.path, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      //console.log(data);
      Questionnaire.create(JSON.parse(data)).then(function (questionnaire) {
        const format = req.query.format;
        if (format === undefined || format === 'json') {
          res.send(questionnaire);
          return;
        } else if (format === 'csv') {
          csv = parse(questionnaire);
          res.send(csv);
          return;
        }
      }).catch(err => {
        const format = req.query.format;
        if (format === undefined || format === 'json') {
          res.status(500).send(err);
          return;
        } else {
          csv = parse(err);
          res.status(500).send(csv);
          return;
        }
      })
    })
  }
  else {
    Questionnaire.create(req.body).then(function (questionnaire) {
      const format = req.query.format;
      if (format === undefined || format === 'json') {
        res.send(questionnaire);
        return;
      } else if (format === 'csv') {
        csv = parse(questionnaire);
        res.send(csv);
        return;
      }
    }).catch(err => {
      const format = req.query.format;
      if (format === undefined || format === 'json') {
        res.status(500).send(err);
        return;
      } else {
        csv = parse(err);
        res.status(500).send(csv);
        return;
      }
    })
  }
}

//perform healthcheck

const get_healthcheck = (req, res) => {
  const format = req.query.format;
  if (format !== 'json' && format !== 'csv' && format !== undefined) {
    res.status(400).send({ "status": "missing or invalid parameters" });
    return;
  }
  mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function (result) {
      if (result.length == 0) {
        res.status(402).send({ "status": "No data" });
        return;
      }
      const format = req.query.format;
      if (format === undefined || format === 'json') {
        res.send({ "status": "ok", "dbconnection": process.env.DATABASE_URI });
        return;
      } else if (format === 'csv') {
        csv = parse({ "status": "ok", "dbconnection": process.env.DATABASE_URI });
        res.send(csv);
        return;
      }
    })
    .catch(err => {
      const format = req.query.format;
      if (format === undefined || format === 'json') {
        res.status(500).send({ "status": "failed", "dbconnection": process.env.DATABASE_URI });
        return;
      } else {
        csv = parse({ "status": "failed", "dbconnection": process.env.DATABASE_URI });
        res.status(500).send(csv);
        return;
      }
    })
}


// reset all

const resetall = async (req, res) => {
  const format = req.query.format;
  if (format !== 'json' && format !== 'csv' && format !== undefined) {
    res.status(400).send({ "status": "missing or invalid parameters" });
    return;
  }
  try {
    await Questionnaire.deleteMany();
    await Answer.deleteMany();

    const format = req.query.format;
    if (format === undefined || format === 'json') {
      res.send({ status: 'OK' });
      return;
    } else {
      csv = parse({ status: 'OK' });
      res.send(csv);
      return;
    }
  } catch (err) {
    const format = req.query.format;
    if (format === undefined || format === 'json') {
      res.status(500).send({ status: 'Failed', reason: err });
      return;
    } else if (format === 'csv') {
      csv = parse({ status: 'Failed', reason: err });
      res.status(500).send(csv);
      return;
    }
  }
};


//post answer

const addAnswer = async (req, res, next) => {
  const format = req.query.format;
  if (req.params.optionID === ":optionID" || req.params.session === ":session" || req.params.questionID === ":questionID" || req.params.questionnaireID === ":questionnaireID") {
    res.status(400).send({ "status": "missing or invalid parameters" });
    return;
  }
  if (format !== 'json' && format !== 'csv' && format !== undefined) {
    res.status(400).send({ "status": "missing or invalid parameters" });
    return;
  }
  try {
    Answer.create(req.params).then(function (answer) {
      if (answer.length == 0) {
        res.status(402).send({ "status": "No data" });
        return;
      }
      const format = req.query.format;
      if (format === undefined || format === 'json') {
        res.send(answer);
        return;
      } else if (format === 'csv') {
        csv = parse(answer);
        res.send(csv);
        return;
      }
    })
  } catch (err) {
    const format = req.query.format;
    if (format === undefined || format === 'json') {
      res.status(500).send({ status: 'Failed', reason: err });
      return;
    } else {
      csv = parse({ status: 'Failed', reason: err });
      res.status(500).send(csv);
      return;
    }
  };
};


//reset answers per question

const resetq = async (req, res) => {
  const ID = req.params;
  const format = req.query.format;
  if (req.params.questionnaireID === ":questionnaireID") {
    res.status(400).send({ "status": "missing or invalid parameters" });
    return;
  }
  if (format !== 'json' && format !== 'csv' && format !== undefined) {
    res.status(400).send({ "status": "missing or invalid parameters" });
    return;
  }
  try {
    await Answer.deleteMany({ questionnaireID: ID.questionnaireID })
    const format = req.query.format;
    if (format === undefined || format === 'json') {
      res.send({ status: 'OK' });
      return;
    } else if (format === 'csv') {
      csv = parse({ status: 'OK' });
      res.send(csv);
      return;
    }
  } catch (err) {
    const format = req.query.format;
    if (format === undefined || format === 'json') {
      res.status(500).send({ status: 'Failed', reason: err });
      return;
    } else {
      csv = parse({ status: 'Failed', reason: err });
      res.status(500).send(csv);
      return;
    }
  }
}


//get questionnaire based on qID

const get_questionnaire = (req, res) => {
  const ID = req.params;
  const format = req.query.format;
  if (req.params.questionnaireID === ":questionnaireID") {
    res.status(400).send({ "status": "missing or invalid parameters" });
    return;
  }
  if (format !== 'json' && format !== 'csv' && format !== undefined) {
    res.status(400).send({ "status": "missing or invalid parameters" });
    return;
  }
  try {
    Questionnaire.find({ questionnaireID: ID['questionnaireID'] }, { _id: 0, questionnaireID: 1, questionnaireTitle: 1, keywords: 1, "questions.qID": 1, "questions.qtext": 1, "questions.required": 1, "questions.type": 1 }).then(function (ans) {

      if (ans.length == 0) {
        res.status(402).send({ "status": "No data" });
        return;
      }
      const format = req.query.format;
      if (format === undefined || format === 'json') {
        res.send(ans);
        return;
      } else if (format === 'csv') {
        csv = parse(ans);
        res.send(csv);
        return;
      }
    })
  } catch (err) {
    const format = req.query.format;
    if (format === undefined || format === 'json') {
      res.status(500).send({ status: 'Failed', reason: err });
      return;
    } else if (format === 'csv') {
      csv = parse({ status: 'Failed', reason: err });
      res.status(500).send(csv);
      return;
    }
  }
};


//get question of a questionnaire based on IDs

const get_options = (req, res) => {
  const query = req.params;
  const que1 = query['questionnaireID']
  const que2 = query['questionID']
  const format = req.query.format;
  if (req.params.questionnaireID === ":questionnaireID" || req.params.questionID === ":questionID") {
    res.status(400).send({ "status": "missing or invalid parameters" });
    return;
  }
  if (format !== 'json' && format !== 'csv' && format !== undefined) {
    res.status(400).send({ "status": "missing or invalid parameters" });
    return;
  }
  try {
    Questionnaire.aggregate([
      {
        '$unwind': {
          'path': '$questions'
        }
      }, {
        '$match': {
          '$and': [
            {
              'questionnaireID': que1,
              'questions.qID': que2
            }
          ]
        }
      }, {
        '$project': {
          'questionnaireID': 1,
          'qID': '$questions.qID',
          'qtext': '$questions.qtext',
          'required': '$questions.required',
          'type': '$questions.type',
          'options': '$questions.options'
        }
      }
    ]).then(function (ans) {
      if (ans.length == 0) {
        res.status(402).send({ "status": "No data" });
        return;
      }
      const format = req.query.format;
      if (format === undefined || format === 'json') {
        res.send(ans);
        return;
      } else if (format === 'csv') {
        csv = parse(ans);
        res.send(csv);
        return;
      }
    })
  } catch (err) {
    const format = req.query.format;
    if (format === undefined || format === 'json') {
      res.status(500).send({ status: 'Failed', reason: err });
      return;
    } else {
      csv = parse({ status: 'Failed', reason: err });
      res.status(500).send(csv);
      return;
    }
  }
};


//get answer on questionnaire id and on session

const get_session_answers = (req, res) => {
  const query = req.params;
  que1 = query['questionnaireID']
  que2 = query['session']
  //console.log(que1)
  //console.log(que2)
  const format = req.query.format;
  if (req.params.questionnaireID === ":questionnaireID" || req.params.session === ":session") {
    res.status(400).send({ "status": "missing or invalid parameters" });
    return;
  }
  if (format !== 'json' && format !== 'csv' && format !== undefined) {
    res.status(400).send({ "status": "missing or invalid parameters" });
    return;
  }
  try {
    Answers.aggregate([
      {
        '$match': {
          '$and': [
            {
              'questionnaireID': que1,
              'session': que2
            }
          ]
        }
      }, {
        '$group': {
          '_id': {
            'questionnaireID': '$questionnaireID',
            'session': '$session'
          },
          'answers': {
            '$push': {
              'questionID': '$questionID',
              'ans': '$optionID'
            }
          }
        }
      }, {
        '$project': {
          '_id': 0,
          'questionnaireID': '$_id.questionnaireID',
          'session': '$_id.session',
          'answers': '$answers'
        }
      }
    ]).then(function (ans) {
      if (ans.length == 0) {
        res.status(402).send({ "status": "No data" });
        return;
      }
      const format = req.query.format;
      if (format === undefined || format === 'json') {
        res.send(ans);
        return;
      } else if (format === 'csv') {
        csv = parse(ans);
        res.send(csv);
        return;
      }
    })
  } catch (err) {
    const format = req.query.format;
    if (format === undefined || format === 'json') {
      res.status(500).send({ status: 'Failed', reason: err });
      return;
    } else {
      csv = parse({ status: 'Failed', reason: err });
      res.status(500).send(csv);
      return;
    }
  }
};


//get question on questionnaire ID and on question ID

const get_question_answers = (req, res) => {
  const query = req.params;
  que1 = query['questionnaireID']
  que2 = query['questionID']
  //console.log(que1)
  //console.log(que2)
  const format = req.query.format;
  if (req.params.questionnaireID === ":questionnaireID" || req.params.questionID === ":questionID") {
    res.status(400).send({ "status": "missing or invalid parameters" });
    return;
  }
  if (format !== 'json' && format !== 'csv' && format !== undefined) {
    res.status(400).send({ "status": "missing or invalid parameters" });
    return;
  }
  try {
    Answers.aggregate([
      {
        '$match': {
          '$and': [
            {
              'questionID': que2,
              'questionnaireID': que1
            }
          ]
        }
      }, {
        '$group': {
          '_id': {
            'questionnaireID': '$questionnaireID',
            'questionID': '$questionID'
          },
          'answers': {
            '$push': {
              'session': '$session',
              'ans': '$optionID'
            }
          }
        }
      }, {
        '$project': {
          '_id': 0,
          'questionnaireID': '$_id.questionnaireID',
          'questionID': '$_id.questionID',
          'answers': '$answers'
        }
      }
    ]).then(function (ans) {
      if (ans.length == 0) {
        res.status(402).send({ "status": "No data" });
        return;
      }
      const format = req.query.format;
      if (format === undefined || format === 'json') {
        res.send(ans);
        return;
      } else if (format === 'csv') {
        csv = parse(ans);
        res.send(csv);
        return;
      }
    })
  } catch (err) {
    const format = req.query.format;
    if (format === undefined || format === 'json') {
      res.status(500).send({ status: 'Failed', reason: err });
      return;
    } else {
      csv = parse({ status: 'Failed', reason: err });
      res.status(500).send(csv);
      return;
    }
  }
}


//----------  extra endpoints------//

const get_all_questionnaire = (req, res) => {
  const format = req.query.format;
  if (req.params.length != undefined) {
    res.status(400).send({ "status": "missing or invalid parameters" });
    return;
  }
  if (format !== 'json' && format !== 'csv' && format !== undefined) {
    res.status(400).send({ "status": "missing or invalid parameters" });
    return;
  }
  try {
    Questionnaire.find().then(function (ans) {
      if (ans.length == 0) {
        res.status(402).send({ "status": "No data" });
        return;
      }
      const format = req.query.format;
      if (format === undefined || format === 'json') {
        res.send(ans);
        return;
      } else if (format === 'csv') {
        csv = parse(ans);
        res.send(csv);
        return;
      }
    })
  } catch (err) {
    const format = req.query.format;
    if (format === undefined || format === 'json') {
      res.status(500).send({ status: 'Failed', reason: err });
      return;
    } else if (format === 'csv') {
      csv = parse({ status: 'Failed', reason: err });
      res.status(500).send(csv);
      return;
    }
  }
};


const get_all_question = (req, res) => {
  const ID = req.params;
  const format = req.query.format;
  if (req.params.questionnaireID === ":questionnaireID") {
    res.status(400).send({ "status": "missing or invalid parameters" });
    return;
  }
  if (format !== 'json' && format !== 'csv' && format !== undefined) {
    res.status(400).send({ "status": "missing or invalid parameters" });
    return;
  }
  try {
    Questionnaire.find({ questionnaireID: ID['questionnaireID'] }).then(function (ans) {

      if (ans.length == 0) {
        res.status(402).send({ "status": "No data" });
        return;
      }
      const format = req.query.format;
      if (format === undefined || format === 'json') {
        res.send(ans);
        return;
      } else if (format === 'csv') {
        csv = parse(ans);
        res.send(csv);
        return;
      }
    })
  } catch (err) {
    const format = req.query.format;
    if (format === undefined || format === 'json') {
      res.status(500).send({ status: 'Failed', reason: err });
      return;
    } else if (format === 'csv') {
      csv = parse({ status: 'Failed', reason: err });
      res.status(500).send(csv);
      return;
    }
  }
};


const get_all_answers = (req, res) => {
  const ID = req.params;
  const format = req.query.format;
  if (req.params.questionnaireID === ":questionnaireID") {
    res.status(400).send({ "status": "missing or invalid parameters" });
    return;
  }
  if (format !== 'json' && format !== 'csv' && format !== undefined) {
    res.status(400).send({ "status": "missing or invalid parameters" });
    return;
  }
  try {
    Answer.find({ questionnaireID: ID['questionnaireID'] }).then(function (ans) {

      if (ans.length == 0) {
        res.status(402).send({ "status": "No data" });
        return;
      }
      const format = req.query.format;
      if (format === undefined || format === 'json') {
        res.send(ans);
        return;
      } else if (format === 'csv') {
        csv = parse(ans);
        res.send(csv);
        return;
      }
    })
  } catch (err) {
    const format = req.query.format;
    if (format === undefined || format === 'json') {
      res.status(500).send({ status: 'Failed', reason: err });
      return;
    } else if (format === 'csv') {
      csv = parse({ status: 'Failed', reason: err });
      res.status(500).send(csv);
      return;
    }
  }
};


module.exports = {
  post_questionnaire,
  resetall,
  get_healthcheck,
  addAnswer,
  resetq,
  get_questionnaire,
  get_options,
  get_session_answers,
  get_question_answers,
  get_all_questionnaire,
  get_all_question,
  get_all_answers
}