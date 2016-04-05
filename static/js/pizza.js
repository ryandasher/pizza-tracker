(function() {
	var httpRequest;
	makeApiRequest('https://bio9mswh9k.execute-api.us-west-2.amazonaws.com/Prod/pizzaslices', 'GET', null);

	/**
	 * Make an AWS API Gateway request.
	 *
	 * Args:
	 * url -- Endpoint to request (string).
	 * method -- GET or POST, must be capitalized (string).
	 * body -- Data to pass to request (string).
	*/
	function makeApiRequest(url, method, body) {
		httpRequest = new XMLHttpRequest();

		if (!httpRequest) {
			console.log('Can\'t create an XMLHTTP Request.');
			return false;
		}

		httpRequest.onreadystatechange = parseResponse;
		httpRequest.open(method, url);
		httpRequest.send(body);
	}

	/**
	 * Determine the result of a request.
	*/
	function parseResponse() {
		if (httpRequest.readyState === XMLHttpRequest.DONE) {
			if (httpRequest.status === 200) {
				var resp = JSON.parse(httpRequest.responseText);
				displayPizzaIcons(resp['Sharon']['Attributes'][0]['Value'], 'sharon');
				displayPizzaIcons(resp['Ryan']['Attributes'][0]['Value'], 'ryan');
			} else {
				console.log('There was a problem with the request.');
			}
		}
	}

	/**
	 * Display the appropriate number of pizza pie icons, or pizza
	 * slice icons.
	 *
	 * Args:
	 * slices -- Amount of pizza slices eaten (string).
	 * person -- Person who ate the pizza slices (string).
	*/
	function displayPizzaIcons(slices, person) {
		var slices = parseInt(slices);
		var pizza_div = document.getElementById(person);

		var pies = slices / 8;
		for (; pies >= 1; pies--) {
			var pizza_image = document.createElement('img');
			pizza_image.setAttribute('src', 'static/images/pizza_pie.png');
			pizza_div.appendChild(pizza_image);
		}

		var slices = slices % 8;
		for (; slices >= 1; slices--) {
			var pizza_image = document.createElement('img');
			pizza_image.setAttribute('src', 'static/images/pizza_slice.png');
			pizza_div.appendChild(pizza_image);
		}
	}
})();
