const net = require('net'),
JsonSocket = require('json-socket');

const tcpport = 6869;
const tcphost = "0.0.0.0";
const server = net.createServer();
server.listen(tcpport, tcphost);

const SerialPort = require('serialport');

const port = new SerialPort('/dev/ttyACM0', { baudRate: 115200 });

const Readline = require('@serialport/parser-readline');

const parser = port.pipe(new Readline({ delimiter: '\n' }));

showPortOpen();

function resetBuffer(b) {

	b[0] = 0xAA;  // Clock Run-In
	b[1] = 0xAA;  // Clock Run-In
	b[2] = 0xE4;  // Framing
	b[3] = 0x80;  // Row Number
	b[4] = 0x80;  // OMCW
	b[5] = 0x07;  // 
	b[6] = 0x1C;  //
	b[7] = 0x49;  //
	b[8] = 0x80;  // Page Number
	b[9] = 0x80;  //
	b[10] = 0x52;
	b[11] = 0x64;
	b[12] = 0x07;
	b[13] = 0x80;
	b[14] = 0xCE;
	b[15] = 0x2A;
	b[16] = 0x52;
	b[17] = 0xE3;
	b[18] = 0xE3;
	b[19] = 0x64;
	b[20] = 0x31;
	b[21] = 0x80;
	b[22] = 0x80;
	b[23] = 0x80;
	b[24] = 0x80;
	b[25] = 0x80;
	b[26] = 0x80;
	b[27] = 0x80;
	b[28] = 0x80;
	b[29] = 0x80;
	b[30] = 0x80;
	b[31] = 0xE3;
	b[32] = 0x52;
	b[33] = 0x80;
	b[34] = 0x80;
	b[35] = 0x80;
	b[36] = 0x80;

}

function assignFrame(b) {
	
	b[0] = 0xAA;
	b[1] = 0xAA;
	b[2] = 0XE4;
}

var sbuffer = new Buffer(37, 0);  // scratch buffer
var gbuffer = new Buffer(37, 0);
var wbuffer = new Buffer(592, 0); // wide buffer

var wcount = 0;
var writeInterval = 250;
var rpending = 0;
var rtcpending = 0;

var countup = 0;
var countto = 0;

// Read the port data

var omcwbyte1 = 0b0000;
var omcwbyte2 = 0b0101;
var omcwtp = 1;
var omcwbp = 1;

// pageAttrib follows the bit pattern of page generation

var pageAttrib = new Buffer(24, 0);

