import sys
import json
sys.path.insert(0,'./cli')
from cli.se2230 import cli
from click.testing import CliRunner

#test connectivity with the db using the cli app
def test_healtcheck():
	runner = CliRunner()
	result = runner.invoke(cli,["healthcheck","--format","json"])
	status_code, output = result.output.split('\n')[:2]
	output = json.loads(output)
	assert int(status_code) == 200
	assert result.exit_code == 0
	assert output['status'] == 'ok'

#test if we can upload a new questionnaire
def test_upd1():
	runner = CliRunner()
	with runner.isolated_filesystem():
		with open("file.txt", "w") as f:
			f.write(json.dumps(que1))
		result = runner.invoke(cli, ["questionnaire-upd", "--source", "file.txt","--format","json"])
		status_code, output = result.output.split('\n')[:2]
	assert int(status_code) == 200
	assert result.exit_code == 0

#test if we can post two answers
def test_doanswer():
  runner = CliRunner()
  result = runner.invoke(cli,["doanswer","--questionnaire_id","QQ001","--question_id","Q01","--session_id","0001","--option_id","Q01A1","--format","json"])
  status_code, output = result.output.split('\n')[:2]
  output = json.loads(output)
  result1 = runner.invoke(cli,["doanswer","--questionnaire_id","QQ000","--question_id","Q01","--session_id","0002","--option_id","Q01A1","--format","json"])
  status_code1, output1 = result.output.split('\n')[:2]
  output1 = json.loads(output1)
  assert int(status_code) == 200
  assert result.exit_code == 0
  assert output["questionnaireID"] == ans["questionnaireID"]
  assert output["questionID"] == ans["questionID"]
  assert output["session"] == ans["session"]
  assert output["optionID"] == ans["optionID"]
  assert int(status_code1) == 200
  assert result1.exit_code == 0
  assert output1["questionnaireID"] == ans["questionnaireID"]
  assert output1["questionID"] == ans["questionID"]
  assert output1["session"] == ans["session"]
  assert output1["optionID"] == ans["optionID"]

#test questionnaire endpoint using questionnaire QQ000
def test_questionnaire():
	runner = CliRunner()
	result = runner.invoke(cli,["questionnaire","--questionnaire_id","QQ001","--format","json"])
	status_code, output = result.output.split('\n')[:2]
	output = json.loads(output)
	assert int(status_code) == 200
	assert result.exit_code == 0
	assert output[0]['questionnaireID'] == 'QQ001'
	assert output[0]['questions'][0]['qID'] == 'Q01'
	assert output[0]['questions'][1]['qID'] == 'Q02'
	assert output[0]['questions'][2]['qID'] == 'P01'
	assert output[0]['questions'][3]['qID'] == 'P02'
	assert output[0]['questions'][4]['qID'] == 'P03'
	assert output[0]['questions'][5]['qID'] == 'P04'
	assert output[0]['questions'][6]['qID'] == 'O01'
	assert output[0]['questions'][7]['qID'] == 'O02'
	assert output[0]['questions'][8]['qID'] == 'O03'
	assert output[0]['questions'][9]['qID'] == 'O04'
	assert output[0]['questions'][10]['qID'] == 'A01'
	assert output[0]['questions'][11]['qID'] == 'Α02'
	assert output[0]['questions'][12]['qID'] == 'Α03'
	assert output[0]['questions'][13]['qID'] == 'A04'
	assert output[0]['questions'][14]['qID'] == 'K01'
	assert output[0]['questions'][15]['qID'] == 'K02'
	assert output[0]['questions'][16]['qID'] == 'K03'
	assert output[0]['questions'][17]['qID'] == 'Q03'
	assert output[0]['questions'][18]['qID'] == 'Q04'
	assert output[0]['questions'][19]['qID'] == 'Q05'

#test question endpoint using questionnaireID QQ001 and qID  

#test resetq
def test_resetq():
	runner = CliRunner()
	result = runner.invoke(cli,["resetq","--questionnaire_id","QQ000","--format","json"])
	status_code, output = result.output.split('\n')[:2]
	output = json.loads(output)
	assert int(status_code) == 200
	assert result.exit_code == 0
	assert output['status'] == 'OK'

#test 402 code and outcome of resetq using addanswers
def test_402():
	runner = CliRunner()
	result = runner.invoke(cli,["getallanswers","--questionnaire_id","QQ000","--format","json"])
	status_code, output = result.output.split('\n')[:2]
	output = json.loads(output)
	assert int(status_code) == 402
	assert result.exit_code == 0
	assert output['status'] == "No data"

#test the reset all using the cli app
def test_resetall():
	runner = CliRunner()
	result = runner.invoke(cli,["resetall","--format","json"])
	status_code, output = result.output.split('\n')[:2]
	output = json.loads(output)
	assert int(status_code) == 200
	assert result.exit_code == 0
	assert output['status'] == 'OK'




ans = {
    "questionnaireID": "QQ001",
    "questionID": "Q01",
    "session": "0001",
    "optionID": "Q01A1",
}

