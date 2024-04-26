import multer from "multer";
import path from "path";

export default multer({
  limits: { fileSize: 3000000 },
  fileFilter: (_, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;

    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Images Only!");
    }
  },
}).array("images", 5);
