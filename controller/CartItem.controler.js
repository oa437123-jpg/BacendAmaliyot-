const mongoose = require("mongoose");
const { CartItem } = require("../model/CartItemScheme");

// -------------------- Create CartItem --------------------

const createCartItem = async (req, res) => {
  try {
    const itemData = { ...req.body };
    const { cart_id, ticket_id } = req.body;

    if (cart_id && mongoose.Types.ObjectId.isValid(cart_id)) {
      itemData.cart_id = cart_id;
    }

    if (ticket_id && mongoose.Types.ObjectId.isValid(ticket_id)) {
      itemData.ticket_id = ticket_id;
    }
    const newItem = new CartItem(itemData);
    await newItem.save();

    return res.status(201).json({
      success: true,
      message: "Savat elementi muvaffaqiyatli yaratildi",
      user: newItem,
      innerData: newItem,
      cartItem: newItem,
    });
  } catch (error) {
    console.error("Xato:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: savat elementi yaratish jarayonida xatolik yuz berdi",
      error: error.message,
    });
  }
};

// -------------------- Get CartItems --------------------

const getAllCartItems = async (req, res) => {
  try {
    const items = await CartItem.find({}).populate([
      { path: "cart_id" },
      { path: "ticket_id" },
    ]);
    res.json({
      success: true,
      message: "Barcha savat elementlari ro'yxati olingan.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching cartitems:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: savat elementlarini olishda xato yuz berdi.",
    });
  }
};

// -------------------- Get CartItem By ID --------------------

const getCartItemById = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const item = await CartItem.findById(itemId).populate([
      { path: "cart_id" },
      { path: "ticket_id" },
    ]);

    if (!item) {
      return res.status(404).json({ message: "CartItem not found" });
    }
    return res.status(200).json({
      message: "CartItem found",
      user: item,
      innerData: item,
      cartItem: item,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Update CartItem --------------------

const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const updateData = { ...req.body };
    const { cart_id, ticket_id } = req.body;

    if (cart_id && mongoose.Types.ObjectId.isValid(cart_id)) {
      updateData.cart_id = cart_id;
    }

    if (ticket_id && mongoose.Types.ObjectId.isValid(ticket_id)) {
      updateData.ticket_id = ticket_id;
    }
    const updatedItem = await CartItem.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate([
      { path: "cart_id" },
      { path: "ticket_id" },
    ]);

    if (!updatedItem) {
      return res.status(404).json({ message: "CartItem not found" });
    }
    res.json({
      success: true,
      message: "CartItem updated successfully",
      user: updatedItem,
      innerData: updatedItem,
      cartItem: updatedItem,
    });
  } catch (error) {
    console.error("Error updating cartitem:", error);
    res.status(500).json({
      success: false,
      message: "Server error: Failed to update cartitem",
    });
  }
};

// -------------------- Delete CartItem --------------------

const deleteCartItem = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const deletedItem = await CartItem.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "CartItem not found" });
    }
    res.json({
      message: "CartItem deleted successfully",
      deletedUser: deletedItem,
      deletedItem,
      innerData: deletedItem,
    });
  } catch (error) {
    console.error("Error deleting cartitem:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Search CartItem --------------------

const searchCartItem = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    let filter = {};
    if (mongoose.Types.ObjectId.isValid(query)) {
      filter = {
        $or: [
          { _id: query },
          { cart_id: query },
          { ticket_id: query },
        ],
      };
    } else {
      return res.status(400).json({ message: "Noto'g'ri qidiruv so'rovi (ID kutilmoqda)." });
    }

    const result = await CartItem.find(filter).populate([
      { path: "cart_id" },
      { path: "ticket_id" },
    ]);
    if (result.length === 0) {
      return res.json({ message: "Bunday savat elementi topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching cartitems:", error);
    res.status(500).json({ message: "Server error: Failed to fetch cartitems." });
  }
};

module.exports = {
  // Original names for routers
  createCartItem,
  getAllCartItems,
  getCartItemById,
  updateCartItem,
  deleteCartItem,
  searchCartItem,

  // Template aliases
  postRegister: createCartItem,
  getUsers: getAllCartItems,
  getCartItems: getAllCartItems,
  getUserById: getCartItemById,
  updateUser: updateCartItem,
  deleteUser: deleteCartItem,
  searchUser: searchCartItem,
};
