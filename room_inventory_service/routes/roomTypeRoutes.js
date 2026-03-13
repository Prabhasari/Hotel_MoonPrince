import express from "express";
import {
  createRoomType,
  getRoomTypes,
  getRoomTypeById,
  updateRoomType
} from "../controllers/roomTypeController.js";
import validate from "../middleware/validate.js";
import {
  createRoomTypeSchema,
  updateRoomTypeSchema
} from "../validations/roomTypeValidation.js";

const router = express.Router();

router.route("/")
  .post(validate(createRoomTypeSchema), createRoomType)
  .get(getRoomTypes);

router.route("/:id")
  .get(getRoomTypeById)
  .patch(validate(updateRoomTypeSchema), updateRoomType);

export default router;