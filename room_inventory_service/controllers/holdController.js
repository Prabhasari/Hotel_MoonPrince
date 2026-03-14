import mongoose from "mongoose";
import Hold from "../models/Hold.js";
import Room from "../models/Room.js";
import RoomType from "../models/RoomType.js";

// Manages holds on rooms for reservations including creation, comfirmation, release and retrieval of holds
// Helper function to calculate available room count for a given room type and date range
const getAvailableCount = async ({ roomType, checkIn, checkOut }) => {
  const roomTypeObjectId = new mongoose.Types.ObjectId(roomType);

  const totalRooms = await Room.countDocuments({
    roomType: roomTypeObjectId,
    status: { $in: ["ready", "dirty"] }
  });

  const overlapQuery = {
    roomType: roomTypeObjectId,
    checkIn: { $lt: new Date(checkOut) },
    checkOut: { $gt: new Date(checkIn) }
  };

  const now = new Date();

  const heldAgg = await Hold.aggregate([
    {
      $match: {
        ...overlapQuery,
        status: "held",
        expiresAt: { $gt: now }
      }
    },
    {
      $group: {
        _id: null,
        totalQty: { $sum: "$qty" }
      }
    }
  ]);

  const confirmedAgg = await Hold.aggregate([
    {
      $match: {
        ...overlapQuery,
        status: "confirmed"
      }
    },
    {
      $group: {
        _id: null,
        totalQty: { $sum: "$qty" }
      }
    }
  ]);

  const heldQty = heldAgg[0]?.totalQty || 0;
  const confirmedQty = confirmedAgg[0]?.totalQty || 0;

  return Math.max(0, totalRooms - heldQty - confirmedQty);
};

export const createHold = async (req, res, next) => {
  try {
    const { reservationId, roomType, checkIn, checkOut, qty } = req.body;

    const roomTypeExists = await RoomType.findById(roomType);
    if (!roomTypeExists) {
      return res.status(404).json({ message: "Room type not found" });
    }

    const existingHold = await Hold.findOne({
      reservationId,
      status: { $in: ["held", "confirmed"] }
    });

    if (existingHold) {
      return res.status(409).json({
        message: "An active hold already exists for this reservationId"
      });
    }

    const availableCount = await getAvailableCount({
      roomType,
      checkIn,
      checkOut
    });

    if (availableCount < qty) {
      return res.status(409).json({
        message: "Not enough rooms available for hold"
      });
    }

    const ttlMinutes = Number(process.env.HOLD_TTL_MINUTES || 10);
    const expiresAt = new Date(Date.now() + ttlMinutes * 60 * 1000);

    const hold = await Hold.create({
      reservationId,
      roomType,
      checkIn,
      checkOut,
      qty,
      status: "held",
      expiresAt
    });

    res.status(201).json({
      message: "Hold created successfully",
      hold
    });
  } catch (error) {
    next(error);
  }
};

export const confirmHold = async (req, res, next) => {
  try {
    const { holdId } = req.params;

    const hold = await Hold.findById(holdId);
    if (!hold) {
      return res.status(404).json({ message: "Hold not found" });
    }

    if (hold.status !== "held") {
      return res.status(400).json({
        message: `Cannot confirm hold with status '${hold.status}'`
      });
    }

    if (new Date(hold.expiresAt) <= new Date()) {
      hold.status = "expired";
      await hold.save();

      return res.status(400).json({
        message: "Hold has expired"
      });
    }

    hold.status = "confirmed";
    await hold.save();

    res.json({
      message: "Hold confirmed successfully",
      hold
    });
  } catch (error) {
    next(error);
  }
};

export const releaseHold = async (req, res, next) => {
  try {
    const { holdId } = req.params;

    const hold = await Hold.findById(holdId);
    if (!hold) {
      return res.status(404).json({ message: "Hold not found" });
    }

    if (!["held", "confirmed"].includes(hold.status)) {
      return res.status(400).json({
        message: `Cannot release hold with status '${hold.status}'`
      });
    }

    hold.status = "released";
    await hold.save();

    res.json({
      message: "Hold released successfully",
      hold
    });
  } catch (error) {
    next(error);
  }
};

export const getAllHolds = async (req, res, next) => {
  try {
    const holds = await Hold.find()
      .populate("roomType")
      .sort({ createdAt: -1 });

    res.json(holds);
  } catch (error) {
    next(error);
  }
};

export const getHoldById = async (req, res, next) => {
  try {
    const hold = await Hold.findById(req.params.id).populate("roomType");

    if (!hold) {
      return res.status(404).json({ message: "Hold not found" });
    }

    res.json(hold);
  } catch (error) {
    next(error);
  }
};