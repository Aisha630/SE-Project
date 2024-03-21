import multer from "multer";
import path from "path";

// Allows up to 5 file uploads with 2MB size limit and file validation
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2000000 },
  fileFilter: function (_, file, cb) {
    checkFileType(file, cb);
  },
}).array("images", 5);

// Checks if the uploaded file is an image
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

export default upload;
