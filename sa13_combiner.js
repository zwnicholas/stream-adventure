var combine = require('stream-combiner');
var split = require('split');
var through2 = require('through2');
var zlib = require('zlib');

	// each new genre line with its list of books will be pushed
	// to biglist

	module.exports = function () {
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
				else
					//console.log(biglist[i] );
					this.push(JSON.stringify(biglist[i]) + '\n');
					biglist[++i] = { name: jsn.name, books: [] };
			}
			else if (jsn.type === "book") 
				biglist[i].books.push(jsn.name);
			else
				console.log('unknown field');

			//console.log(biglist[i]);
			next();
		};
		
		function end (done) {
			if (biglist[i]) {
				this.push(JSON.stringify(biglist[i]) + '\n');
			}
			done();
		}	
	};
