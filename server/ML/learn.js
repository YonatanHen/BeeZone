const tf = require('@tensorflow/tfjs');
const {
	checkArrayLengths,
} = require('@tensorflow/tfjs-layers/dist/engine/training');

require('@tensorflow/tfjs-node');
// my data:
const sensor = require('./sensor.json');

// train data
const data = sensor.map((item) => [item.RH85, item.T85]);
// console.log(data);

// testing data:
const testingData = [100, 33.8];

const trainData = tf.tensor2d(data);

// output data
const outputData = tf.tensor2d(
	sensor.map((item) => {
		// good
		if (item.RH85 >= 50 && item.T85 >= 30) return [1, 0];
		// bad
		else return [0, 1];
	})
);

// test data
const test = tf.tensor2d([[testingData[0], testingData[1]]]);

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

// train/fit our network

const startTime = Date.now();
model
	.fit(trainData, outputData, { epochs: 20 })
	.then((history) => {
		console.log('data', Date.now() - startTime, 'ms');
		result = model.predict(test).data();

		// the final result.
		result.then((data) => console.log(data));
	})
	.catch((err) => console.log('error:', err));

// export class ML {
// 	model = tf.sequential();
// 	testingData;
// 	train;
// 	output;
// 	test;
// 	result;

// 	constructor(testingData) {
// 		this.testingData = testingData;
// 	}
// 	trainData = () => {
// 		let data = sensor.map((item) => [item.RH85, item.T85]);
// 		this.train = tf.tensor2d(data);
// 	};

// 	outputData = () => {
// 		this.output = tf.tensor2d(
// 			sensor.map((item) => {
// 				// good
// 				if (item.RH85 >= 50 && item.T85 >= 30) {
// 					return [1, 0];
// 					// bad
// 				} else {
// 					return [0, 1];
// 				}
// 			})
// 		);
// 	};

// 	testData = () => {
// 		// console.log(this.testingData);
// 		this.test = tf.tensor2d([
// 			[this.testingData['RH85'], this.testingData['T85']],
// 		]);
// 	};

// 	buildNN = () => {
// 		// build neural network

// 		this.model.add(
// 			tf.layers.dense({
// 				inputShape: [2],
// 				activation: 'sigmoid',
// 				units: 5,
// 			})
// 		);
// 		this.model.add(
// 			tf.layers.dense({
// 				inputShape: [5],
// 				activation: 'relu',
// 				units: 2,
// 			})
// 		);
// 		this.model.add(
// 			tf.layers.dense({
// 				activation: 'softmax',
// 				units: 2,
// 			})
// 		);
// 		this.model.compile({
// 			loss: 'meanSquaredError',
// 			optimizer: tf.train.adam(0.06),
// 		});
// 	};

// 	// train/fit our network
// 	fitModel = async () => {
// 		this.trainData();
// 		this.outputData();
// 		this.testData();

// 		const startTime = Date.now();
// 		this.model
// 			.fit(this.train, this.output, { epochs: 20 })
// 			.then(async (history) => {
// 				console.log('data', Date.now() - startTime, 'ms');
// 				this.result = await this.model.predict(this.test).data();

// 				// the final result.
// 				console.log(this.result);
// 			})
// 			.catch((err) => console.log('error:', err));
// 	};

// 	getResult = () => {
// 		try {
// 			this.result;
// 		} catch (e) {
// 			console.error('err', e);
// 		}
// 	};

// 	run = () => {
// 		this.buildNN();
// 		this.fitModel();
// 	};
// }

// const ml = new ML({
// 	RH85: 100,
// 	T85: 33.8,
// });

// ml.run();
