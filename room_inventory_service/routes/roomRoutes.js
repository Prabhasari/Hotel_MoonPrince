import express from "express";
import {
  createRoom,
  getRooms,
  getRoomById,
  updateRoomStatus
} from "../controllers/roomController.js";
import validate from "../middleware/validate.js";
import {
  createRoomSchema,
  updateRoomStatusSchema
} from "../validations/roomValidation.js";

const router = express.Router();

router.route("/")
  .post(validate(createRoomSchema), createRoom)
  .get(getRooms);

router.route("/:id")
  .get(getRoomById);

router.patch("/:id/status", validate(updateRoomStatusSchema), updateRoomStatus);

export default router;