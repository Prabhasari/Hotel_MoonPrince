import express from "express";
import {
  createHold,
  getAllHolds,
  getHoldById,
  confirmHold,
  releaseHold
} from "../controllers/holdController.js";
import validate from "../middleware/validate.js";
import { createHoldSchema } from "../validations/holdValidation.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Holds
 *   description: Hold management endpoints
 */

/**
 * @swagger
 * /api/holds:
 *   post:
 *     summary: Create a hold
 *     tags: [Holds]
 *   get:
 *     summary: Get all holds
 *     tags: [Holds]
 */
router.route("/").post(validate(createHoldSchema), createHold).get(getAllHolds);

/**
 * @swagger
 * /api/holds/{id}:
 *   get:
 *     summary: Get one hold by id
 *     tags: [Holds]
 */
router.route("/:id").get(getHoldById);

/**
 * @swagger
 * /api/holds/{holdId}/confirm:
 *   post:
 *     summary: Confirm a hold
 *     tags: [Holds]
 */
router.post("/:holdId/confirm", confirmHold);

/**
 * @swagger
 * /api/holds/{holdId}/release:
 *   post:
 *     summary: Release a hold
 *     tags: [Holds]
 */
router.post("/:holdId/release", releaseHold);

export default router;