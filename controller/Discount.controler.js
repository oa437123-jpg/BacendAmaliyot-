const mongoose = require("mongoose");
const { Discount } = require("../model/DiscountScheme");

// -------------------- Create Discount --------------------

const createDiscount = async (req, res) => {
  try {
    const itemData = { ...req.body };
    const newItem = new Discount(itemData);
    await newItem.save();

    return res.status(201).json({
      success: true,
      message: "Chegirma muvaffaqiyatli yaratildi",
      user: newItem,
      innerData: newItem,
      discount: newItem,
    });
  } catch (error) {
    console.error("Xato:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: chegirma yaratish jarayonida xatolik yuz berdi",
      error: error.message,
    });
  }
};

// -------------------- Get Discounts --------------------

const getAllDiscounts = async (req, res) => {
  try {
    const items = await Discount.find({});
    res.json({
      success: true,
      message: "Barcha chegirmalar ro'yxati olingan.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching discounts:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: chegirmalarni olishda xato yuz berdi.",
    });
  }
};

// -------------------- Get Discount By ID --------------------

const getDiscountById = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const item = await Discount.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: "Discount not found" });
    }
    return res.status(200).json({
      message: "Discount found",
      user: item,
      innerData: item,
      discount: item,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Update Discount --------------------

const updateDiscount = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const updateData = { ...req.body };
    const updatedItem = await Discount.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ message: "Discount not found" });
    }
    res.json({
      success: true,
      message: "Discount updated successfully",
      user: updatedItem,
      innerData: updatedItem,
      discount: updatedItem,
    });
  } catch (error) {
    console.error("Error updating discount:", error);
    res.status(500).json({
      success: false,
      message: "Server error: Failed to update discount",
    });
  }
};

// -------------------- Delete Discount --------------------

const deleteDiscount = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const deletedItem = await Discount.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "Discount not found" });
    }
    res.json({
      message: "Discount deleted successfully",
      deletedUser: deletedItem,
      deletedItem,
      innerData: deletedItem,
    });
  } catch (error) {
    console.error("Error deleting discount:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Search Discount --------------------

const searchDiscount = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const orConditions = [
        { discount: { $regex: query, $options: "i" } },
    ];

    if (mongoose.Types.ObjectId.isValid(query)) {
      orConditions.push({ _id: query });
    }

    const result = await Discount.find({
      $or: orConditions,
    });
    if (result.length === 0) {
      return res.json({ message: "Bunday chegirma topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching discounts:", error);
    res.status(500).json({ message: "Server error: Failed to fetch discounts." });
  }
};

module.exports = {
  // Original names for routers
  createDiscount,
  getAllDiscounts,
  getDiscountById,
  updateDiscount,
  deleteDiscount,
  searchDiscount,

  // Template aliases
  postRegister: createDiscount,
  getUsers: getAllDiscounts,
  getDiscounts: getAllDiscounts,
  getUserById: getDiscountById,
  updateUser: updateDiscount,
  deleteUser: deleteDiscount,
  searchUser: searchDiscount,
};
