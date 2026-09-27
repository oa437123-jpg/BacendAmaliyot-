const mongoose = require("mongoose");
const { Venue } = require("../model/VenueScheme");

// -------------------- Create Venue --------------------

const createVenue = async (req, res) => {
  try {
    const itemData = { ...req.body };
    const { region_id, district_id } = req.body;

    if (region_id && mongoose.Types.ObjectId.isValid(region_id)) {
      itemData.region_id = region_id;
    }

    if (district_id && mongoose.Types.ObjectId.isValid(district_id)) {
      itemData.district_id = district_id;
    }
    const newItem = new Venue(itemData);
    await newItem.save();

    return res.status(201).json({
      success: true,
      message: "Joylashuv muvaffaqiyatli yaratildi",
      user: newItem,
      innerData: newItem,
      venue: newItem,
    });
  } catch (error) {
    console.error("Xato:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: joylashuv yaratish jarayonida xatolik yuz berdi",
      error: error.message,
    });
  }
};

// -------------------- Get Venues --------------------

const getAllVenues = async (req, res) => {
  try {
    const items = await Venue.find({}).populate([
      { path: "region_id" },
      { path: "district_id" },
    ]);
    res.json({
      success: true,
      message: "Barcha joylashuvlar ro'yxati olingan.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching venues:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: joylashuvlarni olishda xato yuz berdi.",
    });
  }
};

// -------------------- Get Venue By ID --------------------

const getVenueById = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const item = await Venue.findById(itemId).populate([
      { path: "region_id" },
      { path: "district_id" },
    ]);

    if (!item) {
      return res.status(404).json({ message: "Venue not found" });
    }
    return res.status(200).json({
      message: "Venue found",
      user: item,
      innerData: item,
      venue: item,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Update Venue --------------------

const updateVenue = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const updateData = { ...req.body };
    const { region_id, district_id } = req.body;

    if (region_id && mongoose.Types.ObjectId.isValid(region_id)) {
      updateData.region_id = region_id;
    }

    if (district_id && mongoose.Types.ObjectId.isValid(district_id)) {
      updateData.district_id = district_id;
    }
    const updatedItem = await Venue.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate([
      { path: "region_id" },
      { path: "district_id" },
    ]);

    if (!updatedItem) {
      return res.status(404).json({ message: "Venue not found" });
    }
    res.json({
      success: true,
      message: "Venue updated successfully",
      user: updatedItem,
      innerData: updatedItem,
      venue: updatedItem,
    });
  } catch (error) {
    console.error("Error updating venue:", error);
    res.status(500).json({
      success: false,
      message: "Server error: Failed to update venue",
    });
  }
};

// -------------------- Delete Venue --------------------

const deleteVenue = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const deletedItem = await Venue.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "Venue not found" });
    }
    res.json({
      message: "Venue deleted successfully",
      deletedUser: deletedItem,
      deletedItem,
      innerData: deletedItem,
    });
  } catch (error) {
    console.error("Error deleting venue:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Search Venue --------------------

const searchVenue = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const orConditions = [
        { name: { $regex: query, $options: "i" } },
        { address: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
        { site: { $regex: query, $options: "i" } },
        { phone: { $regex: query, $options: "i" } },
    ];

    if (mongoose.Types.ObjectId.isValid(query)) {
      orConditions.push({ _id: query });
    }

    const result = await Venue.find({
      $or: orConditions,
    }).populate([
      { path: "region_id" },
      { path: "district_id" },
    ]);
    if (result.length === 0) {
      return res.json({ message: "Bunday joylashuv topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching venues:", error);
    res.status(500).json({ message: "Server error: Failed to fetch venues." });
  }
};

module.exports = {
  // Original names for routers
  createVenue,
  getAllVenues,
  getVenueById,
  updateVenue,
  deleteVenue,
  searchVenue,

  // Template aliases
  postRegister: createVenue,
  getUsers: getAllVenues,
  getVenues: getAllVenues,
  getUserById: getVenueById,
  updateUser: updateVenue,
  deleteUser: deleteVenue,
  searchUser: searchVenue,
};
