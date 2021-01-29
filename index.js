const http = require('http');
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

const sensorPort = process.env.SENSOR_PORT || '/dev/ttyUSB0';
const port = new SerialPort(sensorPort, { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));

var metrics = {}

const requestListener = function (req, res) {
  //res.setHeader('Content-Type', 'application/json');
  //res.end(JSON.stringify(metrics));
  const response = Object.keys(metrics).map(k => `${k} ${metrics[k]}`).join("\n");
  res.end(response);
}
const server = http.createServer(requestListener);

port.on("open", () => {
  console.log('Serial Port Open:', sensorPort);
});

parser.on('data', data => {
  console.log(`[${new Date().toISOString().substring(0, 19)}]`, data.trim());
  var pair = data.trim().split(' ');
  if (pair.length > 1) {
    metrics[pair[0]] = pair[1];
  }
});

server.listen(8080);
