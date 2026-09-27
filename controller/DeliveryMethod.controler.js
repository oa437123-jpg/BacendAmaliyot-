const mongoose = require("mongoose");
const { DeliveryMethod } = require("../model/DeliveryMethodScheme");

// -------------------- Create DeliveryMethod --------------------

const createDeliveryMethod = async (req, res) => {
  try {
    const { name } = req.body;
    const existingItem = await DeliveryMethod.findOne({ name });
    if (existingItem) {
      return res.status(400).json({
        message: "Bu yetkazib berish usuli allaqachon mavjud.",
      });
    }
    const itemData = { ...req.body };
    const newItem = new DeliveryMethod(itemData);
    await newItem.save();

    return res.status(201).json({
      success: true,
      message: "Yetkazib berish usuli muvaffaqiyatli yaratildi",
      user: newItem,
      innerData: newItem,
      deliveryMethod: newItem,
    });
  } catch (error) {
    console.error("Xato:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: yetkazib berish usuli yaratish jarayonida xatolik yuz berdi",
      error: error.message,
    });
  }
};

// -------------------- Get DeliveryMethods --------------------

const getAllDeliveryMethods = async (req, res) => {
  try {
    const items = await DeliveryMethod.find({});
    res.json({
      success: true,
      message: "Barcha yetkazib berish usullari ro'yxati olingan.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching deliverymethods:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: yetkazib berish usullarini olishda xato yuz berdi.",
    });
  }
};

// -------------------- Get DeliveryMethod By ID --------------------

const getDeliveryMethodById = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const item = await DeliveryMethod.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: "DeliveryMethod not found" });
    }
    return res.status(200).json({
      message: "DeliveryMethod found",
      user: item,
      innerData: item,
      deliveryMethod: item,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Update DeliveryMethod --------------------

const updateDeliveryMethod = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const updateData = { ...req.body };
    const updatedItem = await DeliveryMethod.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ message: "DeliveryMethod not found" });
    }
    res.json({
      success: true,
      message: "DeliveryMethod updated successfully",
      user: updatedItem,
      innerData: updatedItem,
      deliveryMethod: updatedItem,
    });
  } catch (error) {
    console.error("Error updating deliverymethod:", error);
    res.status(500).json({
      success: false,
      message: "Server error: Failed to update deliverymethod",
    });
  }
};

// -------------------- Delete DeliveryMethod --------------------

const deleteDeliveryMethod = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const deletedItem = await DeliveryMethod.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "DeliveryMethod not found" });
    }
    res.json({
      message: "DeliveryMethod deleted successfully",
      deletedUser: deletedItem,
      deletedItem,
      innerData: deletedItem,
    });
  } catch (error) {
    console.error("Error deleting deliverymethod:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Search DeliveryMethod --------------------

const searchDeliveryMethod = async (req, res) => {
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

    const result = await DeliveryMethod.find({
      $or: orConditions,
    });
    if (result.length === 0) {
      return res.json({ message: "Bunday yetkazib berish usuli topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching deliverymethods:", error);
    res.status(500).json({ message: "Server error: Failed to fetch deliverymethods." });
  }
};

module.exports = {
  // Original names for routers
  createDeliveryMethod,
  getAllDeliveryMethods,
  getDeliveryMethodById,
  updateDeliveryMethod,
  deleteDeliveryMethod,
  searchDeliveryMethod,

  // Template aliases
  postRegister: createDeliveryMethod,
  getUsers: getAllDeliveryMethods,
  getDeliveryMethods: getAllDeliveryMethods,
  getUserById: getDeliveryMethodById,
  updateUser: updateDeliveryMethod,
  deleteUser: deleteDeliveryMethod,
  searchUser: searchDeliveryMethod,
};
