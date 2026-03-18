import Joi from "joi";

export const createHoldSchema = Joi.object({
  reservationId: Joi.string().trim().required(),
  roomType: Joi.string().trim().required(),
  checkIn: Joi.date().required(),
  checkOut: Joi.date().greater(Joi.ref("checkIn")).required(),
  qty: Joi.number().integer().min(1).required()
});