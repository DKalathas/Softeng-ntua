from subprocess import PIPE, Popen
import os
from dotenv import load_dotenv
from pathlib import Path


## Επιβεβαίωση της λειτουργίας (healthcheck) ##
input('press enter for healthcheck..')
print()

command = "python3 se2230.py healthcheck --format json"

process = Popen(command, shell=True, stdout=PIPE, stderr=PIPE)
producedOutput, err = process.communicate()
raw_out = producedOutput.decode("utf-8")

print(raw_out)
print()

 

### Εμφάνιση του ερωτηματολογίου που περιέχει η βάση ###

input('press enter for Εμφάνιση του ερωτηματολογίου που περιέχει η βάση ..')
print()

command = "python3 se2230.py questionnaire --questionnaire_id QQ000 --format json"

process = Popen(command, shell=True, stdout=PIPE, stderr=PIPE)
producedOutput, err = process.communicate()
raw_out = producedOutput.decode("utf-8")

print(raw_out.encode().decode('unicode-escape'))
print()


###  Απάντηση των ερωτήσεων του ερωτηματολογίου ###

input('press enter for Απάντηση των ερωτήσεων του ερωτηματολογίου ..')
print()

command = "python3 se2230.py doanswer --questionnaire_id QQ000 --question_id Q01 --session_id 1 --option_id Q01A1 --format json"

process = Popen(command, shell=True, stdout=PIPE, stderr=PIPE)
producedOutput, err = process.communicate()
raw_out = producedOutput.decode("utf-8")

print(raw_out)
print()


### Εμφάνιση όλων των απαντήσεων που δόθηκαν σε μία ερώτηση (της επιλογής σας) σε όλα τα session απαντήσεων ###

input('press enter for Εμφάνιση όλων των απαντήσεων που δόθηκαν σε μία ερώτηση ..')
print()

command = "python3 se2230.py getquestionanswers --questionnaire_id QQ000 --question_id Q01 --format json"

process = Popen(command, shell=True, stdout=PIPE, stderr=PIPE)
producedOutput, err = process.communicate()
raw_out = producedOutput.decode("utf-8")

print(raw_out)
print()


## Αρχικοποίηση (resetall) ##
input('press enter for resetall ..')
print()

command = "python3 se2230.py resetall --format json"

process = Popen(command, shell=True, stdout=PIPE, stderr=PIPE)
producedOutput, err = process.communicate()
raw_out = producedOutput.decode("utf-8")

print(raw_out)
print()





### Ανέβασμα ερωτηματολογίου (questionnaire_upd) ##
input('press enter for Ανέβασμα ερωτηματολογίου ..')
print()

dotenv_path = Path('/Users/tassos/Desktop/22-23/SoftEng22-30/cli/.env')
load_dotenv(dotenv_path=dotenv_path)

path = '/Users/tassos/Desktop/22-23/SoftEng22-30/data/questionnaires/final.json'
#print(path)

command = "python3 se2230.py questionnaire-upd --source "+path+ " --format json"

process = Popen(command, shell=True, stdout=PIPE, stderr=PIPE)
producedOutput, err = process.communicate()
raw_out = producedOutput.decode("utf-8")
print(raw_out.encode().decode('unicode-escape'))
print()



### Εμφάνιση του ερωτηματολογίου που περιέχει η βάση ###
input('press enter for Εμφάνιση του ερωτηματολογίου που περιέχει η βάση ..')
print()


command = "python3 se2230.py questionnaire --questionnaire_id QQ000 --format json"

process = Popen(command, shell=True, stdout=PIPE, stderr=PIPE)
producedOutput, err = process.communicate()
raw_out = producedOutput.decode("utf-8")

print(raw_out.encode().decode('unicode-escape'))
print()

input('This is the end...')