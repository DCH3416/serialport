char packet[37];
int led = 13;

void setup() {
   pinMode(2, OUTPUT);  // D0
   pinMode(3, OUTPUT);  // D1
   pinMode(4, OUTPUT);  // D2
   pinMode(5, OUTPUT);  // D3
   pinMode(6, OUTPUT);  // D4
   pinMode(7, OUTPUT);  // D5
   pinMode(8, OUTPUT);  // D6
   pinMode(9, OUTPUT);  // D7
   pinMode(10, OUTPUT); // D8
   pinMode(12, OUTPUT); // Write strobe
   
   pinMode(led, OUTPUT);

   Serial.begin(115200);

}

void loop() {
  
  if (Serial.available() > 0) {
        delay(60);
  	digitalWrite(led, HIGH); 
	delay(50);
	digitalWrite(led, LOW);

	memset(packet, 0, 37);

	Serial.readBytesUntil(0xFF, packet, 37); 

	digitalWrite(10, HIGH);
	framingCode();
	writeStrobe();
	digitalWrite(10, LOW);
  
	for (int i = 3; i <= 36; i++) {

	if(((packet[i]) >> (7)) & 0x01) {
    		digitalWrite(9, HIGH);
  	} else {
    		digitalWrite(9, LOW);
  	}
  	if(((packet[i]) >> (6)) & 0x01) {
    		digitalWrite(8, HIGH);
  	} else {
    		digitalWrite(8, LOW);
  	}
  	if(((packet[i]) >> (5)) & 0x01) {
    		digitalWrite(7, HIGH);
  	} else {
    		digitalWrite(7, LOW);
  	}
  	if(((packet[i]) >> (4)) & 0x01) {
    		digitalWrite(6, HIGH);
  	} else {
    		digitalWrite(6, LOW);
  	}
  	if(((packet[i]) >> (3)) & 0x01) {
    		digitalWrite(5, HIGH);
  	} else {
		digitalWrite(5, LOW);
  	}
  	if(((packet[i]) >> (2)) & 0x01) {
    		digitalWrite(4, HIGH);
  	} else {
    		digitalWrite(4, LOW);
  	}
  	if(((packet[i]) >> (1)) & 0x01) {
    		digitalWrite(3, HIGH);
  	} else {
    		digitalWrite(3, LOW);
  	}
  	if(((packet[i]) >> (0)) & 0x01) {
    		digitalWrite(2, HIGH);
  	} else {
    		digitalWrite(2, LOW);
  	}
    	
	writeStrobe();

  	}
  
	digitalWrite(10, HIGH);
	framingCode();
	writeStrobe();
	digitalWrite(10, LOW);
  
	for (int i = 3; i <= 36; i++) {

	if(((packet[i]) >> (7)) & 0x01) {
    		digitalWrite(9, HIGH);
  	} else {
    		digitalWrite(9, LOW);
  	}
  	if(((packet[i]) >> (6)) & 0x01) {
    		digitalWrite(8, HIGH);
  	} else {
    		digitalWrite(8, LOW);
  	}
  	if(((packet[i]) >> (5)) & 0x01) {
    		digitalWrite(7, HIGH);
  	} else {
    		digitalWrite(7, LOW);
  	}
  	if(((packet[i]) >> (4)) & 0x01) {
    		digitalWrite(6, HIGH);
  	} else {
    		digitalWrite(6, LOW);
  	}
  	if(((packet[i]) >> (3)) & 0x01) {
    		digitalWrite(5, HIGH);
  	} else {
		digitalWrite(5, LOW);
  	}
  	if(((packet[i]) >> (2)) & 0x01) {
    		digitalWrite(4, HIGH);
  	} else {
    		digitalWrite(4, LOW);
  	}
  	if(((packet[i]) >> (1)) & 0x01) {
    		digitalWrite(3, HIGH);
  	} else {
    		digitalWrite(3, LOW);
  	}
  	if(((packet[i]) >> (0)) & 0x01) {
    		digitalWrite(2, HIGH);
  	} else {
    		digitalWrite(2, LOW);
  	}
    	
	writeStrobe();

  	}
  
	digitalWrite(10, HIGH);
	framingCode();
	writeStrobe();
	digitalWrite(10, LOW);
  
	for (int i = 3; i <= 36; i++) {

	if(((packet[i]) >> (7)) & 0x01) {
    		digitalWrite(9, HIGH);
  	} else {
    		digitalWrite(9, LOW);
  	}
  	if(((packet[i]) >> (6)) & 0x01) {
    		digitalWrite(8, HIGH);
  	} else {
    		digitalWrite(8, LOW);
  	}
  	if(((packet[i]) >> (5)) & 0x01) {
    		digitalWrite(7, HIGH);
  	} else {
    		digitalWrite(7, LOW);
  	}
  	if(((packet[i]) >> (4)) & 0x01) {
    		digitalWrite(6, HIGH);
  	} else {
    		digitalWrite(6, LOW);
  	}
  	if(((packet[i]) >> (3)) & 0x01) {
    		digitalWrite(5, HIGH);
  	} else {
		digitalWrite(5, LOW);
  	}
  	if(((packet[i]) >> (2)) & 0x01) {
    		digitalWrite(4, HIGH);
  	} else {
    		digitalWrite(4, LOW);
  	}
  	if(((packet[i]) >> (1)) & 0x01) {
    		digitalWrite(3, HIGH);
  	} else {
    		digitalWrite(3, LOW);
  	}
  	if(((packet[i]) >> (0)) & 0x01) {
    		digitalWrite(2, HIGH);
  	} else {
    		digitalWrite(2, LOW);
  	}
    	
	writeStrobe();

  	}
  
	digitalWrite(10, HIGH);
	framingCode();
	writeStrobe();
	digitalWrite(10, LOW);
  
	for (int i = 3; i <= 36; i++) {

	if(((packet[i]) >> (7)) & 0x01) {
    		digitalWrite(9, HIGH);
  	} else {
    		digitalWrite(9, LOW);
  	}
  	if(((packet[i]) >> (6)) & 0x01) {
    		digitalWrite(8, HIGH);
  	} else {
    		digitalWrite(8, LOW);
  	}
  	if(((packet[i]) >> (5)) & 0x01) {
    		digitalWrite(7, HIGH);
  	} else {
    		digitalWrite(7, LOW);
  	}
  	if(((packet[i]) >> (4)) & 0x01) {
    		digitalWrite(6, HIGH);
  	} else {
    		digitalWrite(6, LOW);
  	}
  	if(((packet[i]) >> (3)) & 0x01) {
    		digitalWrite(5, HIGH);
  	} else {
		digitalWrite(5, LOW);
  	}
  	if(((packet[i]) >> (2)) & 0x01) {
    		digitalWrite(4, HIGH);
  	} else {
    		digitalWrite(4, LOW);
  	}
  	if(((packet[i]) >> (1)) & 0x01) {
    		digitalWrite(3, HIGH);
  	} else {
    		digitalWrite(3, LOW);
  	}
  	if(((packet[i]) >> (0)) & 0x01) {
    		digitalWrite(2, HIGH);
  	} else {
    		digitalWrite(2, LOW);
  	}
    	
	writeStrobe();

  	}

	digitalWrite(10, HIGH);
	framingCode();
	writeStrobe();
	digitalWrite(10, LOW);
  
	for (int i = 3; i <= 36; i++) {

	if(((packet[i]) >> (7)) & 0x01) {
    		digitalWrite(9, HIGH);
  	} else {
    		digitalWrite(9, LOW);
  	}
  	if(((packet[i]) >> (6)) & 0x01) {
    		digitalWrite(8, HIGH);
  	} else {
    		digitalWrite(8, LOW);
  	}
  	if(((packet[i]) >> (5)) & 0x01) {
    		digitalWrite(7, HIGH);
  	} else {
    		digitalWrite(7, LOW);
  	}
  	if(((packet[i]) >> (4)) & 0x01) {
    		digitalWrite(6, HIGH);
  	} else {
    		digitalWrite(6, LOW);
  	}
  	if(((packet[i]) >> (3)) & 0x01) {
    		digitalWrite(5, HIGH);
  	} else {
		digitalWrite(5, LOW);
  	}
  	if(((packet[i]) >> (2)) & 0x01) {
    		digitalWrite(4, HIGH);
  	} else {
    		digitalWrite(4, LOW);
  	}
  	if(((packet[i]) >> (1)) & 0x01) {
    		digitalWrite(3, HIGH);
  	} else {
    		digitalWrite(3, LOW);
  	}
  	if(((packet[i]) >> (0)) & 0x01) {
    		digitalWrite(2, HIGH);
  	} else {
    		digitalWrite(2, LOW);
  	}
    	
	writeStrobe();

  	}
	
	digitalWrite(10, HIGH);
	framingCode();
	writeStrobe();
	digitalWrite(10, LOW);
  
	for (int i = 3; i <= 36; i++) {

	if(((packet[i]) >> (7)) & 0x01) {
    		digitalWrite(9, HIGH);
  	} else {
    		digitalWrite(9, LOW);
  	}
  	if(((packet[i]) >> (6)) & 0x01) {
    		digitalWrite(8, HIGH);
  	} else {
    		digitalWrite(8, LOW);
  	}
  	if(((packet[i]) >> (5)) & 0x01) {
    		digitalWrite(7, HIGH);
  	} else {
    		digitalWrite(7, LOW);
  	}
  	if(((packet[i]) >> (4)) & 0x01) {
    		digitalWrite(6, HIGH);
  	} else {
    		digitalWrite(6, LOW);
  	}
  	if(((packet[i]) >> (3)) & 0x01) {
    		digitalWrite(5, HIGH);
  	} else {
		digitalWrite(5, LOW);
  	}
  	if(((packet[i]) >> (2)) & 0x01) {
    		digitalWrite(4, HIGH);
  	} else {
    		digitalWrite(4, LOW);
  	}
  	if(((packet[i]) >> (1)) & 0x01) {
    		digitalWrite(3, HIGH);
  	} else {
    		digitalWrite(3, LOW);
  	}
  	if(((packet[i]) >> (0)) & 0x01) {
    		digitalWrite(2, HIGH);
  	} else {
    		digitalWrite(2, LOW);
  	}
    	
	writeStrobe();

  	}

	Serial.println("Ok");
	}	

}

