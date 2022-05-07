const tf = require('@tensorflow/tfjs');
const {
	checkArrayLengths,
} = require('@tensorflow/tfjs-layers/dist/engine/training');

require('@tensorflow/tfjs-node');

let isOk = true;

// my data:
const sensor = require('./sensor.json');

// const trainProcess = () => {
// train data
const data = sensor.map((item) => [item.RH85, item.T85]);
// console.log(data);
const trainData = tf.tensor2d(data);
// output data - what we would want to get
const outputData = tf.tensor2d(
	sensor.map((item) => {
		// good
		if (item.RH85 >= 50 && item.T85 >= 20) return [1, 0];
		// bad
		else return [0, 1];
	})
);

// build neural network
let model = tf.sequential();
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
		activation: 'relu',
		units: 2,
	})
);
model.add(
	tf.layers.dense({
		activation: 'softmax',
		units: 2,
	})
);
model.compile({
	loss: 'meanSquaredError',
	optimizer: tf.train.adam(0.06),
});
// };

// test data
const getTestData = (testingData) => {
	return (test = tf.tensor2d([[testingData[0], testingData[1]]]));
};

// train/fit our network

const checkData = (data) => {
	const startTime = Date.now();
	model
		.fit(trainData, outputData, { epochs: 20 })
		.then((history) => {
			console.log('data', Date.now() - startTime, 'ms');
			result = model.predict(data).data();

			// the final result.
			result.then((data) => {
				if (data[0] > 0.5 || NaN) {
					isOk = true;
				} else if (data[0] < 0.5) {
					isOk = false;
				}
				// console.log(data[0], isOk);
			});
		})
		.catch((err) => console.log('error:', err));
};

module.exports = { getTestData, checkData, isOk };
