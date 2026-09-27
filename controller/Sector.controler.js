const mongoose = require("mongoose");
const { Sector } = require("../model/SectorScheme");

// -------------------- Create Sector --------------------

const createSector = async (req, res) => {
  try {
    const { sector_name } = req.body;
    const existingItem = await Sector.findOne({ sector_name });
    if (existingItem) {
      return res.status(400).json({
        message: "Bu sektor allaqachon mavjud.",
      });
    }
    const itemData = { ...req.body };
    const newItem = new Sector(itemData);
    await newItem.save();

    return res.status(201).json({
      success: true,
      message: "Sektor muvaffaqiyatli yaratildi",
      user: newItem,
      innerData: newItem,
      sector: newItem,
    });
  } catch (error) {
    console.error("Xato:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: sektor yaratish jarayonida xatolik yuz berdi",
      error: error.message,
    });
  }
};

// -------------------- Get Sectors --------------------

const getAllSectors = async (req, res) => {
  try {
    const items = await Sector.find({});
    res.json({
      success: true,
      message: "Barcha sektorlar ro'yxati olingan.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching sectors:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: sektorlarni olishda xato yuz berdi.",
    });
  }
};

// -------------------- Get Sector By ID --------------------

const getSectorById = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const item = await Sector.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: "Sector not found" });
    }
    return res.status(200).json({
      message: "Sector found",
      user: item,
      innerData: item,
      sector: item,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Update Sector --------------------

const updateSector = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const updateData = { ...req.body };
    const updatedItem = await Sector.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ message: "Sector not found" });
    }
    res.json({
      success: true,
      message: "Sector updated successfully",
      user: updatedItem,
      innerData: updatedItem,
      sector: updatedItem,
    });
  } catch (error) {
    console.error("Error updating sector:", error);
    res.status(500).json({
      success: false,
      message: "Server error: Failed to update sector",
    });
  }
};

// -------------------- Delete Sector --------------------

const deleteSector = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const deletedItem = await Sector.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "Sector not found" });
    }
    res.json({
      message: "Sector deleted successfully",
      deletedUser: deletedItem,
      deletedItem,
      innerData: deletedItem,
    });
  } catch (error) {
    console.error("Error deleting sector:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Search Sector --------------------

const searchSector = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const orConditions = [
        { sector_name: { $regex: query, $options: "i" } },
    ];

    if (mongoose.Types.ObjectId.isValid(query)) {
      orConditions.push({ _id: query });
    }

    const result = await Sector.find({
      $or: orConditions,
    });
    if (result.length === 0) {
      return res.json({ message: "Bunday sektor topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching sectors:", error);
    res.status(500).json({ message: "Server error: Failed to fetch sectors." });
  }
};

module.exports = {
  // Original names for routers
  createSector,
  getAllSectors,
  getSectorById,
  updateSector,
  deleteSector,
  searchSector,

  // Template aliases
  postRegister: createSector,
  getUsers: getAllSectors,
  getSectors: getAllSectors,
  getUserById: getSectorById,
  updateUser: updateSector,
  deleteUser: deleteSector,
  searchUser: searchSector,
};
