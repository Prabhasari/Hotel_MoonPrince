import Room from "../models/Room.js";
import RoomType from "../models/RoomType.js";

// Create a new room
export const createRoom = async (req, res, next) => {
  try {
    const roomTypeExists = await RoomType.findById(req.body.roomType);

    if (!roomTypeExists) {
      return res.status(404).json({ message: "Room type not found" });
    }

    const room = await Room.create(req.body);
    res.status(201).json(room);
  } catch (error) {
    next(error);
  }
};


// Get all rooms with optional filtering by room type and status
export const getRooms = async (req, res, next) => {
  try {
    const filter = {};

    if (req.query.roomType) filter.roomType = req.query.roomType;
    if (req.query.status) filter.status = req.query.status;

    const rooms = await Room.find(filter)
      .populate("roomType")
      .sort({ roomNumber: 1 });

    res.json(rooms);
  } catch (error) {
    next(error);
  }
};

// Get a single room by ID
export const getRoomById = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id).populate("roomType");

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.json(room);
  } catch (error) {
    next(error);
  }
};

// Update room status and notes
export const updateRoomStatus = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    room.status = req.body.status;
    if (req.body.notes !== undefined) {
      room.notes = req.body.notes;
    }

    const updatedRoom = await room.save();
    res.json(updatedRoom);
  } catch (error) {
    next(error);
  }
};