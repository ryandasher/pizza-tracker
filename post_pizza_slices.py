import boto3, json

sdb = boto3.client('sdb')

def lambda_handler(data, context):
	"""
	Handler for posting data to SimpleDB.

	Args:
	data -- Data to be stored (Dictionary).
	context -- AWS context for the request (Object).
	"""
	if data['Password'] and data['Password'] == 'INSERT PASSWORD':
		try:
			for person in ['Sharon', 'Ryan']:
				old_slice_count = int(
					sdb.get_attributes(
						DomainName='pizza',
						ItemName=person,
						AttributeNames=['Slices']
					)['Attributes'][0]['Value']
				)

				new_slice_count = old_slice_count + data[person]

				sdb.put_attributes(
					DomainName='pizza',
					ItemName=person,
					Attributes=[{
						'Name': 'Slices',
						'Value': str(new_slice_count),
						'Replace': True
					}]
				)

			return json.dumps({'Success': 'Your data was submitted!'})
		except:
			return json.dumps({'Error': 'Your data was not submitted.'})
	else:
		return json.dumps({
			'Error': 'Ah ah ah, you didn\'t say the magic word.'
		})
