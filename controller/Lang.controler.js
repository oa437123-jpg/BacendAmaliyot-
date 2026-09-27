const mongoose = require("mongoose");
const { Lang } = require("../model/LangScheme");

// -------------------- Create Lang --------------------

const createLang = async (req, res) => {
  try {
    const { name } = req.body;
    const existingItem = await Lang.findOne({ name });
    if (existingItem) {
      return res.status(400).json({
        message: "Bu til allaqachon mavjud.",
      });
    }
    const itemData = { ...req.body };
    const newItem = new Lang(itemData);
    await newItem.save();

    return res.status(201).json({
      success: true,
      message: "Til muvaffaqiyatli yaratildi",
      user: newItem,
      innerData: newItem,
      lang: newItem,
    });
  } catch (error) {
    console.error("Xato:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: til yaratish jarayonida xatolik yuz berdi",
      error: error.message,
    });
  }
};

// -------------------- Get Langs --------------------

const getAllLangs = async (req, res) => {
  try {
    const items = await Lang.find({});
    res.json({
      success: true,
      message: "Barcha tillar ro'yxati olingan.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching langs:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: tillarni olishda xato yuz berdi.",
    });
  }
};

// -------------------- Get Lang By ID --------------------

const getLangById = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const item = await Lang.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: "Lang not found" });
    }
    return res.status(200).json({
      message: "Lang found",
      user: item,
      innerData: item,
      lang: item,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Update Lang --------------------

const updateLang = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const updateData = { ...req.body };
    const updatedItem = await Lang.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ message: "Lang not found" });
    }
    res.json({
      success: true,
      message: "Lang updated successfully",
      user: updatedItem,
      innerData: updatedItem,
      lang: updatedItem,
    });
  } catch (error) {
    console.error("Error updating lang:", error);
    res.status(500).json({
      success: false,
      message: "Server error: Failed to update lang",
    });
  }
};

// -------------------- Delete Lang --------------------

const deleteLang = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const deletedItem = await Lang.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "Lang not found" });
    }
    res.json({
      message: "Lang deleted successfully",
      deletedUser: deletedItem,
      deletedItem,
      innerData: deletedItem,
    });
  } catch (error) {
    console.error("Error deleting lang:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Search Lang --------------------

const searchLang = async (req, res) => {
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

    const result = await Lang.find({
      $or: orConditions,
    });
    if (result.length === 0) {
      return res.json({ message: "Bunday til topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching langs:", error);
    res.status(500).json({ message: "Server error: Failed to fetch langs." });
  }
};

module.exports = {
  // Original names for routers
  createLang,
  getAllLangs,
  getLangById,
  updateLang,
  deleteLang,
  searchLang,

  // Template aliases
  postRegister: createLang,
  getUsers: getAllLangs,
  getLangs: getAllLangs,
  getUserById: getLangById,
  updateUser: updateLang,
  deleteUser: deleteLang,
  searchUser: searchLang,
};
