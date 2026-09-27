const mongoose = require("mongoose");
const { Gender } = require("../model/GenderScheme");

// -------------------- Create Gender --------------------

const createGender = async (req, res) => {
  try {
    const { name } = req.body;
    const existingItem = await Gender.findOne({ name });
    if (existingItem) {
      return res.status(400).json({
        message: "Bu jins turi allaqachon mavjud.",
      });
    }
    const itemData = { ...req.body };
    const newItem = new Gender(itemData);
    await newItem.save();

    return res.status(201).json({
      success: true,
      message: "Jins muvaffaqiyatli yaratildi",
      user: newItem,
      innerData: newItem,
      gender: newItem,
    });
  } catch (error) {
    console.error("Xato:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: jins yaratish jarayonida xatolik yuz berdi",
      error: error.message,
    });
  }
};

// -------------------- Get Genders --------------------

const getAllGenders = async (req, res) => {
  try {
    const items = await Gender.find({});
    res.json({
      success: true,
      message: "Barcha jinslar ro'yxati olingan.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching genders:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: jinslarni olishda xato yuz berdi.",
    });
  }
};

// -------------------- Get Gender By ID --------------------

const getGenderById = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const item = await Gender.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: "Gender not found" });
    }
    return res.status(200).json({
      message: "Gender found",
      user: item,
      innerData: item,
      gender: item,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Update Gender --------------------

const updateGender = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const updateData = { ...req.body };
    const updatedItem = await Gender.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ message: "Gender not found" });
    }
    res.json({
      success: true,
      message: "Gender updated successfully",
      user: updatedItem,
      innerData: updatedItem,
      gender: updatedItem,
    });
  } catch (error) {
    console.error("Error updating gender:", error);
    res.status(500).json({
      success: false,
      message: "Server error: Failed to update gender",
    });
  }
};

// -------------------- Delete Gender --------------------

const deleteGender = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const deletedItem = await Gender.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "Gender not found" });
    }
    res.json({
      message: "Gender deleted successfully",
      deletedUser: deletedItem,
      deletedItem,
      innerData: deletedItem,
    });
  } catch (error) {
    console.error("Error deleting gender:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Search Gender --------------------

const searchGender = async (req, res) => {
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

    const result = await Gender.find({
      $or: orConditions,
    });
    if (result.length === 0) {
      return res.json({ message: "Bunday jins topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching genders:", error);
    res.status(500).json({ message: "Server error: Failed to fetch genders." });
  }
};

module.exports = {
  // Original names for routers
  createGender,
  getAllGenders,
  getGenderById,
  updateGender,
  deleteGender,
  searchGender,

  // Template aliases
  postRegister: createGender,
  getUsers: getAllGenders,
  getGenders: getAllGenders,
  getUserById: getGenderById,
  updateUser: updateGender,
  deleteUser: deleteGender,
  searchUser: searchGender,
};
