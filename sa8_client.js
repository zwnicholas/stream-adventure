var http = require('http');

var options = {
	port: 8099,
	method: 'POST'
};

var req = http.request(options, function (response) {
	response.pipe(process.stdout);
}).on('error', console.error);
req.on('error', console.error);

process.stdin.pipe(req);
