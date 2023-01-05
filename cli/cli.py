import click
import csv
import requests
import json

@click.group()
def cli():
    """\b
        -----------------------------------------------
        This is our CLI .
        \b
        For more information about each command, type:
            se2230 [COMMAND] --help
        ------------------------------------------------
    """
    pass

@click.command()
def healthcheck():

    res = requests.get('http://localhost:4000/intelliq_api/admin/healthcheck')
    click.echo(res.status_code)
    click.echo(res.json())
    
    
@click.command()
def resetall():


    res = requests.post('http://localhost:4000/intelliq_api/admin/resetall')
    click.echo(res.status_code)
    click.echo(res.json())
   
    
@click.command()
@click.option('--source', help = 'Upload a file', required = 'True', metavar = '<filename>')
#@click.option('--format', help = 'Choose format (json or csv)', required = 'True', metavar = '[csv/json]')
def questionnaire_upd(source):

    f = open(source)
    
    mydata = json.load(f)
    
    res = requests.post('http://localhost:4000/intelliq_api/admin/questionnaire_upd',
                json=mydata)
    click.echo(res.status_code)
    click.echo(res.json())
    f.close()

@click.command()
@click.option('--questionnaire_id', help = 'delete all answers from a questionnaire', required = 'True', metavar = '<questionnaire_id>')
def resetq(questionnaire_id):
    
    
    url='http://localhost:4000/intelliq_api/admin/resetq/'+questionnaire_id
    res = requests.post(url)
    click.echo(res.status_code)
    click.echo(res.json())


@click.command()
@click.option('--questionnaire_id', help = 'Find a questionnaire', required = 'True', metavar = '<questionnaire_id>')
def questionnaire(questionnaire_id):
    
    
    url='http://localhost:4000/intelliq_api/questionnaire/'+questionnaire_id
    res = requests.get(url)
    click.echo(res.status_code)
    click.echo(res.json())
    

@click.command()
@click.option('--questionnaire_id', help = 'Find a questionnaire', required = 'True', metavar = '<questionnaire_id>')
@click.option('--question_id', help = 'Find a question', required = 'True', metavar = '<question_id>')
def question(questionnaire_id,question_id):
    
    
    url='http://localhost:4000/intelliq_api/question/'+questionnaire_id+'/'+question_id
    res = requests.get(url)
    click.echo(res.status_code)
    click.echo(res.json())


@click.command()
@click.option('--questionnaire_id', help = 'Find a questionnaire', required = 'True', metavar = '<questionnaire_id>')
@click.option('--question_id', help = 'Find a question', required = 'True', metavar = '<question_id>')
@click.option('--session_id', help = 'Find a session', required = 'True', metavar = '<session_id>')
@click.option('--option_id', help = 'Find a option', required = 'True', metavar = '<option_id>')
def doanswer(questionnaire_id,question_id,session_id,option_id):
    
    
    url='http://localhost:4000/intelliq_api/doanswer/'+questionnaire_id+'/'+question_id+'/'+session_id+'/'+option_id
    res = requests.post(url)
    click.echo(res.status_code)
    click.echo(res.json())



@click.command()
@click.option('--questionnaire_id', help = 'Find a questionnaire', required = 'True', metavar = '<questionnaire_id>')
@click.option('--session_id', help = 'Find a session', required = 'True', metavar = '<session_id>')
def getsessionanswers(questionnaire_id,session_id):
    
    
    url='http://localhost:4000/intelliq_api/getsessionanswers/'+questionnaire_id+'/'+session_id
    res = requests.get(url)
    click.echo(res.status_code)
    click.echo(res.json())
    
    
@click.command()
@click.option('--questionnaire_id', help = 'Find a questionnaire', required = 'True', metavar = '<questionnaire_id>')
@click.option('--question_id', help = 'Find a question', required = 'True', metavar = '<question_id>')
def getquestionanswers(questionnaire_id,question_id):
    
    
    url='http://localhost:4000/intelliq_api/getquestionanswers/'+questionnaire_id+'/'+question_id
    res = requests.get(url)
    click.echo(res.status_code)
    click.echo(res.json())





cli.add_command(healthcheck)
cli.add_command(resetall)
cli.add_command(questionnaire_upd)
cli.add_command(resetq)
cli.add_command(questionnaire)
cli.add_command(question)
cli.add_command(doanswer)
cli.add_command(getsessionanswers)
cli.add_command(getquestionanswers)


if __name__ == "__main__":
    cli()