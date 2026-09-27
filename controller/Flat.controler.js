const mongoose = require("mongoose");
const { Flat } = require("../model/FlatScheme");

// -------------------- Create Flat --------------------

const createFlat = async (req, res) => {
  try {
    const itemData = { ...req.body };
    const newItem = new Flat(itemData);
    await newItem.save();

    return res.status(201).json({
      success: true,
      message: "Kvartira muvaffaqiyatli yaratildi",
      user: newItem,
      innerData: newItem,
      flat: newItem,
    });
  } catch (error) {
    console.error("Xato:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: kvartira yaratish jarayonida xatolik yuz berdi",
      error: error.message,
    });
  }
};

// -------------------- Get Flats --------------------

const getAllFlats = async (req, res) => {
  try {
    const items = await Flat.find({});
    res.json({
      success: true,
      message: "Barcha kvartiralar ro'yxati olingan.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching flats:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: kvartiralarni olishda xato yuz berdi.",
    });
  }
};

// -------------------- Get Flat By ID --------------------

const getFlatById = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const item = await Flat.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: "Flat not found" });
    }
    return res.status(200).json({
      message: "Flat found",
      user: item,
      innerData: item,
      flat: item,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Update Flat --------------------

const updateFlat = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const updateData = { ...req.body };
    const updatedItem = await Flat.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ message: "Flat not found" });
    }
    res.json({
      success: true,
      message: "Flat updated successfully",
      user: updatedItem,
      innerData: updatedItem,
      flat: updatedItem,
    });
  } catch (error) {
    console.error("Error updating flat:", error);
    res.status(500).json({
      success: false,
      message: "Server error: Failed to update flat",
    });
  }
};

// -------------------- Delete Flat --------------------

const deleteFlat = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const deletedItem = await Flat.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "Flat not found" });
    }
    res.json({
      message: "Flat deleted successfully",
      deletedUser: deletedItem,
      deletedItem,
      innerData: deletedItem,
    });
  } catch (error) {
    console.error("Error deleting flat:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Search Flat --------------------

const searchFlat = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const orConditions = [
        { condition: { $regex: query, $options: "i" } },
    ];

    if (mongoose.Types.ObjectId.isValid(query)) {
      orConditions.push({ _id: query });
    }

    const result = await Flat.find({
      $or: orConditions,
    });
    if (result.length === 0) {
      return res.json({ message: "Bunday kvartira topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching flats:", error);
    res.status(500).json({ message: "Server error: Failed to fetch flats." });
  }
};

module.exports = {
  // Original names for routers
  createFlat,
  getAllFlats,
  getFlatById,
  updateFlat,
  deleteFlat,
  searchFlat,

  // Template aliases
  postRegister: createFlat,
  getUsers: getAllFlats,
  getFlats: getAllFlats,
  getUserById: getFlatById,
  updateUser: updateFlat,
  deleteUser: deleteFlat,
  searchUser: searchFlat,
};
