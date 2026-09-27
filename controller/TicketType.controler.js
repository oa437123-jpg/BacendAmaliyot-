const mongoose = require("mongoose");
const { TicketType } = require("../model/TicketTypeScheme");

// -------------------- Create TicketType --------------------

const createTicketType = async (req, res) => {
  try {
    const { name } = req.body;
    const existingItem = await TicketType.findOne({ name });
    if (existingItem) {
      return res.status(400).json({
        message: "Bu chipta turi allaqachon mavjud.",
      });
    }
    const itemData = { ...req.body };
    const newItem = new TicketType(itemData);
    await newItem.save();

    return res.status(201).json({
      success: true,
      message: "Chipta turi muvaffaqiyatli yaratildi",
      user: newItem,
      innerData: newItem,
      ticketType: newItem,
    });
  } catch (error) {
    console.error("Xato:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: chipta turi yaratish jarayonida xatolik yuz berdi",
      error: error.message,
    });
  }
};

// -------------------- Get TicketTypes --------------------

const getAllTicketTypes = async (req, res) => {
  try {
    const items = await TicketType.find({});
    res.json({
      success: true,
      message: "Barcha chipta turlari ro'yxati olingan.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching tickettypes:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: chipta turlarini olishda xato yuz berdi.",
    });
  }
};

// -------------------- Get TicketType By ID --------------------

const getTicketTypeById = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const item = await TicketType.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: "TicketType not found" });
    }
    return res.status(200).json({
      message: "TicketType found",
      user: item,
      innerData: item,
      ticketType: item,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Update TicketType --------------------

const updateTicketType = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const updateData = { ...req.body };
    const updatedItem = await TicketType.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ message: "TicketType not found" });
    }
    res.json({
      success: true,
      message: "TicketType updated successfully",
      user: updatedItem,
      innerData: updatedItem,
      ticketType: updatedItem,
    });
  } catch (error) {
    console.error("Error updating tickettype:", error);
    res.status(500).json({
      success: false,
      message: "Server error: Failed to update tickettype",
    });
  }
};

// -------------------- Delete TicketType --------------------

const deleteTicketType = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const deletedItem = await TicketType.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "TicketType not found" });
    }
    res.json({
      message: "TicketType deleted successfully",
      deletedUser: deletedItem,
      deletedItem,
      innerData: deletedItem,
    });
  } catch (error) {
    console.error("Error deleting tickettype:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Search TicketType --------------------

const searchTicketType = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const orConditions = [
        { ticket_type: { $regex: query, $options: "i" } },
        { name: { $regex: query, $options: "i" } },
        { color: { $regex: query, $options: "i" } },
    ];

    if (mongoose.Types.ObjectId.isValid(query)) {
      orConditions.push({ _id: query });
    }

    const result = await TicketType.find({
      $or: orConditions,
    });
    if (result.length === 0) {
      return res.json({ message: "Bunday chipta turi topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching tickettypes:", error);
    res.status(500).json({ message: "Server error: Failed to fetch tickettypes." });
  }
};

module.exports = {
  // Original names for routers
  createTicketType,
  getAllTicketTypes,
  getTicketTypeById,
  updateTicketType,
  deleteTicketType,
  searchTicketType,

  // Template aliases
  postRegister: createTicketType,
  getUsers: getAllTicketTypes,
  getTicketTypes: getAllTicketTypes,
  getUserById: getTicketTypeById,
  updateUser: updateTicketType,
  deleteUser: deleteTicketType,
  searchUser: searchTicketType,
};
