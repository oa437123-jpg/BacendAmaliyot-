const mongoose = require("mongoose");
const { TicketStatus } = require("../model/TicketStatusScheme");

// -------------------- Create TicketStatus --------------------

const createTicketStatus = async (req, res) => {
  try {
    const { name } = req.body;
    const existingItem = await TicketStatus.findOne({ name });
    if (existingItem) {
      return res.status(400).json({
        message: "Bu chipta holati allaqachon mavjud.",
      });
    }
    const itemData = { ...req.body };
    const newItem = new TicketStatus(itemData);
    await newItem.save();

    return res.status(201).json({
      success: true,
      message: "Chipta holati muvaffaqiyatli yaratildi",
      user: newItem,
      innerData: newItem,
      ticketStatus: newItem,
    });
  } catch (error) {
    console.error("Xato:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: chipta holati yaratish jarayonida xatolik yuz berdi",
      error: error.message,
    });
  }
};

// -------------------- Get TicketStatuses --------------------

const getAllTicketStatuses = async (req, res) => {
  try {
    const items = await TicketStatus.find({});
    res.json({
      success: true,
      message: "Barcha chipta holatlari ro'yxati olingan.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching ticketstatuses:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: chipta holatlarini olishda xato yuz berdi.",
    });
  }
};

// -------------------- Get TicketStatus By ID --------------------

const getTicketStatusById = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const item = await TicketStatus.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: "TicketStatus not found" });
    }
    return res.status(200).json({
      message: "TicketStatus found",
      user: item,
      innerData: item,
      ticketStatus: item,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Update TicketStatus --------------------

const updateTicketStatus = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const updateData = { ...req.body };
    const updatedItem = await TicketStatus.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ message: "TicketStatus not found" });
    }
    res.json({
      success: true,
      message: "TicketStatus updated successfully",
      user: updatedItem,
      innerData: updatedItem,
      ticketStatus: updatedItem,
    });
  } catch (error) {
    console.error("Error updating ticketstatus:", error);
    res.status(500).json({
      success: false,
      message: "Server error: Failed to update ticketstatus",
    });
  }
};

// -------------------- Delete TicketStatus --------------------

const deleteTicketStatus = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const deletedItem = await TicketStatus.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "TicketStatus not found" });
    }
    res.json({
      message: "TicketStatus deleted successfully",
      deletedUser: deletedItem,
      deletedItem,
      innerData: deletedItem,
    });
  } catch (error) {
    console.error("Error deleting ticketstatus:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Search TicketStatus --------------------

const searchTicketStatus = async (req, res) => {
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

    const result = await TicketStatus.find({
      $or: orConditions,
    });
    if (result.length === 0) {
      return res.json({ message: "Bunday chipta holati topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching ticketstatuses:", error);
    res.status(500).json({ message: "Server error: Failed to fetch ticketstatuses." });
  }
};

module.exports = {
  // Original names for routers
  createTicketStatus,
  getAllTicketStatuses,
  getTicketStatusById,
  updateTicketStatus,
  deleteTicketStatus,
  searchTicketStatus,

  // Template aliases
  postRegister: createTicketStatus,
  getUsers: getAllTicketStatuses,
  getTicketStatuses: getAllTicketStatuses,
  getUserById: getTicketStatusById,
  updateUser: updateTicketStatus,
  deleteUser: deleteTicketStatus,
  searchUser: searchTicketStatus,
};
