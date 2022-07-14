var dgp = '';

const fs = require('fs');

function usage() {
	console.log('Usage: client.js [jsonfile]');
}

if (process.argv.length > 2) {
	var args = process.argv.slice(2).toString();
	dgp = fs.readFileSync(args);

var jgp = JSON.parse(dgp);

var net = require('net'),
    JsonSocket = require('json-socket');
 
var port = 6869; //The same port that the server is listening on
var host = '192.168.7.104';
var socket = new JsonSocket(new net.Socket()); //Decorate a standard net.Socket with JsonSocket
socket.connect(port, host);
socket.on('connect', function() { //Don't send until we're connected
    socket.sendEndMessage(jgp);
    socket.on('message', function(message) {
        console.log('Rx: ' + message.result);
    });
});

} else {
	usage();
}

