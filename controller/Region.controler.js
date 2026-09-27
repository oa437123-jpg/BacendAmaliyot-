const mongoose = require("mongoose");
const { Region } = require("../model/RegionScheme");

// -------------------- Create Region --------------------

const createRegion = async (req, res) => {
  try {
    const { name } = req.body;
    const existingItem = await Region.findOne({ name });
    if (existingItem) {
      return res.status(400).json({
        message: "Bu viloyat allaqachon mavjud.",
      });
    }
    const itemData = { ...req.body };
    const newItem = new Region(itemData);
    await newItem.save();

    return res.status(201).json({
      success: true,
      message: "Viloyat muvaffaqiyatli yaratildi",
      user: newItem,
      innerData: newItem,
      region: newItem,
    });
  } catch (error) {
    console.error("Xato:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: viloyat yaratish jarayonida xatolik yuz berdi",
      error: error.message,
    });
  }
};

// -------------------- Get Regions --------------------

const getAllRegions = async (req, res) => {
  try {
    const items = await Region.find({});
    res.json({
      success: true,
      message: "Barcha viloyatlar ro'yxati olingan.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching regions:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: viloyatlarni olishda xato yuz berdi.",
    });
  }
};

// -------------------- Get Region By ID --------------------

const getRegionById = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const item = await Region.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: "Region not found" });
    }
    return res.status(200).json({
      message: "Region found",
      user: item,
      innerData: item,
      region: item,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Update Region --------------------

const updateRegion = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const updateData = { ...req.body };
    const updatedItem = await Region.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ message: "Region not found" });
    }
    res.json({
      success: true,
      message: "Region updated successfully",
      user: updatedItem,
      innerData: updatedItem,
      region: updatedItem,
    });
  } catch (error) {
    console.error("Error updating region:", error);
    res.status(500).json({
      success: false,
      message: "Server error: Failed to update region",
    });
  }
};

// -------------------- Delete Region --------------------

const deleteRegion = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const deletedItem = await Region.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "Region not found" });
    }
    res.json({
      message: "Region deleted successfully",
      deletedUser: deletedItem,
      deletedItem,
      innerData: deletedItem,
    });
  } catch (error) {
    console.error("Error deleting region:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Search Region --------------------

const searchRegion = async (req, res) => {
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

    const result = await Region.find({
      $or: orConditions,
    });
    if (result.length === 0) {
      return res.json({ message: "Bunday viloyat topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching regions:", error);
    res.status(500).json({ message: "Server error: Failed to fetch regions." });
  }
};

module.exports = {
  // Original names for routers
  createRegion,
  getAllRegions,
  getRegionById,
  updateRegion,
  deleteRegion,
  searchRegion,

  // Template aliases
  postRegister: createRegion,
  getUsers: getAllRegions,
  getRegions: getAllRegions,
  getUserById: getRegionById,
  updateUser: updateRegion,
  deleteUser: deleteRegion,
  searchUser: searchRegion,
};
