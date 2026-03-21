import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_VERSION = import.meta.env.VITE_API_VERSION;

export const getRoomTypes = async () => {
  const res = await axios.get(
    `${API_BASE_URL}${API_VERSION}/roomInventoryService/room-types`
  );
  return res;
};

export const getRoomTypeById = async (id) => {
  const res = await axios.get(
    `${API_BASE_URL}${API_VERSION}/roomInventoryService/room-types/${id}`
  );
  return res;
};

export const createRoomType = async (formData) => {
  const res = await axios.post(
    `${API_BASE_URL}${API_VERSION}/roomInventoryService/room-types`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
  return res;
};

export const updateRoomType = async (id, formData) => {
  const res = await axios.patch(
    `${API_BASE_URL}${API_VERSION}/roomInventoryService/room-types/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
  return res;
};

export const deleteRoomType = async (id) => {
  const res = await axios.delete(
    `${API_BASE_URL}${API_VERSION}/roomInventoryService/room-types/${id}`
  );
  return res;
};

export const getRooms = async () => {
  const res = await axios.get(
    `${API_BASE_URL}${API_VERSION}/roomInventoryService/rooms`
  );
  return res;
};

export const createRoom = async (roomData) => {
  const res = await axios.post(
    `${API_BASE_URL}${API_VERSION}/roomInventoryService/rooms`,
    roomData
  );
  return res;
};

export const updateRoom = async (id, roomData) => {
  const res = await axios.patch(
    `${API_BASE_URL}${API_VERSION}/roomInventoryService/rooms/${id}`,
    roomData
  );
  return res;
};

export const deleteRoom = async (id) => {
  const res = await axios.delete(
    `${API_BASE_URL}${API_VERSION}/roomInventoryService/rooms/${id}`
  );
  return res;
};