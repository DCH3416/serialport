# serialport
WeatherSTAR serial datalink

This is a javascript (nodejs) application for controlling a WeatherSTAR or WeatherSTAR data compatible device via arduino. 


The serialport.js application opens a network socket on the host that accepts json data and relays it via serial to an arduino or compatibe device. 


The client.js application sends json formatted data to device running serialport. 

- Usage: node client.js wx.sample.json

Edit var host = '...' in code to appropriate device on LAN.


The omcw.js application can be used to send control word to device. 

- Usage: node omcw.js byte2 tpage bpage byte1
- Example: node omcw.js 7 51 1
-   This example shows solid top and bottom, with page 51 on top, and page 1 on the bottom.


A typical configuration might be a raspberry pi attached to a LAN. An arduino connected via USB to the raspberry pi. And a WeatherSTAR unit attached to the arduino via datapins. 
