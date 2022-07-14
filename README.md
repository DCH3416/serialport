# serialport
WeatherSTAR serial datalink

This is a javascript (nodejs) application for controlling a WeatherSTAR or WeatherSTAR data compatible device via arduino. 


The *serialport.js* application opens a network socket on the host that accepts json data and relays it via serial to an arduino or compatibe device. 


The *client.js* application sends json formatted data to device running serialport. 

- Usage: node client.js wx.sample.json

Edit var host = '...' in code to appropriate device on LAN.


The *omcw.js* application can be used to send control word to device. 

- Usage: node omcw.js byte2 tpage bpage byte1
- Example: node omcw.js 7 51 1
-   This example shows solid top and bottom, with page 51 on top, and page 1 on the bottom.
    byte2 corrosponds to the following table
    ``` 
      0b0000    Where bit A is 1: region separator is on
         ^^^          bit B is 1: top section is solid
         ABC          bit C is 1: bottom section is solid
                      With least significant bit on right.
                      
      0b0101 = 5, region sep, bottom solid. 
      ```

A typical configuration might be a raspberry pi attached to a LAN. An arduino connected via USB to the raspberry pi. And a WeatherSTAR unit attached to the arduino via datapins. 
