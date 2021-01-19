const http = require('http');
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

const sensorPort = process.env.SENSOR_PORT || '/dev/ttyUSB0';
const port = new SerialPort(sensorPort, { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));

var metrics = {}

const requestListener = function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(metrics));
}
const server = http.createServer(requestListener);

port.on("open", () => {
  console.log('Serial Port Open:', sensorPort);
});

parser.on('data', data => {
  var pair = data.split(' ');
  metrics[pair[0]] = pair[1].trim()
  console.log('[SERIAL OUTPUT]', data.trim());
});

server.listen(8080);
