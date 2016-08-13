var duplexer2 = require('duplexer2');
const spawn = require('child_process').spawn;

module.exports = function(cmd, args) {
	child = spawn(cmd, args);
	return duplexer2(child.stdin, child.stdout);
};
