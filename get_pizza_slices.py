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
		data['Ryan'] = sdb.get_attributes(
			DomainName='pizza',
			ItemName='Ryan',
			AttributeNames=['Slices']
		)

		data['Sharon'] = sdb.get_attributes(
			DomainName='pizza',
			ItemName='Sharon',
			AttributeNames=['Slices']
		)
	except:
		return json.dumps({'Error': 'Data could not be retrieved.'})

	return data