server.on('connection', function(socket) {

	socket = new JsonSocket(socket);

	socket.on('message', function(message) {

	var result = message;

		if (cw = result.OMCW) {
			
			if (cw.regionSeparator) {

				omcwbyte2 = (omcwbyte2 | 0b0100); 
			
			} else {
			
				omcwbyte2 = (omcwbyte2 & ~0b0100); 

			}
			
			if (cw.topSolid) {
			
				omcwbyte2 = (omcwbyte2 | 0b0010); 

			} else {
			
				omcwbyte2 = (omcwbyte2 & ~0b0010); 

			}

			if (cw.bottomSolid) {
			
				omcwbyte2 = (omcwbyte2 | 0b0001);

			} else {
			
				omcwbyte2 = (omcwbyte2 & ~0b0001); 

			}

			if (typeof cw.topPage == 'number') {

				omcwtp = (cw.topPage & 0x3F);

			}
			if (typeof cw.ldlPage == 'number') {
		
				omcwbp = (cw.ldlPage & 0x03);

			}

		}

		if (result.OMCWExtension) {
		
		}

		if (result.Address) {
				
		}

		var pn0 = 1;
		var lc0 = 0;
		var pattr0 = new Buffer(24, 0);

		if (pd = result.pageData) {

			if (typeof pd.pageNumber == 'number') {
				pn0 = (pd.pageNumber & 0x3F);
							
			}

			if (typeof pd.lineCount == 'number') {
				lc0 = (pd.lineCount & 0x0F);
							
			}

			if (pat = pd.pageAttributes) {
			
				if (pat.freeze) {
					pattr0[0] = (pattr0[0] | 0b0100);
				}
			
				if (pat.advisory) {
					pattr0[0] = (pattr0[0] | 0b0010);
				}

				if (pat.warning) {
					pattr0[0] = (pattr0[0] | 0b0001);
				}
				
				if (pat.flip) {
					pattr0[1] = (pattr0[1] | 0b0100);
				}
				
				if (pat.roll) {
					pattr0[1] = (pattr0[1] | 0b0010);
				}

				if (pat.chain) {
					pattr0[1] = (pattr0[1] | 0b0001);
				}

			}

			if (lat = pd.lineAttributes) {

				for(var i = 0; i < lat.length; i++) {
			
	if (lat[i].seperator) {
		pattr0[2 + (i * 2)] = (pattr0[2 + (i * 2)] | 0b1000);
	}
					
	if (lat[i].flash) {
		pattr0[2 + (i * 2)] = (pattr0[2 + (i * 2)] | 0b0100);
	}
					
	if (lat[i].reverse) {
		pattr0[2 + (i * 2)] = (pattr0[2 + (i * 2)] | 0b0010);
	}
					
	if (lat[i].border) {
		pattr0[2 + (i * 2)] = (pattr0[2 + (i * 2)] | 0b0001);
	}
					
	if (typeof lat[i].color == 'number') {
		pattr0[3 + (i * 2)] = (lat[i].color & 0x0F);
	}
				}
			}

			pageFrame(sbuffer, pn0, lc0, pattr0);
			
			if (wcount < (wbuffer.length / sbuffer.length)) {
				storeBuffer(sbuffer, wbuffer, wcount);
				wcount++;
			}

			if (lin = pd.lines) {
				
				for(var i = 0; i < lin.length; i++) {
					
	var ln0 = 0;
	var hw0 = 0b0000;
	var str0 = "";
	if (typeof lin[i].rowNumber == 'number') {
		ln0 = lin[i].rowNumber;
	}

	if (typeof lin[i].heightWidth.height == 'number') {
		hw0 = ((lin[i].heightWidth.height & 0x03) << 2);
	}

	if (typeof lin[i].heightWidth.width == 'number') {
		hw0 = (hw0 + (lin[i].heightWidth.width & 0x03) & 0x0F);
	}

	if (typeof lin[i].textData == 'string') {
		str0 = (lin[i].textData);
	}

	if (ln0 > 0 && ln0 < 10) {
		lineFrame(sbuffer, ln0, hw0, str0);

		if (wcount < (wbuffer.length / sbuffer.length)) {
			storeBuffer(sbuffer, wbuffer, wcount);
			wcount++;
		}
	}
				}
			}


			rpending = 1;
			countto = wcount;
		}
		
		if (td = result.todData) {

		}


	});
});

function storeBuffer(b, wb, offset) {

	b.copy(wb, offset * 37);
	
}

function readBuffer(b, rb, offset) {

	b.copy(rb, 0, offset * 37, (offset * 37) + 37);

}

var buffer = new Buffer(37, 0);

resetBuffer(buffer);

setInterval(writeBuffer, writeInterval);

parser.on('data', console.log);


function serialWrite(b) {

	port.write(b, function(err) {
		if (err) {
			return console.log('E: ', err.message);
		}
	});

	consoleBuffer();

}

function clockSync() {
	
	var cur = new Date();

	var min = cur.getMinutes();
	var sec = cur.getSeconds();
	var msc = cur.getMilliseconds();

	if ((msc > (1000 - (writeInterval * 0.5)) && (sec == 59)) ||  (msc <= (writeInterval * 0.5)) && (sec == 0)) {
		if ((min % 10) == 0 || (min % 10) == 9) {
			rtcpending = 1;
		}
	}
}

function writeBuffer() {

	clockSync(); 

	if (rpending) {
	
		readBuffer(wbuffer, buffer, countup);
		countup++;
		
		if (countup >= wcount) {
			countup = 0;
			rpending = 0;
			wcount = 0;
		}

		serialWrite(buffer);

	} else if (rtcpending) {

		idleBuffer(buffer);
		serialWrite(buffer);
		rtcpending = 0;

	} else {

		idleBuffer(buffer);
		//serialWrite(buffer);
	
	}

}


//omcw bits
// bytes 5-6
// 0:
// 1: local program
// 2: local preroll
// 3: aux audio

// 4: rad enable
// 5: region separator
// 6: top solid
// 7: bottom solid

// bytes 7-8
// 0-5: top page
// 6-7: bottom page

