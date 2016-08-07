var through2 = require('through2');
var TRstream = through2(_tr);
// encoding doesn't appear to even need to be defined
// learn the difference between the flush function passed to through(...) &
// the callback signalling the chunk is done being processed by _transform
function _tr(buf, _, callback) {
	this.push(buf.toString().toUpperCase());
	callback();
}
process.stdin.pipe(TRstream).pipe(process.stdout);







