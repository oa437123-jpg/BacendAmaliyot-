const mongoose = require("mongoose");
const { CustomerCard } = require("../model/CustomerCardScheme");

// -------------------- Create CustomerCard --------------------

const createCustomerCard = async (req, res) => {
  try {
    const itemData = { ...req.body };
    const { customer_id } = req.body;

    if (customer_id && mongoose.Types.ObjectId.isValid(customer_id)) {
      itemData.customer_id = customer_id;
    }
    const newItem = new CustomerCard(itemData);
    await newItem.save();

    return res.status(201).json({
      success: true,
      message: "Mijoz kartasi muvaffaqiyatli yaratildi",
      user: newItem,
      innerData: newItem,
      customerCard: newItem,
    });
  } catch (error) {
    console.error("Xato:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: mijoz kartasi yaratish jarayonida xatolik yuz berdi",
      error: error.message,
    });
  }
};

// -------------------- Get CustomerCards --------------------

const getAllCustomerCards = async (req, res) => {
  try {
    const items = await CustomerCard.find({}).populate([
      { path: "customer_id" },
    ]);
    res.json({
      success: true,
      message: "Barcha mijoz kartalari ro'yxati olingan.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching customercards:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: mijoz kartalarini olishda xato yuz berdi.",
    });
  }
};

// -------------------- Get CustomerCard By ID --------------------

const getCustomerCardById = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const item = await CustomerCard.findById(itemId).populate([
      { path: "customer_id" },
    ]);

    if (!item) {
      return res.status(404).json({ message: "CustomerCard not found" });
    }
    return res.status(200).json({
      message: "CustomerCard found",
      user: item,
      innerData: item,
      customerCard: item,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Update CustomerCard --------------------

const updateCustomerCard = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const updateData = { ...req.body };
    const { customer_id } = req.body;

    if (customer_id && mongoose.Types.ObjectId.isValid(customer_id)) {
      updateData.customer_id = customer_id;
    }
    const updatedItem = await CustomerCard.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate([
      { path: "customer_id" },
    ]);

    if (!updatedItem) {
      return res.status(404).json({ message: "CustomerCard not found" });
    }
    res.json({
      success: true,
      message: "CustomerCard updated successfully",
      user: updatedItem,
      innerData: updatedItem,
      customerCard: updatedItem,
    });
  } catch (error) {
    console.error("Error updating customercard:", error);
    res.status(500).json({
      success: false,
      message: "Server error: Failed to update customercard",
    });
  }
};

// -------------------- Delete CustomerCard --------------------

const deleteCustomerCard = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const deletedItem = await CustomerCard.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "CustomerCard not found" });
    }
    res.json({
      message: "CustomerCard deleted successfully",
      deletedUser: deletedItem,
      deletedItem,
      innerData: deletedItem,
    });
  } catch (error) {
    console.error("Error deleting customercard:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Search CustomerCard --------------------

const searchCustomerCard = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const orConditions = [
        { name: { $regex: query, $options: "i" } },
        { phone: { $regex: query, $options: "i" } },
        { number: { $regex: query, $options: "i" } },
    ];

    if (mongoose.Types.ObjectId.isValid(query)) {
      orConditions.push({ _id: query });
    }

    const result = await CustomerCard.find({
      $or: orConditions,
    }).populate([
      { path: "customer_id" },
    ]);
    if (result.length === 0) {
      return res.json({ message: "Bunday mijoz kartasi topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching customercards:", error);
    res.status(500).json({ message: "Server error: Failed to fetch customercards." });
  }
};

module.exports = {
  // Original names for routers
  createCustomerCard,
  getAllCustomerCards,
  getCustomerCardById,
  updateCustomerCard,
  deleteCustomerCard,
  searchCustomerCard,

  // Template aliases
  postRegister: createCustomerCard,
  getUsers: getAllCustomerCards,
  getCustomerCards: getAllCustomerCards,
  getUserById: getCustomerCardById,
  updateUser: updateCustomerCard,
  deleteUser: deleteCustomerCard,
  searchUser: searchCustomerCard,
};