function idleBuffer (b) {

	resetBuffer(b);

	var cur = new Date();

	var wd = cur.getDay() + 1;
	var mn = cur.getMonth() + 1;
	var md = cur.getDate();

	var hr = cur.getHours();
	var min = cur.getMinutes();
	var sec = cur.getSeconds();
	var mer = 0;

	if (hr > 11 && hr < 24) {
		mer = 1;
		hr -= 12;
	}

	b[3] = (0b0 & 0x0F)

	omcwCtrl(b, omcwbyte1, omcwbyte2, omcwtp, omcwbp);
	
	b[8] = (0b0);
	b[9] = (0b0);

	b[10] = (0b0010 & 0x0F);
	
	b[11] = (wd & 0x0F);

	b[12] = (mn & 0x0F);

	b[13] = ((md >> 4) & 0x0F );
	b[14] = (md & 0x0F);

	b[15] = (hr & 0x0F);

	b[16] = ( (min >> 4) & 0x0F );
	b[17] = (min & 0x0F);

	b[18] = ( (sec >> 4) & 0x0F );
	b[19] = (sec & 0x0F);


	b[20] = (mer & 0x0F);

	var checksum = 0;
	for (var i = 10; i <= 30; i++) {
		checksum += b[i];
	}

	b[31] = ((checksum >> 4) & 0x0F)
	b[32] = (checksum & 0x0F)

	hamBytes(b, 3, 36);

	//consoleBuffer();

}

function pageFrame(b, pg, lc, pattr) {

	if (pg) {

	assignFrame(b);

	b[3] = (0b0 & 0x0F)

	omcwCtrl(b, omcwbyte1, omcwbyte2, omcwtp, omcwbp);
	//omcwCtrl(b, 0b0000, 0b0101, 51, 1);

	b[8] = ( (pg >> 4) & 0x0F)
	b[9] = (pg & 0x0F)
	
	// Unit address

	b[10] = 2;
	b[11] = 0;
	b[12] = 0;
	b[13] = 0;
	b[14] = 0;
	b[15] = 0;

	b[16] = (lc & 0x0F)

	//byte 18 & 19
	// spare, freeze, advise, warn
	// spare, flip, roll, chain

	b[17] = (pattr[0] & 0x0F);
	b[18] = (pattr[1] & 0x0F);

	//line attribs
	// separator, flash, reverse, border
	// color (grey, green, purple, red, blue, darkpurple, yellow, black) 
	// color (tan, limegreen, purple, peach, darkyellow, blue, orange, white) 

	//line 1
	b[19] = (pattr[2] & 0x0F)
	b[20] = (pattr[3] & 0x0F)

	//line 2
	b[21] = (pattr[4] & 0x0F)
	b[22] = (pattr[5] & 0x0F)

	//line 3
	b[23] = (pattr[6] & 0x0F)
	b[24] = (pattr[7] & 0x0F)

	//line 4
	b[25] = (pattr[8] & 0x0F)
	b[26] = (pattr[9] & 0x0F)

	//line 5
	b[27] = (pattr[10] & 0x0F)
	b[28] = (pattr[11] & 0x0F)

	//line 6
	b[29] = (pattr[12] & 0x0F)
	b[30] = (pattr[13] & 0x0F)

	//line 7
	b[31] = (pattr[14] & 0x0F)
	b[32] = (pattr[15] & 0x0F)

	//OMCW ext
	b[33] = (pattr[16] & 0x0F)
	b[34] = (pattr[17] & 0x0F)

	//line 8/9
	b[35] = (pattr[18] & 0x0F)
	b[36] = (pattr[19] & 0x0F)



	hamBytes(b, 3, 36);

	//consoleBuffer();

	}

}

function lineFrame(b, ln, hw, str) {

	// byte 4 is the line number
	b[3] = (ln & 0x0F);

	// height/width
	b[4] = (hw & 0x0F);

	// chars for the rest, 8 bit wide, spaces for the empty slots

	for (var i = 0; i < 32; i++) {

		b[5 + i] = (0x20 & 0xFF);
		
		// Line chars use odd bit parity. 
		// Input is shifted left, first bit 1 if odd. 
		
		if (i < str.length) {
			var workingchar = (str.charCodeAt(i) & 0x7F);
			var counter = 0;
			for (var j = 0; j < 8; j++) {
				var wcx = (workingchar >> j)
				var wb = (wcx & 0x01);
				if (wb == 1){ counter++ }
			}
			if (counter % 2) {
				workingchar = ((str.charCodeAt(i) & 0x7F));
				workingchar = ((workingchar) & ~0x80);
			} else {
				workingchar = ((str.charCodeAt(i) & 0x7F));
				workingchar = ((workingchar) | 0x80);
			}
			b[5 + i] = (workingchar & 0xFF);

		} else {

			b[5 + i] = (0x20 & 0xFF);
		
		}
	}

	hamBytes(b, 3, 4);

	//consoleBuffer();

}