que1 = {
  "questionnaireID": "QQ001",
  "questionnaireTitle": "My first research questionnaire",
  "keywords": ["football"],
  "questions": [
    {
      "qID": "Q01",
      "qtext": "Ποια είναι η ηλικία σας;",
      "required": "TRUE",
      "type": "profile",
      "options": [
        {
          "optID": "Q01A1",
          "opttxt": "<30",
          "nextqID": "Q02"
        },
        {
          "optID": "Q01A2",
          "opttxt": "30-50",
          "nextqID": "Q02"
        },
        {
          "optID": "Q01A3",
          "opttxt": "50-70",
          "nextqID": "Q02"
        },
        {
          "optID": "Q01A4",
          "opttxt": ">70",
          "nextqID": "Q02"
        }
      ]
    },
    {
      "qID": "Q02",
      "qtext": "Τι ομάδα είστε;",
      "required": "TRUE",
      "type": "profile",
      "options": [
        {
          "optID": "Q02A1",
          "opttxt": "Παναθηναϊκός",
          "nextqID": "P01"
        },
        {
          "optID": "Q02A2",
          "opttxt": "Ολυμπιακός",
          "nextqID": "O01"
        },
        {
          "optID": "Q02A3",
          "opttxt": "ΑΕΚ",
          "nextqID": "A01"
        },
        {
          "optID": "Q02A4",
          "opttxt": "ΠΑΟΚ",
          "nextqID": "K01"
        }
      ]
    },
    {
      "qID": "P01",
      "qtext": "Έχετε ζήσει πρωτάθλημα με τον Παναθηναϊκό?",
      "required": "TRUE",
      "type": "question",
      "options": [
        {
          "optID": "P01A1",
          "opttxt": "Ναι",
          "nextqID": "P02"
        },

        {
          "optID": "P01A2",
          "opttxt": "Οχι",
          "nextqID": "Q03"
        }
      ]
    },

    {
      "qID": "P02",
      "qtext": "Ποια χρονία ήταν?",
      "required": "TRUE",
      "type": "question",
      "options": [
        {
          "optID": "P02A1",
          "opttxt": "2009-2010",
          "nextqID": "P03"
        },

        {
          "optID": "P02A2",
          "opttxt": "2003-2004",
          "nextqID": "P04"
        }
      ]
    },
    {
      "qID": "P03",
      "qtext": "Ποιος ήταν ο αγαπημένος παίχτης σας?",
      "required": "TRUE",
      "type": "question",
      "options": [
        {
          "optID": "P03A1",
          "opttxt": "Σισε",
          "nextqID": "Q03"
        },

        {
          "optID": "P03A2",
          "opttxt": "Καραγκουνης",
          "nextqID": "Q03"
        },
        {
          "optID": "P03A3",
          "opttxt": "Νινης",
          "nextqID": "Q03"
        }
      ]
    },
    {
      "qID": "P04",
      "qtext": "Ποιος ήταν ο αγαπημένος παίχτης σας?",
      "required": "TRUE",
      "type": "question",
      "options": [
        {
          "optID": "P04A1",
          "opttxt": "Παπαδόπουλος",
          "nextqID": "Q03"
        },

        {
          "optID": "P04A2",
          "opttxt": "Έμπαλε",
          "nextqID": "Q03"
        },
        {
          "optID": "P04A3",
          "opttxt": "Γκονζάλες",
          "nextqID": "Q03"
        }
      ]
    },
    {
      "qID": "O01",
      "qtext": "Έχετε ζήσει πρωτάθλημα (δίκαιο) με τον Ολυμπιακό?",
      "required": "TRUE",
      "type": "question",
      "options": [
        {
          "optID": "O01A1",
          "opttxt": "Ναι",
          "nextqID": "O02"
        },

        {
          "optID": "O01A2",
          "opttxt": "Οχι",
          "nextqID": "Q03"
        }
      ]
    },

    {
      "qID": "O02",
      "qtext": "Ποια χρονία ήταν?",
      "required": "TRUE",
      "type": "question",
      "options": [
        {
          "optID": "O02A1",
          "opttxt": "2021-2022",
          "nextqID": "O03"
        },

        {
          "optID": "O02A2",
          "opttxt": "2008-2009",
          "nextqID": "O04"
        }
      ]
    },
    {
      "qID": "O03",
      "qtext": "Ποιος ήταν ο αγαπημένος παίχτης σας?",
      "required": "TRUE",
      "type": "question",
      "options": [
        {
          "optID": "O03A1",
          "opttxt": "Παπασταθόπουλος",
          "nextqID": "Q03"
        },

        {
          "optID": "O03A2",
          "opttxt": "Ελ Αραμπί",
          "nextqID": "Q03"
        },
        {
          "optID": "O03A3",
          "opttxt": "Μασούρας",
          "nextqID": "Q03"
        }
      ]
    },
    {
      "qID": "O04",
      "qtext": "Ποιος ήταν ο αγαπημένος παίχτης σας?",
      "required": "TRUE",
      "type": "question",
      "options": [
        {
          "optID": "O04A1",
          "opttxt": "Ντιογκο",
          "nextqID": "Q03"
        },

        {
          "optID": "O04A2",
          "opttxt": "Τζορτζεβιτς",
          "nextqID": "Q03"
        },
        {
          "optID": "O04A3",
          "opttxt": "Αβρααμ",
          "nextqID": "Q03"
        }
      ]
    },
    {
      "qID": "A01",
      "qtext": "Έχετε ζήσει πρωτάθλημα με την ΑΕΚ (νέο ΑΦΜ)?",
      "required": "TRUE",
      "type": "question",
      "options": [
        {
          "optID": "Α01A1",
          "opttxt": "Ναι",
          "nextqID": "Α02"
        },

        {
          "optID": "Α01A2",
          "opttxt": "Οχι",
          "nextqID": "Q03"
        }
      ]
    },

    {
      "qID": "Α02",
      "qtext": "Ποια χρονία ήταν?",
      "required": "TRUE",
      "type": "question",
      "options": [
        {
          "optID": "Α02A1",
          "opttxt": "2017-2018",
          "nextqID": "Α03"
        },

        {
          "optID": "Α02A2",
          "opttxt": "Αλλη",
          "nextqID": "Α04"
        }
      ]
    },
    {
      "qID": "Α03",
      "qtext": "Ποιος ήταν ο αγαπημένος παίχτης σας?",
      "required": "TRUE",
      "type": "question",
      "options": [
        {
          "optID": "Α03A1",
          "opttxt": "Σιμοες",
          "nextqID": "A04"
        },

        {
          "optID": "A03A2",
          "opttxt": "Χριστοδουλόπουλος",
          "nextqID": "A04"
        },
        {
          "optID": "A03A3",
          "opttxt": "Κονε",
          "nextqID": "A04"
        }
      ]
    },
    {
      "qID": "A04",
      "qtext": "Μετράνε τα 2 εκατοστά στο δοκάρι?",
      "required": "TRUE",
      "type": "question",
      "options": [
        {
          "optID": "A04A1",
          "opttxt": "Ναι",
          "nextqID": "Q03"
        },

        {
          "optID": "A04A2",
          "opttxt": "Οχι",
          "nextqID": "Q03"
        }
      ]
    },
    {
      "qID": "K01",
      "qtext": "Έχετε ζήσει πρωτάθλημα με τον ΠΑΟΚ?",
      "required": "TRUE",
      "type": "question",
      "options": [
        {
          "optID": "K01A1",
          "opttxt": "Ναι",
          "nextqID": "K02"
        },

        {
          "optID": "K01A2",
          "opttxt": "Οχι",
          "nextqID": "Q03"
        }
      ]
    },

    {
      "qID": "K02",
      "qtext": "Πόσα θα έπρεπε να είχατε ακόμα σύμφωνα με τον Λουτσεσκου?",
      "required": "TRUE",
      "type": "question",
      "options": [
        {
          "optID": "K02A1",
          "opttxt": "2",
          "nextqID": "K03"
        },

        {
          "optID": "K02A2",
          "opttxt": "Ολα",
          "nextqID": "K03"
        }
      ]
    },
    {
      "qID": "K03",
      "qtext": "Ποιος ήταν ο αγαπημένος σας διαιτητής ?",
      "required": "TRUE",
      "type": "question",
      "options": [
        {
          "optID": "K03A1",
          "opttxt": "Λαοθ",
          "nextqID": "Q03"
        },

        {
          "optID": "K03A2",
          "opttxt": "Κακος",
          "nextqID": "Q03"
        },
        {
          "optID": "K03A3",
          "opttxt": "Σπάθας",
          "nextqID": "Q03"
        }
      ]
    },
    {
      "qID": "Q03",
      "qtext": "Που κρίνονται τα πρωταθλήματα?",
      "required": "TRUE",
      "type": "profile",
      "options": [
        {
          "optID": "Q03A1",
          "opttxt": "Γηπεδα",
          "nextqID": "Q04"
        },
        {
          "optID": "Q03A2",
          "opttxt": "Δικαστήρια",
          "nextqID": "Q04"
        },
        {
          "optID": "Q03A3",
          "opttxt": "Στα εκατοστά του δοκαριού",
          "nextqID": "Q04"
        },
        {
          "optID": "Q03A4",
          "opttxt": "Στην φαντασία του Λουτσεσκου",
          "nextqID": "Q04"
        }
      ]
    },
    {
      "qID": "Q04",
      "qtext": "Μπορεί να βελτιωθεί το πρωταθλήματα?",
      "required": "TRUE",
      "type": "profile",
      "options": [
        {
          "optID": "Q04A1",
          "opttxt": "Ναι",
          "nextqID": "Q05"
        },
        {
          "optID": "Q04A2",
          "opttxt": "Οχι",
          "nextqID": "Q05"
        }
      ]
    },
    {
      "qID": "Q05",
      "qtext": "Μπορεί η χώρα μας να φιλοξενήσει Μουντιάλ?",
      "required": "TRUE",
      "type": "profile",
      "options": [
        {
          "optID": "Q05A1",
          "opttxt": "Ναι",
          "nextqID": "-"
        },
        {
          "optID": "Q05A2",
          "opttxt": "Οχι",
          "nextqID": "-"
        }
      ]
    }
  ]
}