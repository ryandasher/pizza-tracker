(function() {
	var httpRequest;
	makeApiRequest('https://bio9mswh9k.execute-api.us-west-2.amazonaws.com/Prod/pizzaslices', 'GET', null);

	function makeApiRequest(url, method, body) {
		httpRequest = new XMLHttpRequest();

		if (!httpRequest) {
			console.log('Can\'t create an XMLHTTP Request.');
			return false;
		}

		httpRequest.onreadystatechange = storeResponse;
		httpRequest.open(method, url);
		httpRequest.send(body);
	}

	function storeResponse() {
		if (httpRequest.readyState === XMLHttpRequest.DONE) {
			if (httpRequest.status === 200) {
				resp = JSON.parse(httpRequest.responseText);
				// TODO: Just testing something.
				// document.getElementsByName("ryan_slices")[0].placeholder=resp["Ryan"]["Attributes"][0]["Value"];
				// document.getElementsByName("sharon_slices")[0].placeholder=resp["Sharon"]["Attributes"][0]["Value"];
			} else {
				console.log('There was a problem with the request.');
			}
		}
	}
})();