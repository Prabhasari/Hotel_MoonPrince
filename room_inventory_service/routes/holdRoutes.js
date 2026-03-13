import express from "express";
import {
  createHold,
  confirmHold,
  releaseHold,
  getAllHolds,
  getHoldById
} from "../controllers/holdController.js";
import validate from "../middleware/validate.js";
import { createHoldSchema } from "../validations/holdValidation.js";

const router = express.Router();

router.route("/")
  .post(validate(createHoldSchema), createHold)
  .get(getAllHolds);

router.route("/:id")
  .get(getHoldById);

router.post("/:holdId/confirm", confirmHold);
router.post("/:holdId/release", releaseHold);

export default router;