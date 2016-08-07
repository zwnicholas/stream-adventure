var concat = require('concat-stream');

process.stdin.pipe(concat(function (body) {
	var reversed = [];
	buf = body.toString();
	reversed = buf.split('').reverse().join('');
	console.log(reversed);
}));

