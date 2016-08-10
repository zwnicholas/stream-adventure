var ws = require('websocket-stream');
var stream = ws('ws://localhost:8099');

var str = 'hello\n';
stream.write(str);