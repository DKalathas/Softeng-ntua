import requests
import argparse

#admin endpoints functions

#healthcheck-endpoint
def healthcheck():
    response = requests.get("http://localhost:4000/intelliq_api/admin/healthcheck")
    return print(response.json())

#resetall-endpoint
def resetall():
    response1 = requests.post('http://localhost:4000/intelliq_api/admin/resetall')
    return print(response1.json())

#define parser
parser = argparse.ArgumentParser(
    prog='CLI-App',
    description='CLI app for intelliq project',
    epilog='bye',
    argument_default=None,
    add_help=True)


#healthcheck argument
parser.add_argument("-healthcheck",action='store_true',help='check connectivity')
#resetall argument
parser.add_argument("-resetall",action='store_true',help='check connectivity')


#add arguments
args = parser.parse_args()



if args.healthcheck :
    healthcheck()
if args.resetall :
    resetall()

#.