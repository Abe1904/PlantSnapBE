const tf = require('@tensorflow/tfjs-node');
const predictClassification = require('../services/predictClassification');
const { server } = require('@hapi/hapi');

let model;
const loadModel = async () => {
  try {
    const modelUrl = 'https://storage.googleapis.com/plantsnapmodel/MODELplantsnap/model.json';
    model = await tf.loadLayersModel(modelUrl);
    console.log('Model loaded successfully');
  } catch (error) {
    console.error('Error loading model:', error);
  }
};

loadModel();

const predictHandler = async (request, h) => {
  try {
    const { image } = request.payload;

    // Check if image is provided
    if (!image) {
      return h.response({ error: 'No image provided' }).code(400);
    }

    // Decode the base64 image string to a buffer
    // const imageBuffer = Buffer.from(image, 'base64');
    const imageBuffer = await streamToBuffer(image);

    // Call the predictClassification function with the image buffer
    const result = await predictClassification(model, imageBuffer);

    return h.response(result).code(200);

  } catch (error) {
    console.error('Error making prediction:', error);
    return h.response({ error: 'Failed to make prediction' }).code(500);
  }
};

// Utility function to convert stream to buffer
const streamToBuffer = (stream) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => {
      chunks.push(chunk);
    });
    stream.on('end', () => {
      resolve(Buffer.concat(chunks));
    });
    stream.on('error', (err) => {
      reject(err);
    });
  });
};

module.exports = { predictHandler };
