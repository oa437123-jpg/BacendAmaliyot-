const mongoose = require("mongoose");
const { District } = require("../model/DistrictScheme");

// -------------------- Create District --------------------

const createDistrict = async (req, res) => {
  try {
    const itemData = { ...req.body };
    const { region_id } = req.body;

    if (region_id && mongoose.Types.ObjectId.isValid(region_id)) {
      itemData.region_id = region_id;
    }
    const newItem = new District(itemData);
    await newItem.save();

    return res.status(201).json({
      success: true,
      message: "Tuman muvaffaqiyatli yaratildi",
      user: newItem,
      innerData: newItem,
      district: newItem,
    });
  } catch (error) {
    console.error("Xato:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: tuman yaratish jarayonida xatolik yuz berdi",
      error: error.message,
    });
  }
};

// -------------------- Get Districts --------------------

const getAllDistricts = async (req, res) => {
  try {
    const items = await District.find({}).populate([
      { path: "region_id" },
    ]);
    res.json({
      success: true,
      message: "Barcha tumanlar ro'yxati olingan.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching districts:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: tumanlarni olishda xato yuz berdi.",
    });
  }
};

// -------------------- Get District By ID --------------------

const getDistrictById = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const item = await District.findById(itemId).populate([
      { path: "region_id" },
    ]);

    if (!item) {
      return res.status(404).json({ message: "District not found" });
    }
    return res.status(200).json({
      message: "District found",
      user: item,
      innerData: item,
      district: item,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Update District --------------------

const updateDistrict = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const updateData = { ...req.body };
    const { region_id } = req.body;

    if (region_id && mongoose.Types.ObjectId.isValid(region_id)) {
      updateData.region_id = region_id;
    }
    const updatedItem = await District.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate([
      { path: "region_id" },
    ]);

    if (!updatedItem) {
      return res.status(404).json({ message: "District not found" });
    }
    res.json({
      success: true,
      message: "District updated successfully",
      user: updatedItem,
      innerData: updatedItem,
      district: updatedItem,
    });
  } catch (error) {
    console.error("Error updating district:", error);
    res.status(500).json({
      success: false,
      message: "Server error: Failed to update district",
    });
  }
};

// -------------------- Delete District --------------------

const deleteDistrict = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const deletedItem = await District.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "District not found" });
    }
    res.json({
      message: "District deleted successfully",
      deletedUser: deletedItem,
      deletedItem,
      innerData: deletedItem,
    });
  } catch (error) {
    console.error("Error deleting district:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Search District --------------------

const searchDistrict = async (req, res) => {
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

    const result = await District.find({
      $or: orConditions,
    }).populate([
      { path: "region_id" },
    ]);
    if (result.length === 0) {
      return res.json({ message: "Bunday tuman topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching districts:", error);
    res.status(500).json({ message: "Server error: Failed to fetch districts." });
  }
};

module.exports = {
  // Original names for routers
  createDistrict,
  getAllDistricts,
  getDistrictById,
  updateDistrict,
  deleteDistrict,
  searchDistrict,

  // Template aliases
  postRegister: createDistrict,
  getUsers: getAllDistricts,
  getDistricts: getAllDistricts,
  getUserById: getDistrictById,
  updateUser: updateDistrict,
  deleteUser: deleteDistrict,
  searchUser: searchDistrict,
};