void writeStrobe() {
  delayMicroseconds(2);
  digitalWrite(12, LOW);
  delayMicroseconds(2);
  digitalWrite(12, HIGH);
  delayMicroseconds(2);
}

void framingCode() {
  //packet[0]  = B11100100;
  //             d98765432;

  if(((packet[2]) >> (0)) & 0x01) {
    digitalWrite(9, HIGH);
  } else {
    digitalWrite(9, LOW);
  }
  if(((packet[2]) >> (1)) & 0x01) {
    digitalWrite(8, HIGH);
  } else {
    digitalWrite(8, LOW);
  }
  if(((packet[2]) >> (2)) & 0x01) {
    digitalWrite(7, HIGH);
  } else {
    digitalWrite(7, LOW);
  }
  if(((packet[2]) >> (3)) & 0x01) {
    digitalWrite(6, HIGH);
  } else {
    digitalWrite(6, LOW);
  }
  if(((packet[2]) >> (4)) & 0x01) {
    digitalWrite(5, HIGH);
  } else {
    digitalWrite(5, LOW);
  }
  if(((packet[2]) >> (5)) & 0x01) {
    digitalWrite(4, HIGH);
  } else {
    digitalWrite(4, LOW);
  }
  if(((packet[2]) >> (6)) & 0x01) {
    digitalWrite(3, HIGH);
  } else {
    digitalWrite(3, LOW);
  }
  if(((packet[2]) >> (7)) & 0x01) {
    digitalWrite(2, HIGH);
  } else {
    digitalWrite(2, LOW);
  }
}
