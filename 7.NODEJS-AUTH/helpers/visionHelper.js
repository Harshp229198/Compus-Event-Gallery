const vision = require("@google-cloud/vision");

// Make sure GOOGLE_APPLICATION_CREDENTIALS env variable points to your service account JSON

const client = new vision.ImageAnnotatorClient();

const detectLabels = async (imagePath) => {
  try {
    const [result] = await client.labelDetection(imagePath);
    const labels = result.labelAnnotations.map((label) => label.description);
    return labels;
  } catch (error) {
    console.error("Google Vision API error:", error);
    return [];
  }
};

module.exports = { detectLabels };
