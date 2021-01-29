# serial-metrics

This Docker container reads from a serial port to gather sensor data (e.g., Arduino) and exposes it to an HTTP port.

### Example Arduino code

Code can be found here: https://000.farm/articles/simple-water-monitor


### Example HTTP output

```
{"TEMP":"23.44"}
```

### Docker command

```
git clone https://github.com/willfong/serial-metrics.git
cd serial-metrics
docker build -t serial-metrics .
docker run -d --restart=unless-stopped --name serial-metrics --device=/dev/ttyUSB0 --env SENSOR_PORT=/dev/ttyUSB0 -p 8080:8080 serial-metrics:latest
```

### Building for ARM

https://github.com/docker/hub-feedback/issues/1261
