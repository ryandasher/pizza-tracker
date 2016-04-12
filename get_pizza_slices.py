import boto3, json

sdb = boto3.client('sdb')

def lambda_handler(event, context):
	"""
	Handler for retrieving data from Simple DB.

	Args:
	event -- Takes the empty request body (Dictionary).
	context -- AWS context for the request (Object).
	"""
	data = {}

	try:
		for person in ['Sharon', 'Ryan']:
			data[person] = sdb.get_attributes(
				DomainName='pizza',
				ItemName=person,
				AttributeNames=['Slices']
			)
	except:
		return json.dumps({'Error': 'Data could not be retrieved.'})

	return data
