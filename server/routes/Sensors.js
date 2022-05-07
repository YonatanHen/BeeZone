const request = require('request');
const router = require('express').Router();
require('../sensor/Sensor');
var { StartSensor } = require('../sensor/Sensor');

router.get('/get-data/', async (req, res) => {
	///Your code goes here
	var { temperature, humidity } = StartSensor();

	const data = {
		temperature: temperature || 0,
		humidity: humidity || 0,
		date: new Date(),
	};

	res.status(200).send(JSON.stringify(data));
});

router.get('/get-data', async (req, res) => {
	// const sampleNum = req.params.sample;

	request.get(
		{
			url: `https://beezone-b24ac-default-rtdb.europe-west1.firebasedatabase.app/.json`,
			json: {},
		},
		(err, response, body) => {
			if (err) {
				return res.status(err.statusCode).send(err);
			} else if (response.statusCode === 200) {
				let data = response.body;

				// delete unnessesery data. leave only humidity and temperature data.
				for (let i = 0; i < data.length; ++i) {
					delete data[i]['AT85'];
					delete data[i]['AT85-ATamb'];
					delete data[i]['ATamb'];
					delete data[i]['DateTime'];
					delete data[i]['RHamb'];
					delete data[i]['T85-Tamb'];
					delete data[i]['Tamb'];
				}
				return res.status(200).send(Object.assign([], data));
			} else {
				res.status(400).send();
			}
		}
	);
});

module.exports = router;
