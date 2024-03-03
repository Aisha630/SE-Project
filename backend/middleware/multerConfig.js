import multer from 'multer'
import path from 'path'

// Configures storage engine for image uploads
const storage = multer.diskStorage({
    destination: '../uploads',
    filename: function (_, file, cb) {
        // Create a unique filename for each file
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Allows up to 5 file uploads with 2MB size limit and file validation
const upload = multer({
    storage: storage,
    limits: { fileSize: 2000000 },
    fileFilter: function (_, file, cb) {
        checkFileType(file, cb);
    }
}).array('images', 5);

// Checks if the uploaded file is an image
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

export default upload;
