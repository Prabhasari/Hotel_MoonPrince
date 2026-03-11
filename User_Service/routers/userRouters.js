import express from "express";
import { login, register } from "../controllers/authController.js";
import { createDiskUploader } from "../middlewares/uploadMiddleware.js";
import path from "path";

const router = express.Router();

const upload = createDiskUploader({
  getDestination: () => path.join(process.cwd(), "user_photos"),
});

router.post("/register", upload.single("photo"), register);
router.post("/login", login);

export default router;;