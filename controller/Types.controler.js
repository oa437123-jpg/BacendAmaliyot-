const mongoose = require("mongoose");
const { Types } = require("../model/TypesScheme");

// -------------------- Create Types --------------------

const createTypes = async (req, res) => {
  try {
    const { name } = req.body;
    const existingItem = await Types.findOne({ name });
    if (existingItem) {
      return res.status(400).json({
        message: "Bu tur allaqachon mavjud.",
      });
    }
    const itemData = { ...req.body };
    const newItem = new Types(itemData);
    await newItem.save();

    return res.status(201).json({
      success: true,
      message: "Tur muvaffaqiyatli yaratildi",
      user: newItem,
      innerData: newItem,
      types: newItem,
    });
  } catch (error) {
    console.error("Xato:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: tur yaratish jarayonida xatolik yuz berdi",
      error: error.message,
    });
  }
};

// -------------------- Get Types --------------------

const getAllTypes = async (req, res) => {
  try {
    const items = await Types.find({});
    res.json({
      success: true,
      message: "Barcha turlar ro'yxati olingan.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching types:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: turlarni olishda xato yuz berdi.",
    });
  }
};

// -------------------- Get Types By ID --------------------

const getTypesById = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const item = await Types.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: "Types not found" });
    }
    return res.status(200).json({
      message: "Types found",
      user: item,
      innerData: item,
      types: item,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Update Types --------------------

const updateTypes = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const updateData = { ...req.body };
    const updatedItem = await Types.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ message: "Types not found" });
    }
    res.json({
      success: true,
      message: "Types updated successfully",
      user: updatedItem,
      innerData: updatedItem,
      types: updatedItem,
    });
  } catch (error) {
    console.error("Error updating types:", error);
    res.status(500).json({
      success: false,
      message: "Server error: Failed to update types",
    });
  }
};

// -------------------- Delete Types --------------------

const deleteTypes = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const deletedItem = await Types.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "Types not found" });
    }
    res.json({
      message: "Types deleted successfully",
      deletedUser: deletedItem,
      deletedItem,
      innerData: deletedItem,
    });
  } catch (error) {
    console.error("Error deleting types:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Search Types --------------------

const searchTypes = async (req, res) => {
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

    const result = await Types.find({
      $or: orConditions,
    });
    if (result.length === 0) {
      return res.json({ message: "Bunday tur topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching types:", error);
    res.status(500).json({ message: "Server error: Failed to fetch types." });
  }
};

module.exports = {
  // Original names for routers
  createTypes,
  getAllTypes,
  getTypesById,
  updateTypes,
  deleteTypes,
  searchTypes,

  // Template aliases
  postRegister: createTypes,
  getUsers: getAllTypes,
  getTypes: getAllTypes,
  getUserById: getTypesById,
  updateUser: updateTypes,
  deleteUser: deleteTypes,
  searchUser: searchTypes,
};
