import Joi from "joi";

// Validation schema for creating a new room
export const createRoomSchema = Joi.object({
  roomNumber: Joi.string().trim().required(),
  floor: Joi.number().integer().optional(),
  roomType: Joi.string().trim().required(),
  status: Joi.string()
    .valid("ready", "dirty", "maintenance", "out_of_service")
    .default("ready"),
  notes: Joi.string().allow("").optional()
});

// Validation schema for updating room status and notes
export const updateRoomStatusSchema = Joi.object({
  status: Joi.string()
    .valid("ready", "dirty", "maintenance", "out_of_service")
    .required(),
  notes: Joi.string().allow("").optional()
});