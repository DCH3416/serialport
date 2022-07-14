# serialport
WeatherSTAR serial datalink

This is a javascript (nodejs) application for controlling a WeatherSTAR or WeatherSTAR data compatible device via arduino. 

This application opens a network socket on the host that accepts json data and relays it via serial to an arduino or compatibe device. 

A typical configuration might be a raspberry pi attached to a LAN. An arduino connected via USB to the raspberry pi. And a WeatherSTAR unit attached to the arduino via datapins. 
