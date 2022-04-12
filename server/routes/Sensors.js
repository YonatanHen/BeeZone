const request = require('request');
const router = require('express').Router();

router.get('/get-data/:sample', async (req, res) => {
	const sampleNum = req.params.sample;

	request.get(
		{
			url: `https://beezone-b24ac-default-rtdb.europe-west1.firebasedatabase.app/${sampleNum}.json`,
			json: {},
		},
		(err, response, body) => {
			if (err) {
				return res.status(err.statusCode).send(err);
			} else if (response.statusCode === 200) {
				//Organize the relevant details
				const data = {
					temperature: response.body.T85,
					humidity: response.body.RH85,
					date: response.body.DateTime
				};
				console.log(data);
				return res.status(200).send(JSON.stringify(data));
			} else {
				res.status(400).send();
			}
		}
	);
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
