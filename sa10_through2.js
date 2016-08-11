// uses through2 instead of classic streams with defined event listeners.
// I learned here that you can't assign through2 to a variable to make 
// the code easier to read. A better practice for more complex transform functions
// would be to define the callback elsewhere.
var trumpet = require('trumpet');
var tr = trumpet();
var through2 = require('through2');
process.stdin.pipe(tr).pipe(process.stdout);

/* create a readable/writable (duplex) stream 
containing the content between ALL .loud html 
class tags */
 tr.selectAll('.loud', function (loud) {
	var loudstream = loud.createStream();

	loudstream.pipe(through2(function (buf, _, next) {
		this.push(buf.toString().toUpperCase());
		next();
 	})).pipe(loudstream);
});

