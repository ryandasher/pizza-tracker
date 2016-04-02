import boto3, json

sdb = boto3.client('sdb')

def lambda_handler(data, context):
	"""
	Handler for posting data to SimpleDB.

	Args:
	data -- Data to be stored (Dictionary).
	context -- AWS context for the request (Object).
	"""

	item_name = data['Name']

	if data['Password'] and data['Password'] == 'INSERT PASSWORD':
		try:
			sdb.put_attributes(
				DomainName='pizza',
				ItemName=item_name,
				Attributes=[{
					'Name': 'Slices',
					'Value': str(data['Slices']),
					'Replace': True
				}])

			return json.dumps({'Success': 'Your data was submitted!'})
		except:
			return json.dumps({'Error': 'Your data was not submitted.'})
	else:
		return json.dumps({
			'Error': 'Ah ah ah, you didn\'t say the magic word.'
		})