function omcwCtrl( b, n1, n2, tp, bp ) {

	// Local Pgm, Pre-Roll, Alarm, Spare
	// Rad, Region Sep, Top Solid, Bottom Solid

	b[4] = (n1 & 0x0F);
	b[5] = (n2 & 0x0F);

	b[6] = ( (tp >> 2) & 0x0F);
	b[7] = ( ((tp & 0x03) << 2) + (bp & 0x03) );


}


function consoleBuffer() {
	console.log (
		'Byte: ' + 
		buffer[0].toString(16).padStart(2, "00") + ' ' +
		buffer[1].toString(16).padStart(2, "00") + ' ' +
		buffer[2].toString(16).padStart(2, "00") + ' ' +
		buffer[3].toString(16).padStart(2, "00") + ' ' +
		buffer[4].toString(16).padStart(2, "00") + ' ' +
		buffer[5].toString(16).padStart(2, "00") + ' ' +
		buffer[6].toString(16).padStart(2, "00") + ' ' +
		buffer[7].toString(16).padStart(2, "00") + ' ' +
		buffer[8].toString(16).padStart(2, "00") + ' ' +
		buffer[9].toString(16).padStart(2, "00") + ' ' +
		buffer[10].toString(16).padStart(2, "00") + ' ' +
		buffer[11].toString(16).padStart(2, "00") + ' ' +
		buffer[12].toString(16).padStart(2, "00") + ' ' +
		buffer[13].toString(16).padStart(2, "00") + ' ' +
		buffer[14].toString(16).padStart(2, "00") + ' ' +
		buffer[15].toString(16).padStart(2, "00") + ' ' +
		buffer[16].toString(16).padStart(2, "00") + ' ' +
		buffer[17].toString(16).padStart(2, "00") + ' ' +
		buffer[18].toString(16).padStart(2, "00") + ' ' +
		buffer[19].toString(16).padStart(2, "00") + ' ' +
		buffer[20].toString(16).padStart(2, "00") + ' ' +
		buffer[21].toString(16).padStart(2, "00") + ' ' +
		buffer[22].toString(16).padStart(2, "00") + ' ' +
		buffer[23].toString(16).padStart(2, "00") + ' ' +
		buffer[24].toString(16).padStart(2, "00") + ' ' +
		buffer[25].toString(16).padStart(2, "00") + ' ' +
		buffer[26].toString(16).padStart(2, "00") + ' ' +
		buffer[27].toString(16).padStart(2, "00") + ' ' +
		buffer[28].toString(16).padStart(2, "00") + ' ' +
		buffer[29].toString(16).padStart(2, "00") + ' ' +
		buffer[30].toString(16).padStart(2, "00") + ' ' +
		buffer[31].toString(16).padStart(2, "00") + ' ' +
		buffer[32].toString(16).padStart(2, "00") + ' ' +
		buffer[33].toString(16).padStart(2, "00") + ' ' +
		buffer[34].toString(16).padStart(2, "00") + ' ' +
		buffer[35].toString(16).padStart(2, "00") + ' ' +
		buffer[36].toString(16).padStart(2, "00") + ' ' +

		'\n'
	);

}

function hamBytes(b, start, end) {
	for (var i = start; i <= end; i++) {
		b[i] = Hammable(b[i]);
	}
}

function Hammable(value) {
	switch (value) {
		case 0:
			return 0x80;
		case 1:
			return 0x31;
		case 2:
			return 0x52;
		case 3:
			return 0xE3;
		case 4:
			return 0x64;
		case 5:
			return 0xD5;
		case 6:
			return 0xB6;
		case 7:
			return 0x07;
		case 8:
			return 0xF8;
		case 9:
			return 0x49;
		case 10:
			return 0x2A;
		case 11:
			return 0x9B;
		case 12:
			return 0x1C;
		case 13:
			return 0xAD;
		case 14:
			return 0xCE;
		case 15:
			return 0x7F;
		default:
			return value;
	}
}




function showPortOpen() {
	console.log('port open. Data rate: ' + port.baudRate);
}

function readSerialData(data) {
	console.log(data);
}

function showPortClose() {
	console.log('port closed.');
}

function showError(error) {
	console.log('Serial port error: ' + error);
}
