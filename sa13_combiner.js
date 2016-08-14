var combine = require('stream-combiner');
var split = require('split');
var through2 = require('through2');
var zlib = require('zlib');

	// each new genre line with its list of books will be pushed
	// to biglist

	module.exports = function () {
		// Strangely, the solution passes whether or not
		// I use a through object stream or a standard through
		// stream. No idea why this is. I would've thought
		// it wouldn't have worked unless it were in object mode.
		// My through stream, after all, is transforming a stream
		// of JSON objects.
		var TRstrm = through2.obj(write, end);
		var biglist = [
		 { 	name: "",
			books: []
		 }
		];
		var i = -1;
		
		return combine(
			split(),
			TRstrm,
			zlib.createGzip()

			)

		function write(buf, _, next) {
			// why do we have to return next()? shouldn't calling next()
			// to exit to move onto the next line be sufficient?
			// I need to look into this
			if (buf.length === 0) return next(); 
			var jsn = JSON.parse(buf);

			if (jsn.type === "genre") {
				if (i === -1)
					biglist[++i] = { name: jsn.name, books: [] };
				else {
					console.log(biglist[i] );
					this.push(JSON.stringify(biglist[i]) + '\n');
					biglist[++i] = { name: jsn.name, books: [] };
				}
			}
			else if (jsn.type === "book") 
				biglist[i].books.push(jsn.name);
			else
				console.log('unknown field');

			//console.log(biglist[i]);
			next();
		};
		
		function end (done) {
		// adding this if statement with the push is essential in order
		// for the solution to pass. Even after reading the through2 
		// documentation on the flush function I don't know why this is.
		// All I know is, when I replace its body with just 'done()',
		// one of the five genres ends up missing from the expected output
		// If I console log it on line 39 it's missing as well.
		// Hopefully the answer lies somewhere deep
		// in the bowels of the node stream module documentation.
			if (biglist[i]) {
				this.push(JSON.stringify(biglist[i]) + '\n');
			}
			done();
		}	
	};
