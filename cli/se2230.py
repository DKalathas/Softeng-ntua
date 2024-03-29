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

##perform healthcheck

@click.command()
@click.option('--format', help = 'Choose format (json or csv)', required = 'True', metavar = '[csv/json]')
def healthcheck(format):

    url='http://localhost:4000/intelliq_api/admin/healthcheck'
    

    url=url+'?format='+str(format)
    res = requests.get(url)
    click.echo(res.status_code)
    if (format != "csv" and format !='json'):
        click.echo(res.content)
    if(format == 'json' ):
        click.echo(json.dumps(res.json()))
    elif(format == 'csv' ):
        click.echo(res.content)
    return True
    
    
## reset all
    
@click.command()
@click.option('--format', help = 'Choose format (json or csv)', required = 'True', metavar = '[csv/json]')
def resetall(format):

    url='http://localhost:4000/intelliq_api/admin/resetall'
    
    url=url+'?format='+str(format)
    res = requests.post(url)
    click.echo(res.status_code)
    if (format != "csv" and format !='json'):
        click.echo(res.content)
    if(format == 'json' ):
        click.echo(json.dumps(res.json()))
    elif(format == 'csv' ):
        click.echo(res.content)
    return True
   
    
 ##add new questionnaire to db   
    
@click.command()
@click.option('--source', help = 'Upload a file', required = 'True', metavar = '<filename>')
@click.option('--format', help = 'Choose format (json or csv)', required = 'True', metavar = '[csv/json]')
def questionnaire_upd(source,format):

    f = open(source)
    
    mydata = json.load(f)
    url='http://localhost:4000/intelliq_api/admin/questionnaire_upd'
    url=url+'?format='+str(format)

    res = requests.post(url,
                json=mydata)
    click.echo(res.status_code)
    if (format != "csv" and format !='json'):
        click.echo(res.content)
    if(format == 'json' ):
        click.echo(json.dumps(res.json()))
    elif(format == 'csv' ):
        click.echo(res.content)
    
    f.close()
    return True


##reset answers per question

@click.command()
@click.option('--questionnaire_id', help = 'delete all answers from a questionnaire', required = 'True', metavar = '<questionnaire_id>')
@click.option('--format', help = 'Choose format (json or csv)', required = 'True', metavar = '[csv/json]')
def resetq(questionnaire_id,format):
    
    
    url='http://localhost:4000/intelliq_api/admin/resetq/'+questionnaire_id
    url=url+'?format='+str(format)

    res = requests.post(url)
    click.echo(res.status_code)
    if (format != "csv" and format !='json'):
        click.echo(res.content)
    if(format == 'json' ):
        click.echo(json.dumps(res.json()))
    elif(format == 'csv' ):
        click.echo(res.content)
    return True


##get questionnaire based on qID

@click.command()
@click.option('--questionnaire_id', help = 'Find a questionnaire', required = 'True', metavar = '<questionnaire_id>')
@click.option('--format', help = 'Choose format (json or csv)', required = 'True', metavar = '[csv/json]')
def questionnaire(questionnaire_id,format):
    
    
    url='http://localhost:4000/intelliq_api/questionnaire/'+questionnaire_id
    url=url+'?format='+str(format)

    res = requests.get(url)
    click.echo(res.status_code)
    if (format != "csv" and format !='json'):
        click.echo(res.content)
    if(format == 'json' ):
        click.echo(json.dumps(res.json()))
    elif(format == 'csv' ):
        click.echo(res.content)
    return True
    

##get question of a questionnaire based on IDs

@click.command()
@click.option('--questionnaire_id', help = 'Find a questionnaire', required = 'True', metavar = '<questionnaire_id>')
@click.option('--question_id', help = 'Find a question', required = 'True', metavar = '<question_id>')
@click.option('--format', help = 'Choose format (json or csv)', required = 'True', metavar = '[csv/json]')
def question(questionnaire_id,question_id,format):
    
    
    url='http://localhost:4000/intelliq_api/question/'+questionnaire_id+'/'+question_id
    url=url+'?format='+str(format)

    res = requests.get(url)
    click.echo(res.status_code)
    if (format != "csv" and format !='json'):
        click.echo(res.content)
    if(format == 'json' ):
        click.echo(json.dumps(res.json()))
    elif(format == 'csv'):
        click.echo(res.content)
    return True



##post answer

