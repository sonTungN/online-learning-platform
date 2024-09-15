const upload = require("../config/multer");

const checkFile = (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      upload.single("courseImg")(req, res, function (err) {
        if (err) {
          console.log(err);
          return res.status(400).send("Error uploading file");
        }
        next();
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
    console.error(error);
  }
};

module.exports = { checkFile };
