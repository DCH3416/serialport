var dgp = '';

const fs = require('fs');

function usage() {
	console.log("Node OMCW client \n\nUsage: node omcw.js [byte2] [tpage] [bpage] [byte1]\n");
}

if (process.argv.length > 2) {
	var omcwbyte2 = 0;
	if (arg = process.argv.slice(2).toString()) {
		omcwbyte2 = parseInt(arg);
		omcwbyte2 = ((omcwbyte2 % 16) & 0x0F);
	}
	var cwRegSep = Boolean(omcwbyte2 & 0b0100);
	var cwTopSol = Boolean(omcwbyte2 & 0b0010);
	var cwBotSol = Boolean(omcwbyte2 & 0b0001);

	var omcwtp = 0;
	if (arg = process.argv.slice(3).toString()) {
		omcwtp = parseInt(arg);
		omcwtp = ((omcwtp % 64) & 0x3F);
	}

	var omcwbp = 0;
	if (arg = process.argv.slice(4).toString()) {
		omcwbp = parseInt(arg);
		omcwbp = ((omcwbp % 4) & 0x03);
	}

	var omcwbyte = 0;
	if (arg = process.argv.slice(5).toString()) {
		omcwbyte = parseInt(arg);
		omcwbyte = ((omcwbyte % 16) & 0x0F);
	}

var net = require('net'),
    JsonSocket = require('json-socket');
 
var port = 6869; //The same port that the server is listening on
var host = '192.168.7.104';
var socket = new JsonSocket(new net.Socket()); //Decorate a standard net.Socket with JsonSocket
socket.connect(port, host);
socket.on('connect', function() { //Don't send until we're connected
    socket.sendEndMessage({ 
    				"OMCW":{ 
					"regionSeparator": cwRegSep,
					"topSolid": cwTopSol,
					"bottomSolid": cwBotSol,
					"topPage": omcwtp,
					"ldlPage": omcwbp
				} 
			});
    socket.on('message', function(message) {
        console.log('Rx: ' + message.result);
    });
});

} else {
	usage();
}
