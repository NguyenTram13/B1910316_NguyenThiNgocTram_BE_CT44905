var multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./app/uploads/");
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".");
    const newExt = ext[ext.length - 1];
    cb(null, `${Date.now()}.${newExt}`);
  },
});
module.exports = { upload: multer({ storage: storage }) };
