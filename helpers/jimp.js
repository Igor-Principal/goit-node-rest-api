import Jimp from "jimp";
import path from "path";
import fs from "fs";
import HttpError from "./HttpError.js";

const staticPath = path.resolve("public", "avatars");
const tempPath = path.resolve("tmp");

export const resizer = async (fileName, user) => {
  const [userName, email] = user.split("@");
  const [name, extension] = fileName.split(".");
  const newFileName = `${userName}.${extension}`;

  const inputPath = path.join(tempPath, fileName);
  const outputPath = path.join(staticPath, newFileName);

  try {
    const image = await Jimp.read(inputPath);
    image.resize(250, 250).write(outputPath);

    fs.unlinkSync(inputPath);

    return outputPath;
  } catch (error) {
    throw HttpError(400, error.message);
  }
};
