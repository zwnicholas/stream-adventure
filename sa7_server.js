// didn't use through2 here. Didn't seem necessary.
var http = require('http');
PORT = process.argv[2];

var server = http.createServer(function (request, response) {
	var body = [];
	if (request.method === 'POST') {
		request.on('data', function(data) {
			body.push(data);
		}).on('end', function () {
			body = Buffer.concat(body).toString().toUpperCase();
			response.writeHead(200, {'Content-Type': 'text/plain'});
			response.end(body);
		});
	}
	else 
		response.end('Send me a POST!');
});
server.listen(PORT);