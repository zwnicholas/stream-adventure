// first version I got to work, using classic streams with
// defined event listeners, without using through2
var trumpet = require('trumpet');
var fs = require('fs');
var tr = trumpet();
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

