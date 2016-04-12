# Pizza Tracker

Simple static website that displays the amount of pizza that my wife and I have eaten while living in New York City. The [webpage](http://ryandasher.com/projects/pizza-tracker/) is hosted on Amazon S3.

When a user visits the webpage, a GET request is made to an Amazon Gateway API endpoint I've created that runs an AWS Lambda function that makes a request to Amazon SimpleDB to retrieve the amount of slices that we've eaten. This allowed me to run this webpage and the corresponding server side code without needing to spin up a micro EC2 instance or an RDS instance.

Sharon and I can update the amount of slices we've eaten by using a separate form submission page that makes a POST request to that same API endpoint, which calls a separate Lambda function.

#### TODOS:

* Don't append query string after form submission.
* Set up post submission messaging.
* Finish POST request logic.
