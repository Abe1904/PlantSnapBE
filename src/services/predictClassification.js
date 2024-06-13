const tf = require('@tensorflow/tfjs-node');
const InputError = require('../services/error');

async function predictClassification(model, image) {
  try {
    const tensor = tf.node.decodeImage(image, 3)
      .resizeNearestNeighbor([150, 150]) // Update to 150x150
      .expandDims()
      .toFloat()
      .div(tf.scalar(255.0)); 

    const classes = ['daisy', 'dandelion', 'rose', 'sunflower', 'tulip'];  

    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;

    const classResult = tf.argMax(prediction, 1).dataSync()[0];
    const label = classes[classResult];

    return { label };
  } catch (error) {
    throw new InputError(`Terjadi kesalahan input: ${error.message}`);
  }
}

module.exports = predictClassification;
