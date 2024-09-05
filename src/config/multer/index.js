const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, next) {
    next(null, path.join(__dirname, "../../public/assets/uploads/"));
    // console.log(__dirname);
  },
  filename: function (req, file, next) {
    next(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, next) {
    let ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return next(new Error("Only images are allowed"));
    }
    next(null, true);
  },
  limits: {
    fileSize: 1024 * 1024,
  },
});

module.exports = upload;
