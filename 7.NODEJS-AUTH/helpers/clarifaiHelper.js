const Clarifai = require("clarifai");

// Put your Clarifai API Key in the .env file, e.g. CLARIFAI_API_KEY=YOUR_KEY
const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API_KEY,
});

const detectLabels = async (imageUrl) => {
  try {
    const response = await app.models.predict(Clarifai.GENERAL_MODEL, imageUrl);
    const labels = response.outputs[0].data.concepts.map((c) => c.name);
    return labels;
  } catch (error) {
    console.error("Clarifai API error:", error);
    return [];
  }
};

module.exports = { detectLabels };
