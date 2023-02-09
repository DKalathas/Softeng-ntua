import sys
import json
sys.path.insert(0,'./cli')
from cli.se2230 import cli
from click.testing import CliRunner

def test_healtcheck():
	runner = CliRunner()
	result = runner.invoke(cli,["healthcheck","--format","json"])
	status_code, output = result.output.split('\n')[:2]
	output = json.loads(output)
	assert int(status_code) == 200
	assert result.exit_code == 0
	assert output['status'] == 'ok'

