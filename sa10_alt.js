// first version I got to work, using classic streams with
// defined event listeners
var trumpet = require('trumpet');
var fs = require('fs');
var tr = trumpet();
var through2 = require('through2');
fs.createReadStream('input.html').pipe(tr)

upperCaser = through2(function (buf, _, next) {
	this.push(buf.toString().toUpperCase());
	next();
});

/* create a readable/writable (duplex) stream 
containing the content between ALL .loud html 
class tags */
 tr.selectAll('.loud', function (loud) {
	var loudstream = loud.createStream();

	loudstream.on('data', function (buf) {
		loudstream.write(buf.toString().toUpperCase());
	});
	loudstream.on('end', function() {
		loudstream.end();
	});
});

