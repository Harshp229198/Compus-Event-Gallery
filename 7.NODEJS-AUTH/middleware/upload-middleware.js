const multer = require('multer');
const path = require('path');


//set multer storage engine

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'uploads/'); // Set the destination folder for uploaded files
  },
  filename: function(req, file, cb){
    // Set the filename for the uploaded file
    cb(null, file.fieldname + '-' + Date.now + path.extname(file.originalname));
  }
});

//set file filter for image files only

const checkFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Accept the file
  }
  else {
    cb(new Error('Please upload an image file'), false); // Reject the file
  }
}

//multer middleware for image upload

const uploadMiddleware = multer({
  storage: storage,
  fileFilter: checkFileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5 // Limit file size to 5MB
  },
}) // 'image' is the name of the field in the form

module.exports = uploadMiddleware; // Export the middleware for use in routes