var through = require('through2');
var TRstream = through(_tr);
var split = require('split');

// 
function _tr(buf, _, callback) {
	var linecount = 1;
	line = buf.toString() + '\n';
	(linecount % 2 === 0) ? this.push(line.toUpperCase()) : this.push(line.toLowerCase());
	linecount++;
	callback();
}

process.stdin
	.pipe(split());
	.pipe(TRstream);
	.pipe(process.stdout);