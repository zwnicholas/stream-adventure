var through = require('through2');
var TRstream = through(_tr);
// encoding doesn't appear to even need to be defined
// learn the difference between the flush function passed to through(...) &
// the callback signalling the chunk is done being processed by _transform
function _tr(buf, encoding, callback) {
	uppercased = buf.toString().toUpperCase();
	this.push(uppercased);
	callback();
}
process.stdin.pipe(TRstream).pipe(process.stdout);







