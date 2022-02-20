import express from "express";
import multer from "multer";
import path from "path";
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const __dirname = path.resolve();

function checkFileType(file, cb) {
  const filetype = /jpg|jpeg|png/;
  const extname = filetype.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetype.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", upload.single("image"), (req, res) => {
  console.log("file is ; ", req.file.path.split("\\"));
  console.log(__dirname + "\\uploads");

  const url = req.protocol + "://" + req.get("host");
  const id = req.params.id;

  const p =
    "/" + req.file.path.split("\\")[0] + "/" + req.file.path.split("\\")[1];

  res.send(req.file ? url + "/uploads/" + req.file.filename : req.image);
});

export default router;
