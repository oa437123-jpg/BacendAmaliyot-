const mongoose = require("mongoose");
const { Cart } = require("../model/CartScheme");

// -------------------- Create Cart --------------------

const createCart = async (req, res) => {
  try {
    const itemData = { ...req.body };
    const { customer_id, status_id } = req.body;

    if (customer_id && mongoose.Types.ObjectId.isValid(customer_id)) {
      itemData.customer_id = customer_id;
    }

    if (status_id && mongoose.Types.ObjectId.isValid(status_id)) {
      itemData.status_id = status_id;
    }
    const newItem = new Cart(itemData);
    await newItem.save();

    return res.status(201).json({
      success: true,
      message: "Savat muvaffaqiyatli yaratildi",
      user: newItem,
      innerData: newItem,
      cart: newItem,
    });
  } catch (error) {
    console.error("Xato:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: savat yaratish jarayonida xatolik yuz berdi",
      error: error.message,
    });
  }
};

// -------------------- Get Carts --------------------

const getAllCarts = async (req, res) => {
  try {
    const items = await Cart.find({}).populate([
      { path: "customer_id" },
      { path: "status_id" },
    ]);
    res.json({
      success: true,
      message: "Barcha savatlar ro'yxati olingan.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching carts:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: savatlarni olishda xato yuz berdi.",
    });
  }
};

// -------------------- Get Cart By ID --------------------

const getCartById = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const item = await Cart.findById(itemId).populate([
      { path: "customer_id" },
      { path: "status_id" },
    ]);

    if (!item) {
      return res.status(404).json({ message: "Cart not found" });
    }
    return res.status(200).json({
      message: "Cart found",
      user: item,
      innerData: item,
      cart: item,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Update Cart --------------------

const updateCart = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const updateData = { ...req.body };
    const { customer_id, status_id } = req.body;

    if (customer_id && mongoose.Types.ObjectId.isValid(customer_id)) {
      updateData.customer_id = customer_id;
    }

    if (status_id && mongoose.Types.ObjectId.isValid(status_id)) {
      updateData.status_id = status_id;
    }
    const updatedItem = await Cart.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate([
      { path: "customer_id" },
      { path: "status_id" },
    ]);

    if (!updatedItem) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json({
      success: true,
      message: "Cart updated successfully",
      user: updatedItem,
      innerData: updatedItem,
      cart: updatedItem,
    });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({
      success: false,
      message: "Server error: Failed to update cart",
    });
  }
};

// -------------------- Delete Cart --------------------

const deleteCart = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const deletedItem = await Cart.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json({
      message: "Cart deleted successfully",
      deletedUser: deletedItem,
      deletedItem,
      innerData: deletedItem,
    });
  } catch (error) {
    console.error("Error deleting cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Search Cart --------------------

const searchCart = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const orConditions = [
        { createdAt: { $regex: query, $options: "i" } },
        { finishedAt: { $regex: query, $options: "i" } },
    ];

    if (mongoose.Types.ObjectId.isValid(query)) {
      orConditions.push({ _id: query });
    }

    const result = await Cart.find({
      $or: orConditions,
    }).populate([
      { path: "customer_id" },
      { path: "status_id" },
    ]);
    if (result.length === 0) {
      return res.json({ message: "Bunday savat topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching carts:", error);
    res.status(500).json({ message: "Server error: Failed to fetch carts." });
  }
};

module.exports = {
  // Original names for routers
  createCart,
  getAllCarts,
  getCartById,
  updateCart,
  deleteCart,
  searchCart,

  // Template aliases
  postRegister: createCart,
  getUsers: getAllCarts,
  getCarts: getAllCarts,
  getUserById: getCartById,
  updateUser: updateCart,
  deleteUser: deleteCart,
  searchUser: searchCart,
};
