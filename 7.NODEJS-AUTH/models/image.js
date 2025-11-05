const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    eventType: {
      type: String,
      required: false, // Set to true if you want it mandatory
    },
    batch: {
      type: String,
      required: false, // Set to true if needed
    },
    labels: [
      {
        type: String,
      },
    ],
    photoName: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Image", ImageSchema);
