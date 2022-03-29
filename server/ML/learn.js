const tf = require('@tensorflow/tfjs');
const iris = require('./iris.json');
const irisTesting = require('./iris-testing.json');

// my data:
const sensor = require('./sensor.json');
const sensorTesting = require('./sensor-testing.json');

const trainingData = tf.tensor2d(sensor.map((item) => [item.RH85, item.T85]));

const outputData = tf.tensor2d(
	sensor.map((item) => {
		// good
		if (item.RH85 >= 55 && item.T85 >= 30) {
			return [1, 0];
			// bad
		} else {
			return [0, 1];
		}
	})
);

const testingData = tf.tensor2d(
	sensorTesting.map((item) => {
		if (item.RH85 >= 55 && item.T85 >= 30) {
			console.log('[1, 0]');
		} else {
			console.log('[0, 1]');
		}

		return [item.RH85, item.T85];
	})
);

// build neural network
const model = tf.sequential();

model.add(
	tf.layers.dense({
		inputShape: [2],
		activation: 'sigmoid',
		units: 5,
	})
);
model.add(
	tf.layers.dense({
		inputShape: [5],
		activation: 'sigmoid',
		units: 2,
	})
);
model.add(
	tf.layers.dense({
		activation: 'sigmoid',
		units: 2,
	})
);
model.compile({
	loss: 'meanSquaredError',
	optimizer: tf.train.adam(0.06),
});

// train/fit our network
const startTime = Date.now();
model.fit(trainingData, outputData, { epochs: 10 }).then((history) => {
	console.log(Date.now() - startTime, 'ms');
	model.predict(testingData).print();
});
