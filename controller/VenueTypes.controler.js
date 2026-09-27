const mongoose = require("mongoose");
const { VenueTypes } = require("../model/VenueTypesScheme");

// -------------------- Create VenueTypes --------------------

const createVenueTypes = async (req, res) => {
  try {
    const itemData = { ...req.body };
    const { venue_id, type_id } = req.body;

    if (venue_id && mongoose.Types.ObjectId.isValid(venue_id)) {
      itemData.venue_id = venue_id;
    }

    if (type_id && mongoose.Types.ObjectId.isValid(type_id)) {
      itemData.type_id = type_id;
    }
    const newItem = new VenueTypes(itemData);
    await newItem.save();

    return res.status(201).json({
      success: true,
      message: "Venue turi muvaffaqiyatli yaratildi",
      user: newItem,
      innerData: newItem,
      venueTypes: newItem,
    });
  } catch (error) {
    console.error("Xato:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: venue turi yaratish jarayonida xatolik yuz berdi",
      error: error.message,
    });
  }
};

// -------------------- Get VenueTypes --------------------

const getAllVenueTypes = async (req, res) => {
  try {
    const items = await VenueTypes.find({}).populate([
      { path: "venue_id" },
      { path: "type_id" },
    ]);
    res.json({
      success: true,
      message: "Barcha venue turlari ro'yxati olingan.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching venuetypes:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: venue turlarini olishda xato yuz berdi.",
    });
  }
};

// -------------------- Get VenueTypes By ID --------------------

const getVenueTypesById = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const item = await VenueTypes.findById(itemId).populate([
      { path: "venue_id" },
      { path: "type_id" },
    ]);

    if (!item) {
      return res.status(404).json({ message: "VenueTypes not found" });
    }
    return res.status(200).json({
      message: "VenueTypes found",
      user: item,
      innerData: item,
      venueTypes: item,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Update VenueTypes --------------------

const updateVenueTypes = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const updateData = { ...req.body };
    const { venue_id, type_id } = req.body;

    if (venue_id && mongoose.Types.ObjectId.isValid(venue_id)) {
      updateData.venue_id = venue_id;
    }

    if (type_id && mongoose.Types.ObjectId.isValid(type_id)) {
      updateData.type_id = type_id;
    }
    const updatedItem = await VenueTypes.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate([
      { path: "venue_id" },
      { path: "type_id" },
    ]);

    if (!updatedItem) {
      return res.status(404).json({ message: "VenueTypes not found" });
    }
    res.json({
      success: true,
      message: "VenueTypes updated successfully",
      user: updatedItem,
      innerData: updatedItem,
      venueTypes: updatedItem,
    });
  } catch (error) {
    console.error("Error updating venuetypes:", error);
    res.status(500).json({
      success: false,
      message: "Server error: Failed to update venuetypes",
    });
  }
};

// -------------------- Delete VenueTypes --------------------

const deleteVenueTypes = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const deletedItem = await VenueTypes.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "VenueTypes not found" });
    }
    res.json({
      message: "VenueTypes deleted successfully",
      deletedUser: deletedItem,
      deletedItem,
      innerData: deletedItem,
    });
  } catch (error) {
    console.error("Error deleting venuetypes:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Search VenueTypes --------------------

const searchVenueTypes = async (req, res) => {
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
          { venue_id: query },
          { type_id: query },
        ],
      };
    } else {
      return res.status(400).json({ message: "Noto'g'ri qidiruv so'rovi (ID kutilmoqda)." });
    }

    const result = await VenueTypes.find(filter).populate([
      { path: "venue_id" },
      { path: "type_id" },
    ]);
    if (result.length === 0) {
      return res.json({ message: "Bunday venue turi topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching venuetypes:", error);
    res.status(500).json({ message: "Server error: Failed to fetch venuetypes." });
  }
};

module.exports = {
  // Original names for routers
  createVenueTypes,
  getAllVenueTypes,
  getVenueTypesById,
  updateVenueTypes,
  deleteVenueTypes,
  searchVenueTypes,

  // Template aliases
  postRegister: createVenueTypes,
  getUsers: getAllVenueTypes,
  getVenueTypes: getAllVenueTypes,
  getUserById: getVenueTypesById,
  updateUser: updateVenueTypes,
  deleteUser: deleteVenueTypes,
  searchUser: searchVenueTypes,
};
