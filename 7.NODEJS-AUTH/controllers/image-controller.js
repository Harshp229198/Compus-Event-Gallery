const {
  uploadToCloudinary,
  cloudinary,
} = require("../helpers/cloudinaryHelper");
const Image = require("../models/image");
const fs = require("fs");
const { detectLabels } = require("../helpers/clarifaiHelper");

const uploadImageController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "file is required, please upload a file.",
      });
    }
    // Upload image to Cloudinary
    const { url, publicId } = await uploadToCloudinary(req.file.path);

    // Call Clarifai AI for auto-labels
    const labels = await detectLabels(url); // use Cloudinary url

    // Get other metadata if you want eventType, batch from req.body
    const { eventType, batch, photoName } = req.body;

    // Save image details + AI labels to the database
    const newImage = new Image({
      url,
      publicId,
      uploadedBy: req.userInfo.id,
      eventType,
      batch,
      photoName,
      labels,
    });
    await newImage.save();

    // Optionally delete local file
    // fs.unlinkSync(req.file.path);

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      image: newImage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error uploading image",
    });
  }
};

const fetchImagesController = async (req, res) => {
  try {
    const images = await Image.find({});
    res.status(200).json({
      success: true,
      message: "Images fetched successfully",
      data: images,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching images",
    });
  }
};

const deleteImageController = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image)
      return res
        .status(404)
        .json({ success: false, message: "Image not found" });

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(image.publicId);

    // Delete from MongoDB
    await image.deleteOne();

    res.json({ success: true, message: "Image deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error deleting image" });
  }
};

const updatePhotoNameController = async (req, res) => {
  try {
    const { photoName } = req.body;
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res
        .status(404)
        .json({ success: false, message: "Image not found" });
    }
    image.photoName = photoName;
    await image.save();
    res.json({ success: true, message: "Photo name updated", image });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error updating photo name" });
  }
};

module.exports = {
  uploadImageController,
  fetchImagesController,
  deleteImageController,
  updatePhotoNameController,
};
