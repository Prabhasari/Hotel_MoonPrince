import RoomType from "../models/RoomType.js";

// Create a new room type
export const createRoomType = async (req, res, next) => {
  try {
    const roomType = await RoomType.create(req.body);
    res.status(201).json(roomType);
  } catch (error) {
    next(error);
  }
};

// Get all room types
export const getRoomTypes = async (req, res, next) => {
  try {
    const roomTypes = await RoomType.find().sort({ createdAt: -1 });
    res.json(roomTypes);
  } catch (error) {
    next(error);
  }
};

// Get a single room type by ID
export const getRoomTypeById = async (req, res, next) => {
  try {
    const roomType = await RoomType.findById(req.params.id);

    if (!roomType) {
      return res.status(404).json({ message: "Room type not found" });
    }

    res.json(roomType);
  } catch (error) {
    next(error);
  }
};

// Update room type details
export const updateRoomType = async (req, res, next) => {
  try {
    const roomType = await RoomType.findById(req.params.id);

    if (!roomType) {
      return res.status(404).json({ message: "Room type not found" });
    }

    Object.assign(roomType, req.body);
    const updatedRoomType = await roomType.save();

    res.json(updatedRoomType);
  } catch (error) {
    next(error);
  }
};