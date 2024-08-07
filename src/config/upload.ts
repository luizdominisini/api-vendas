import path from "path";
import multer from "multer";
import crypto from "crypto";
import { Request } from "express";
const uploadFolder = path.resolve(__dirname, "..", "..", "uploads");

export default {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(request: Request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const filename = `${fileHash}-${file.originalname}`;
      callback(null, filename);
    },
  }),
};
