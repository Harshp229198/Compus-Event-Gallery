const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth-middleware.js");
const isAdminMiddleware = require("../middleware/admin-middleware.js");
const uploadMiddleware = require("../middleware/upload-middleware.js");
const {
  uploadImageController,
  fetchImagesController,
  deleteImageController,
  updatePhotoNameController,
} = require("../controllers/image-controller.js");

//upload image route
router.post(
  "/upload",
  authMiddleware,
  uploadMiddleware.single("image"),
  uploadImageController
);

//get all images route
router.get("/fetch", authMiddleware, fetchImagesController);

// In image-routes.js
router.delete(
  "/delete/:id",
  authMiddleware,
  isAdminMiddleware,
  deleteImageController
);

router.patch(
  "/update-photo-name/:id",
  authMiddleware,
  updatePhotoNameController
);

module.exports = router;
