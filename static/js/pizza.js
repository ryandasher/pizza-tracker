var endpoint =
	'https://bio9mswh9k.execute-api.us-west-2.amazonaws.com/Prod/pizzaslices';

/**
* Make an AWS API Gateway request.
*
* Args:
* url -- Endpoint to request (string).
* method -- GET or POST, must be capitalized (string).
* body -- Data to pass to request (string).
* callback -- Function to run with the response (function).
*/
function makeApiRequest(url, method, body, callback) {
	var response, httpRequest;

	httpRequest = new XMLHttpRequest();

	if (!httpRequest) {
		console.log('Can\'t create an XMLHTTP Request.');
		return false;
	}

	httpRequest.onreadystatechange = function() {
		if (httpRequest.readyState == 4 && httpRequest.status == 200) {
			callback(JSON.parse(httpRequest.responseText));
		}
	}

	httpRequest.open(method, url, true);
	httpRequest.setRequestHeader(
		"Content-Type",
		"application/json;charset=UTF-8"
	);
	httpRequest.send(body);
}


/**
* Display the appropriate number of pizza pie icons, or pizza
* slice icons.
*
* Args:
* response -- JSON object returned by GET request (object).
*/
function displayPizzaIcons(response) {
	for (var person in response) {
		if (response.hasOwnProperty(person)) {
			var slices = parseInt(response[person]['Attributes'][0]['Value']);
			var pizza_div = document.getElementById(person.toLowerCase());

			// First we divide the total slices by eight to figure out how many
			// whole pie icons to display. Then we'll use modulo to check the
			// remainder, which we'll display as single slices.
			var pies = slices / 8;
			for (; pies >= 1; pies--) {
				var pizza_image = document.createElement('img');
				pizza_image.setAttribute('src', 'static/images/pizza_pie.png');
				pizza_image.setAttribute('class', 'pizza-pie');
				pizza_div.appendChild(pizza_image);
			}

			var leftover_slices = slices % 8;
			for (; leftover_slices >= 1; leftover_slices--) {
				var pizza_image = document.createElement('img');
				pizza_image.setAttribute(
					'src',
					'static/images/pizza_slice.png'
				);
				pizza_div.appendChild(pizza_image);
			}
		}
	}
}


/**
* Gather and parse form data for POST request AWS API endpoint.
*/
function submitPizza() {
	var data = {
		'Sharon': parseInt(
			document.getElementsByName('sharon_slices')[0].value),
		'Ryan': parseInt(document.getElementsByName('ryan_slices')[0].value),
		'Password': document.getElementsByName('password')[0].value
	}

	if (isNaN(data.Sharon)) data.Sharon = 0;

	if (isNaN(data.Ryan)) data.Ryan = 0;

	makeApiRequest(
		endpoint,
		'POST',
		JSON.stringify(data),
		displaySubmitMessage
	);
}

/**
* Display some helpful messaging based on the response of the POST request.
*
* Args:
* resp -- Parsed response text (object).
*/
function displaySubmitMessage(resp) {
	var msg_div = document.getElementById('message');

	if (resp.Success) {
		msg_div.className = 'success';
		msg_div.innerHTML = '<p>' + resp.Success + '</p>';
		document.getElementsByName('sharon_slices')[0].value = "0";
		document.getElementsByName('ryan_slices')[0].value = "0";
	} else {
		msg_div.className = 'failure';
		msg_div.innerHTML = '<p>' + resp.Error + '</p>';
	}
}

// Only make the GET request if we're on the main Pizza Tracker page.
if (document.getElementById('pizza-table')) {
	makeApiRequest(endpoint, 'GET', null, displayPizzaIcons);
}
