var duplexer2 = require('duplexer2');
var through2 = require('through2');
// Through fiddling with an older passing solution
// that used the original duplexer module, I've learned
// that it is absolutely essential in this case for both
// the writable through stream and the duplexer2 stream to 
// have the objectMode flag set to 'true'. Not sure why this is.

module.exports = function (counter) {
	countsObj = {};
	mystream = through2({ objectMode: true }, write, end);
	return duplexer2({ objectMode: true },  mystream, counter);
// don't lose sight of the forest for the trees here. write and end
// are functions passed to the through2 stream. Structuring the program
// this way, with the main body first and the helper functions second,
// makes it easier to read and understand.
	function write(chunk, _, next) {
			countsObj[chunk.country]++;
		else
			countsObj[chunk.country] = 1;
	
//	this.push(chunk);
// this.push breaks the program. When I 'run' it via stream-adventure
// there is no output at all. I'm guessing this is because I end up 
// pushing the input object chunk from the readable stream counter to
// the writable stream instead of the countsObj, which is what 
// we are ultimately interested in.
		next();
	};

	function end (done) {
		counter.setCounts(countsObj);
		done();
	}

};
