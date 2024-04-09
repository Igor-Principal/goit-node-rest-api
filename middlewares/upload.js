import multer from "multer";
import path from "path";

const destination = path.resolve("tmp");

const storage = multer.diskStorage({
  destination,
  filename: (_, file, cb) => {
    const prefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = `${prefix}_${file.originalname}`;
    cb(null, filename);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 5,
};

const upload = multer({ storage, limits });

export default upload;

// import multer from "multer";
// import path from "path";
// import HttpError from "../helpers/HttpError.js";

// const destination = path.resolve("temp");

// const storage = multer.diskStorage({
//   destination,
//   filename: (req, file, callback) => {
//     const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
//     const filename = `${uniquePrefix}_${file.originalname}`;
//     callback(null, filename);
//   },
// });

// const limits = {
//   fileSize: 250 * 250 * 5,
// };

// const fileFilter = (req, file, callback) => {
//   const extention = file.originalname.split(".").pop;
//   if (extention === "exe") {
//     return callback(HttpError(400, ".exe extention not allow"));
//   }
//   callback(null, true);
// };

// const upload = multer({
//   storage,
//   limits,
//   fileFilter,
// });

// export default upload;

