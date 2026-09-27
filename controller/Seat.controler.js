const mongoose = require("mongoose");
const { Seat } = require("../model/SeatScheme");

// -------------------- Create Seat --------------------

const createSeat = async (req, res) => {
  try {
    const itemData = { ...req.body };
    const { sector_id, venue_id, seat_type_id } = req.body;

    if (sector_id && mongoose.Types.ObjectId.isValid(sector_id)) {
      itemData.sector_id = sector_id;
    }

    if (venue_id && mongoose.Types.ObjectId.isValid(venue_id)) {
      itemData.venue_id = venue_id;
    }

    if (seat_type_id && mongoose.Types.ObjectId.isValid(seat_type_id)) {
      itemData.seat_type_id = seat_type_id;
    }
    const newItem = new Seat(itemData);
    await newItem.save();

    return res.status(201).json({
      success: true,
      message: "Joy muvaffaqiyatli yaratildi",
      user: newItem,
      innerData: newItem,
      seat: newItem,
    });
  } catch (error) {
    console.error("Xato:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: joy yaratish jarayonida xatolik yuz berdi",
      error: error.message,
    });
  }
};

// -------------------- Get Seats --------------------

const getAllSeats = async (req, res) => {
  try {
    const items = await Seat.find({}).populate([
      { path: "sector_id" },
      { path: "venue_id" },
      { path: "seat_type_id" },
    ]);
    res.json({
      success: true,
      message: "Barcha joylar ro'yxati olingan.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching seats:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: joylarni olishda xato yuz berdi.",
    });
  }
};

// -------------------- Get Seat By ID --------------------

const getSeatById = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const item = await Seat.findById(itemId).populate([
      { path: "sector_id" },
      { path: "venue_id" },
      { path: "seat_type_id" },
    ]);

    if (!item) {
      return res.status(404).json({ message: "Seat not found" });
    }
    return res.status(200).json({
      message: "Seat found",
      user: item,
      innerData: item,
      seat: item,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Update Seat --------------------

const updateSeat = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const updateData = { ...req.body };
    const { sector_id, venue_id, seat_type_id } = req.body;

    if (sector_id && mongoose.Types.ObjectId.isValid(sector_id)) {
      updateData.sector_id = sector_id;
    }

    if (venue_id && mongoose.Types.ObjectId.isValid(venue_id)) {
      updateData.venue_id = venue_id;
    }

    if (seat_type_id && mongoose.Types.ObjectId.isValid(seat_type_id)) {
      updateData.seat_type_id = seat_type_id;
    }
    const updatedItem = await Seat.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate([
      { path: "sector_id" },
      { path: "venue_id" },
      { path: "seat_type_id" },
    ]);

    if (!updatedItem) {
      return res.status(404).json({ message: "Seat not found" });
    }
    res.json({
      success: true,
      message: "Seat updated successfully",
      user: updatedItem,
      innerData: updatedItem,
      seat: updatedItem,
    });
  } catch (error) {
    console.error("Error updating seat:", error);
    res.status(500).json({
      success: false,
      message: "Server error: Failed to update seat",
    });
  }
};

// -------------------- Delete Seat --------------------

const deleteSeat = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const deletedItem = await Seat.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "Seat not found" });
    }
    res.json({
      message: "Seat deleted successfully",
      deletedUser: deletedItem,
      deletedItem,
      innerData: deletedItem,
    });
  } catch (error) {
    console.error("Error deleting seat:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Search Seat --------------------

const searchSeat = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const orConditions = [
        { location_in_schema: { $regex: query, $options: "i" } },
    ];

    if (mongoose.Types.ObjectId.isValid(query)) {
      orConditions.push({ _id: query });
    }

    const result = await Seat.find({
      $or: orConditions,
    }).populate([
      { path: "sector_id" },
      { path: "venue_id" },
      { path: "seat_type_id" },
    ]);
    if (result.length === 0) {
      return res.json({ message: "Bunday joy topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching seats:", error);
    res.status(500).json({ message: "Server error: Failed to fetch seats." });
  }
};

module.exports = {
  // Original names for routers
  createSeat,
  getAllSeats,
  getSeatById,
  updateSeat,
  deleteSeat,
  searchSeat,

  // Template aliases
  postRegister: createSeat,
  getUsers: getAllSeats,
  getSeats: getAllSeats,
  getUserById: getSeatById,
  updateUser: updateSeat,
  deleteUser: deleteSeat,
  searchUser: searchSeat,
};
