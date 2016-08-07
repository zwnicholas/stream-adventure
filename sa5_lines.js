var through = require('through2');
var TRstream = through(_tr);
var split = require('split');

// 

var linecount = 1;
function _tr(buf, _, callback) {
	var line = buf.toString() + '\n'; 
	linecount % 2 === 0 
		 ? this.push(line.toUpperCase())
		 : this.push(line.toLowerCase());
  linecount++;
	callback();
};

process.stdin
	.pipe(split())
	.pipe(TRstream)
	.pipe(process.stdout);