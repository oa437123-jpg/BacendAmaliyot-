const mongoose = require("mongoose");
const { SeatType } = require("../model/SeatTypeScheme");

// -------------------- Create SeatType --------------------

const createSeatType = async (req, res) => {
  try {
    const { name } = req.body;
    const existingItem = await SeatType.findOne({ name });
    if (existingItem) {
      return res.status(400).json({
        message: "Bu o'rindiq turi allaqachon mavjud.",
      });
    }
    const itemData = { ...req.body };
    const newItem = new SeatType(itemData);
    await newItem.save();

    return res.status(201).json({
      success: true,
      message: "O'rindiq turi muvaffaqiyatli yaratildi",
      user: newItem,
      innerData: newItem,
      seatType: newItem,
    });
  } catch (error) {
    console.error("Xato:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: o'rindiq turi yaratish jarayonida xatolik yuz berdi",
      error: error.message,
    });
  }
};

// -------------------- Get SeatTypes --------------------

const getAllSeatTypes = async (req, res) => {
  try {
    const items = await SeatType.find({});
    res.json({
      success: true,
      message: "Barcha o'rindiq turlari ro'yxati olingan.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching seattypes:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: o'rindiq turlarini olishda xato yuz berdi.",
    });
  }
};

// -------------------- Get SeatType By ID --------------------

const getSeatTypeById = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const item = await SeatType.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: "SeatType not found" });
    }
    return res.status(200).json({
      message: "SeatType found",
      user: item,
      innerData: item,
      seatType: item,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Update SeatType --------------------

const updateSeatType = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const updateData = { ...req.body };
    const updatedItem = await SeatType.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ message: "SeatType not found" });
    }
    res.json({
      success: true,
      message: "SeatType updated successfully",
      user: updatedItem,
      innerData: updatedItem,
      seatType: updatedItem,
    });
  } catch (error) {
    console.error("Error updating seattype:", error);
    res.status(500).json({
      success: false,
      message: "Server error: Failed to update seattype",
    });
  }
};

// -------------------- Delete SeatType --------------------

const deleteSeatType = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const deletedItem = await SeatType.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "SeatType not found" });
    }
    res.json({
      message: "SeatType deleted successfully",
      deletedUser: deletedItem,
      deletedItem,
      innerData: deletedItem,
    });
  } catch (error) {
    console.error("Error deleting seattype:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Search SeatType --------------------

const searchSeatType = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const orConditions = [
        { name: { $regex: query, $options: "i" } },
    ];

    if (mongoose.Types.ObjectId.isValid(query)) {
      orConditions.push({ _id: query });
    }

    const result = await SeatType.find({
      $or: orConditions,
    });
    if (result.length === 0) {
      return res.json({ message: "Bunday o'rindiq turi topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching seattypes:", error);
    res.status(500).json({ message: "Server error: Failed to fetch seattypes." });
  }
};

module.exports = {
  // Original names for routers
  createSeatType,
  getAllSeatTypes,
  getSeatTypeById,
  updateSeatType,
  deleteSeatType,
  searchSeatType,

  // Template aliases
  postRegister: createSeatType,
  getUsers: getAllSeatTypes,
  getSeatTypes: getAllSeatTypes,
  getUserById: getSeatTypeById,
  updateUser: updateSeatType,
  deleteUser: deleteSeatType,
  searchUser: searchSeatType,
};
