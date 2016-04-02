import boto, json

sdb = boto3.client('sdb')

def lambda_handler():
	"""
	Handler for retrieving data from Simple DB.
	"""
	data = {}

	try:
		data['Ryan'] = sdb.get_attributes('pizza', 'Ryan', 'Slices')
		data['Sharon'] = sdb.get_attributes('pizza', 'Sharon', 'Slices')
	except:
		return json.dumps({'Error': 'Data could not be retrieved.'})

	return data
