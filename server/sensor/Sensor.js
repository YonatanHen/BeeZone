var SerialPort = require('serialport');
const parsers = SerialPort.parsers;

var humidity;
var temperature;

const parser = new parsers.Readline({
	delimiter: '\r\n',
});

// If needed, change my port to your Arduino Port.
var port = new SerialPort('/COM3', {
	baudRate: 9600,
	dataBits: 8,
	parity: 'none', 
	stopBits: 1,
	flowControl: false,
});

port.pipe(parser); // reads data from a readable stream as it becomes available and writes it to a destination

const StartSensor = () => {
	setTimeout(() => {}, 3100);
	parser.on('data', function (data) {
		humidity = parseFloat(data.substring(10, 15));
		temperature = parseFloat(data.substring(32, 36));
		console.log(data.lenght);
		console.log(temperature);
		console.log(temperature);
	});

	return { temperature, humidity };
};

module.exports = { temperature, humidity, StartSensor };
// router.get('/get-data/', async (req, res) => {
// 	///Your code goes here

// 	const data = {
// 		temperature: temperature,
// 		humidity: humidity,
// 		date: new Date(),
// 	};

// 	res.status(200).send(JSON.stringify(data));
// });
