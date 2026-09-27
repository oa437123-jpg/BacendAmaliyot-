const mongoose = require("mongoose");
const { Ticket } = require("../model/TicketScheme");

// -------------------- Create Ticket --------------------

const createTicket = async (req, res) => {
  try {
    const itemData = { ...req.body };
    const { event_id, seat_id, status_id, ticket_type_id } = req.body;

    if (event_id && mongoose.Types.ObjectId.isValid(event_id)) {
      itemData.event_id = event_id;
    }

    if (seat_id && mongoose.Types.ObjectId.isValid(seat_id)) {
      itemData.seat_id = seat_id;
    }

    if (status_id && mongoose.Types.ObjectId.isValid(status_id)) {
      itemData.status_id = status_id;
    }

    if (ticket_type_id && mongoose.Types.ObjectId.isValid(ticket_type_id)) {
      itemData.ticket_type_id = ticket_type_id;
    }
    const newItem = new Ticket(itemData);
    await newItem.save();

    return res.status(201).json({
      success: true,
      message: "Chipta muvaffaqiyatli yaratildi",
      user: newItem,
      innerData: newItem,
      ticket: newItem,
    });
  } catch (error) {
    console.error("Xato:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: chipta yaratish jarayonida xatolik yuz berdi",
      error: error.message,
    });
  }
};

// -------------------- Get Tickets --------------------

const getAllTickets = async (req, res) => {
  try {
    const items = await Ticket.find({}).populate([
      { path: "event_id" },
      { path: "seat_id" },
      { path: "status_id" },
      { path: "ticket_type_id" },
    ]);
    res.json({
      success: true,
      message: "Barcha chiptalar ro'yxati olingan.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: chiptalarni olishda xato yuz berdi.",
    });
  }
};

// -------------------- Get Ticket By ID --------------------

const getTicketById = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const item = await Ticket.findById(itemId).populate([
      { path: "event_id" },
      { path: "seat_id" },
      { path: "status_id" },
      { path: "ticket_type_id" },
    ]);

    if (!item) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    return res.status(200).json({
      message: "Ticket found",
      user: item,
      innerData: item,
      ticket: item,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Update Ticket --------------------

const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const updateData = { ...req.body };
    const { event_id, seat_id, status_id, ticket_type_id } = req.body;

    if (event_id && mongoose.Types.ObjectId.isValid(event_id)) {
      updateData.event_id = event_id;
    }

    if (seat_id && mongoose.Types.ObjectId.isValid(seat_id)) {
      updateData.seat_id = seat_id;
    }

    if (status_id && mongoose.Types.ObjectId.isValid(status_id)) {
      updateData.status_id = status_id;
    }

    if (ticket_type_id && mongoose.Types.ObjectId.isValid(ticket_type_id)) {
      updateData.ticket_type_id = ticket_type_id;
    }
    const updatedItem = await Ticket.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate([
      { path: "event_id" },
      { path: "seat_id" },
      { path: "status_id" },
      { path: "ticket_type_id" },
    ]);

    if (!updatedItem) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.json({
      success: true,
      message: "Ticket updated successfully",
      user: updatedItem,
      innerData: updatedItem,
      ticket: updatedItem,
    });
  } catch (error) {
    console.error("Error updating ticket:", error);
    res.status(500).json({
      success: false,
      message: "Server error: Failed to update ticket",
    });
  }
};

// -------------------- Delete Ticket --------------------

const deleteTicket = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const deletedItem = await Ticket.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.json({
      message: "Ticket deleted successfully",
      deletedUser: deletedItem,
      deletedItem,
      innerData: deletedItem,
    });
  } catch (error) {
    console.error("Error deleting ticket:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Search Ticket --------------------

const searchTicket = async (req, res) => {
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
          { event_id: query },
          { seat_id: query },
          { status_id: query },
          { ticket_type_id: query },
        ],
      };
    } else {
      return res.status(400).json({ message: "Noto'g'ri qidiruv so'rovi (ID kutilmoqda)." });
    }

    const result = await Ticket.find(filter).populate([
      { path: "event_id" },
      { path: "seat_id" },
      { path: "status_id" },
      { path: "ticket_type_id" },
    ]);
    if (result.length === 0) {
      return res.json({ message: "Bunday chipta topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ message: "Server error: Failed to fetch tickets." });
  }
};

module.exports = {
  // Original names for routers
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
  searchTicket,

  // Template aliases
  postRegister: createTicket,
  getUsers: getAllTickets,
  getTickets: getAllTickets,
  getUserById: getTicketById,
  updateUser: updateTicket,
  deleteUser: deleteTicket,
  searchUser: searchTicket,
};
