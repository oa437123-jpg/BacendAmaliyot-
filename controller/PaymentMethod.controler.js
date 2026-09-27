const mongoose = require("mongoose");
const { PaymentMethod } = require("../model/PaymentMethodScheme");

// -------------------- Create PaymentMethod --------------------

const createPaymentMethod = async (req, res) => {
  try {
    const { name } = req.body;
    const existingItem = await PaymentMethod.findOne({ name });
    if (existingItem) {
      return res.status(400).json({
        message: "Bu to'lov usuli allaqachon mavjud.",
      });
    }
    const itemData = { ...req.body };
    const newItem = new PaymentMethod(itemData);
    await newItem.save();

    return res.status(201).json({
      success: true,
      message: "To'lov usuli muvaffaqiyatli yaratildi",
      user: newItem,
      innerData: newItem,
      paymentMethod: newItem,
    });
  } catch (error) {
    console.error("Xato:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: to'lov usuli yaratish jarayonida xatolik yuz berdi",
      error: error.message,
    });
  }
};

// -------------------- Get PaymentMethods --------------------

const getAllPaymentMethods = async (req, res) => {
  try {
    const items = await PaymentMethod.find({});
    res.json({
      success: true,
      message: "Barcha to'lov usullari ro'yxati olingan.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching paymentmethods:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: to'lov usullarini olishda xato yuz berdi.",
    });
  }
};

// -------------------- Get PaymentMethod By ID --------------------

const getPaymentMethodById = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const item = await PaymentMethod.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: "PaymentMethod not found" });
    }
    return res.status(200).json({
      message: "PaymentMethod found",
      user: item,
      innerData: item,
      paymentMethod: item,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Update PaymentMethod --------------------

const updatePaymentMethod = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const updateData = { ...req.body };
    const updatedItem = await PaymentMethod.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ message: "PaymentMethod not found" });
    }
    res.json({
      success: true,
      message: "PaymentMethod updated successfully",
      user: updatedItem,
      innerData: updatedItem,
      paymentMethod: updatedItem,
    });
  } catch (error) {
    console.error("Error updating paymentmethod:", error);
    res.status(500).json({
      success: false,
      message: "Server error: Failed to update paymentmethod",
    });
  }
};

// -------------------- Delete PaymentMethod --------------------

const deletePaymentMethod = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const deletedItem = await PaymentMethod.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "PaymentMethod not found" });
    }
    res.json({
      message: "PaymentMethod deleted successfully",
      deletedUser: deletedItem,
      deletedItem,
      innerData: deletedItem,
    });
  } catch (error) {
    console.error("Error deleting paymentmethod:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Search PaymentMethod --------------------

const searchPaymentMethod = async (req, res) => {
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

    const result = await PaymentMethod.find({
      $or: orConditions,
    });
    if (result.length === 0) {
      return res.json({ message: "Bunday to'lov usuli topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching paymentmethods:", error);
    res.status(500).json({ message: "Server error: Failed to fetch paymentmethods." });
  }
};

module.exports = {
  // Original names for routers
  createPaymentMethod,
  getAllPaymentMethods,
  getPaymentMethodById,
  updatePaymentMethod,
  deletePaymentMethod,
  searchPaymentMethod,

  // Template aliases
  postRegister: createPaymentMethod,
  getUsers: getAllPaymentMethods,
  getPaymentMethods: getAllPaymentMethods,
  getUserById: getPaymentMethodById,
  updateUser: updatePaymentMethod,
  deleteUser: deletePaymentMethod,
  searchUser: searchPaymentMethod,
};
