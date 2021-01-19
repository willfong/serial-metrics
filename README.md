# serial-metrics

This Docker container reads from a serial port to gather sensor data (e.g., Arduino) and exposes it to an HTTP port.

### Example Arduino code

```
#define sensorPin A1

void setup() {
  Serial.begin(9600);
}

void loop() {
  int sensorData = analogRead(sensorPin);
  float volt = sensorData * (5000 / 1024.0);
  float temp = volt / 10;
  Serial.print("TEMP ");
  Serial.println(temp);
  delay(10000);
}
```

### Example HTTP output

```
{"TEMP":"23.44"}
```

### Docker command

```
docker run -d --name serial-metrics --device=/dev/ttyUSB1 --env SENSOR_PORT=/dev/ttyUSB1 -p 8080:8080 wfong/serial-metrics:latest
```

### Building for ARM

https://github.com/docker/hub-feedback/issues/1261