@click.command()
@click.option('--questionnaire_id', help = 'Find a questionnaire', required = 'True', metavar = '<questionnaire_id>')
@click.option('--question_id', help = 'Find a question', required = 'True', metavar = '<question_id>')
@click.option('--session_id', help = 'Find a session', required = 'True', metavar = '<session_id>')
@click.option('--option_id', help = 'Find a option', required = 'True', metavar = '<option_id>')
@click.option('--format', help = 'Choose format (json or csv)', required = 'True', metavar = '[csv/json]')
def doanswer(questionnaire_id,question_id,session_id,option_id,format):
    
    
    url='http://localhost:4000/intelliq_api/doanswer/'+questionnaire_id+'/'+question_id+'/'+session_id+'/'+option_id
    url=url+'?format='+str(format)

    res = requests.post(url)
    click.echo(res.status_code)
    if (format != "csv" and format !='json'):
        click.echo(res.content)
    if(format == 'json' ):
        click.echo(json.dumps(res.json()))
    elif(format == 'csv' ):
        click.echo(res.content)
    return True


##get answer on questionnaire id and on session

@click.command()
@click.option('--questionnaire_id', help = 'Find a questionnaire', required = 'True', metavar = '<questionnaire_id>')
@click.option('--session_id', help = 'Find a session', required = 'True', metavar = '<session_id>')
@click.option('--format', help = 'Choose format (json or csv)', required = 'True', metavar = '[csv/json]')
def getsessionanswers(questionnaire_id,session_id,format):
    
    
    url='http://localhost:4000/intelliq_api/getsessionanswers/'+questionnaire_id+'/'+session_id
    url=url+'?format='+str(format)

    res = requests.get(url)
    click.echo(res.status_code)
    if (format != "csv" and format !='json'):
        click.echo(res.content)
    if(format == 'json' ):
        click.echo(json.dumps(res.json()))
    elif(format == 'csv' ):
        click.echo(res.content)
    return True
    
    
##get question on questionnaire ID and on question ID    
    
@click.command()
@click.option('--questionnaire_id', help = 'Find a questionnaire', required = 'True', metavar = '<questionnaire_id>')
@click.option('--question_id', help = 'Find a question', required = 'True', metavar = '<question_id>')
@click.option('--format', help = 'Choose format (json or csv)', required = 'True', metavar = '[csv/json]')
def getquestionanswers(questionnaire_id,question_id,format):
    
    
    url='http://localhost:4000/intelliq_api/getquestionanswers/'+questionnaire_id+'/'+question_id
    url=url+'?format='+str(format)

    res = requests.get(url)
    click.echo(res.status_code)
    if (format != "csv" and format !='json'):
        click.echo(res.content)
    if(format == 'json' ):
        click.echo(json.dumps(res.json()))
    elif(format == 'csv' ):
        click.echo(res.content)
    return True

#---extra---#

@click.command()
@click.option('--format', help = 'Choose format (json or csv)', required = 'True', metavar = '[csv/json]')
def getallquestionanswers(format):
    
    
    url='http://localhost:4000/intelliq_api/admin/getallquestionanswers/'
    url=url+'?format='+str(format)

    res = requests.get(url)
    click.echo(res.status_code)
    if (format != "csv" and format !='json'):
        click.echo(res.content)
    if(format == 'json'):
        click.echo(json.dumps(res.json()))
    elif(format == 'csv' ):
        click.echo(res.content)
    return True

@click.command()
@click.option('--questionnaire_id', help = 'Find a questionnaire', required = 'True', metavar = '<questionnaire_id>')
@click.option('--format', help = 'Choose format (json or csv)', required = 'True', metavar = '[csv/json]')
def getallquestions(questionnaire_id,format):
    
    
    url='http://localhost:4000/intelliq_api/allquestionnaire/'+questionnaire_id
    url=url+'?format='+str(format)

    res = requests.get(url)
    click.echo(res.status_code)
    if (format != "csv" and format !='json'):
        click.echo(res.content)
    if(format == 'json' ):
        click.echo(json.dumps(res.json()))
    elif(format == 'csv' ):
        click.echo(res.content)
    return True


@click.command()
@click.option('--questionnaire_id', help = 'Find a questionnaire', required = 'True', metavar = '<questionnaire_id>')
@click.option('--format', help = 'Choose format (json or csv)', required = 'True', metavar = '[csv/json]')
def getallanswers(questionnaire_id,format):
    
    
    url='http://localhost:4000/intelliq_api/allanswers/'+questionnaire_id
    url=url+'?format='+str(format)

    res = requests.get(url)
    click.echo(res.status_code)
    if (format != "csv" and format !='json'):
        click.echo(res.content)
    if(format == 'json' ):
        click.echo(json.dumps(res.json()))
    elif(format == 'csv' ):
        click.echo(res.content)
    return True



cli.add_command(healthcheck)
cli.add_command(resetall)
cli.add_command(questionnaire_upd)
cli.add_command(resetq)
cli.add_command(questionnaire)
cli.add_command(question)
cli.add_command(doanswer)
cli.add_command(getsessionanswers)
cli.add_command(getquestionanswers)
cli.add_command(getallquestionanswers)
cli.add_command(getallquestions)
cli.add_command(getallanswers)


if __name__ == "__main__":
    cli()