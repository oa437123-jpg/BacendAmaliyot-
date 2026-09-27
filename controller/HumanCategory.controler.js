const mongoose = require("mongoose");
const { HumanCategory } = require("../model/HumanCategoryScheme");

// -------------------- Create HumanCategory --------------------

const createHumanCategory = async (req, res) => {
  try {
    const itemData = { ...req.body };
    const { gender_id } = req.body;

    if (gender_id && mongoose.Types.ObjectId.isValid(gender_id)) {
      itemData.gender_id = gender_id;
    }
    const newItem = new HumanCategory(itemData);
    await newItem.save();

    return res.status(201).json({
      success: true,
      message: "Inson toifasi muvaffaqiyatli yaratildi",
      user: newItem,
      innerData: newItem,
      humanCategory: newItem,
    });
  } catch (error) {
    console.error("Xato:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: inson toifasi yaratish jarayonida xatolik yuz berdi",
      error: error.message,
    });
  }
};

// -------------------- Get HumanCategories --------------------

const getAllHumanCategories = async (req, res) => {
  try {
    const items = await HumanCategory.find({}).populate([
      { path: "gender_id" },
    ]);
    res.json({
      success: true,
      message: "Barcha inson toifalari ro'yxati olingan.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching humancategories:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: inson toifalarini olishda xato yuz berdi.",
    });
  }
};

// -------------------- Get HumanCategory By ID --------------------

const getHumanCategoryById = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const item = await HumanCategory.findById(itemId).populate([
      { path: "gender_id" },
    ]);

    if (!item) {
      return res.status(404).json({ message: "HumanCategory not found" });
    }
    return res.status(200).json({
      message: "HumanCategory found",
      user: item,
      innerData: item,
      humanCategory: item,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Update HumanCategory --------------------

const updateHumanCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const updateData = { ...req.body };
    const { gender_id } = req.body;

    if (gender_id && mongoose.Types.ObjectId.isValid(gender_id)) {
      updateData.gender_id = gender_id;
    }
    const updatedItem = await HumanCategory.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate([
      { path: "gender_id" },
    ]);

    if (!updatedItem) {
      return res.status(404).json({ message: "HumanCategory not found" });
    }
    res.json({
      success: true,
      message: "HumanCategory updated successfully",
      user: updatedItem,
      innerData: updatedItem,
      humanCategory: updatedItem,
    });
  } catch (error) {
    console.error("Error updating humancategory:", error);
    res.status(500).json({
      success: false,
      message: "Server error: Failed to update humancategory",
    });
  }
};

// -------------------- Delete HumanCategory --------------------

const deleteHumanCategory = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const deletedItem = await HumanCategory.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "HumanCategory not found" });
    }
    res.json({
      message: "HumanCategory deleted successfully",
      deletedUser: deletedItem,
      deletedItem,
      innerData: deletedItem,
    });
  } catch (error) {
    console.error("Error deleting humancategory:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Search HumanCategory --------------------

const searchHumanCategory = async (req, res) => {
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

    const result = await HumanCategory.find({
      $or: orConditions,
    }).populate([
      { path: "gender_id" },
    ]);
    if (result.length === 0) {
      return res.json({ message: "Bunday inson toifasi topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching humancategories:", error);
    res.status(500).json({ message: "Server error: Failed to fetch humancategories." });
  }
};

module.exports = {
  // Original names for routers
  createHumanCategory,
  getAllHumanCategories,
  getHumanCategoryById,
  updateHumanCategory,
  deleteHumanCategory,
  searchHumanCategory,

  // Template aliases
  postRegister: createHumanCategory,
  getUsers: getAllHumanCategories,
  getHumanCategories: getAllHumanCategories,
  getUserById: getHumanCategoryById,
  updateUser: updateHumanCategory,
  deleteUser: deleteHumanCategory,
  searchUser: searchHumanCategory,
};
