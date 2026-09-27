const mongoose = require("mongoose");
const { VenuePhoto } = require("../model/VenuePhotoScheme");

// -------------------- Create VenuePhoto --------------------

const createVenuePhoto = async (req, res) => {
  try {
    const itemData = { ...req.body };
    const { venue_id } = req.body;

    if (venue_id && mongoose.Types.ObjectId.isValid(venue_id)) {
      itemData.venue_id = venue_id;
    }
    const newItem = new VenuePhoto(itemData);
    await newItem.save();

    return res.status(201).json({
      success: true,
      message: "Venue rasmi muvaffaqiyatli yaratildi",
      user: newItem,
      innerData: newItem,
      venuePhoto: newItem,
    });
  } catch (error) {
    console.error("Xato:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: venue rasmi yaratish jarayonida xatolik yuz berdi",
      error: error.message,
    });
  }
};

// -------------------- Get VenuePhotos --------------------

const getAllVenuePhotos = async (req, res) => {
  try {
    const items = await VenuePhoto.find({}).populate([
      { path: "venue_id" },
    ]);
    res.json({
      success: true,
      message: "Barcha venue rasmlari ro'yxati olingan.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching venuephotos:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: venue rasmlarini olishda xato yuz berdi.",
    });
  }
};

// -------------------- Get VenuePhoto By ID --------------------

const getVenuePhotoById = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const item = await VenuePhoto.findById(itemId).populate([
      { path: "venue_id" },
    ]);

    if (!item) {
      return res.status(404).json({ message: "VenuePhoto not found" });
    }
    return res.status(200).json({
      message: "VenuePhoto found",
      user: item,
      innerData: item,
      venuePhoto: item,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Update VenuePhoto --------------------

const updateVenuePhoto = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const updateData = { ...req.body };
    const { venue_id } = req.body;

    if (venue_id && mongoose.Types.ObjectId.isValid(venue_id)) {
      updateData.venue_id = venue_id;
    }
    const updatedItem = await VenuePhoto.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate([
      { path: "venue_id" },
    ]);

    if (!updatedItem) {
      return res.status(404).json({ message: "VenuePhoto not found" });
    }
    res.json({
      success: true,
      message: "VenuePhoto updated successfully",
      user: updatedItem,
      innerData: updatedItem,
      venuePhoto: updatedItem,
    });
  } catch (error) {
    console.error("Error updating venuephoto:", error);
    res.status(500).json({
      success: false,
      message: "Server error: Failed to update venuephoto",
    });
  }
};

// -------------------- Delete VenuePhoto --------------------

const deleteVenuePhoto = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const deletedItem = await VenuePhoto.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "VenuePhoto not found" });
    }
    res.json({
      message: "VenuePhoto deleted successfully",
      deletedUser: deletedItem,
      deletedItem,
      innerData: deletedItem,
    });
  } catch (error) {
    console.error("Error deleting venuephoto:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Search VenuePhoto --------------------

const searchVenuePhoto = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const orConditions = [
        { url: { $regex: query, $options: "i" } },
    ];

    if (mongoose.Types.ObjectId.isValid(query)) {
      orConditions.push({ _id: query });
    }

    const result = await VenuePhoto.find({
      $or: orConditions,
    }).populate([
      { path: "venue_id" },
    ]);
    if (result.length === 0) {
      return res.json({ message: "Bunday venue rasmi topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching venuephotos:", error);
    res.status(500).json({ message: "Server error: Failed to fetch venuephotos." });
  }
};

module.exports = {
  // Original names for routers
  createVenuePhoto,
  getAllVenuePhotos,
  getVenuePhotoById,
  updateVenuePhoto,
  deleteVenuePhoto,
  searchVenuePhoto,

  // Template aliases
  postRegister: createVenuePhoto,
  getUsers: getAllVenuePhotos,
  getVenuePhotos: getAllVenuePhotos,
  getUserById: getVenuePhotoById,
  updateUser: updateVenuePhoto,
  deleteUser: deleteVenuePhoto,
  searchUser: searchVenuePhoto,
};
