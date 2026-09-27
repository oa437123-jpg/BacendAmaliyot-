const mongoose = require("mongoose");
const { Event } = require("../model/EventScheme");

// -------------------- Create Event --------------------

const createEvent = async (req, res) => {
  try {
    const itemData = { ...req.body };
    const { event_type_id, human_category_id, venue_id, lang_id } = req.body;

    if (event_type_id && mongoose.Types.ObjectId.isValid(event_type_id)) {
      itemData.event_type_id = event_type_id;
    }

    if (human_category_id && mongoose.Types.ObjectId.isValid(human_category_id)) {
      itemData.human_category_id = human_category_id;
    }

    if (venue_id && mongoose.Types.ObjectId.isValid(venue_id)) {
      itemData.venue_id = venue_id;
    }

    if (lang_id && mongoose.Types.ObjectId.isValid(lang_id)) {
      itemData.lang_id = lang_id;
    }
    const newItem = new Event(itemData);
    await newItem.save();

    return res.status(201).json({
      success: true,
      message: "Tadbir muvaffaqiyatli yaratildi",
      user: newItem,
      innerData: newItem,
      event: newItem,
    });
  } catch (error) {
    console.error("Xato:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: tadbir yaratish jarayonida xatolik yuz berdi",
      error: error.message,
    });
  }
};

// -------------------- Get Events --------------------

const getAllEvents = async (req, res) => {
  try {
    const items = await Event.find({}).populate([
      { path: "event_type_id" },
      { path: "human_category_id" },
      { path: "venue_id" },
      { path: "lang_id" },
    ]);
    res.json({
      success: true,
      message: "Barcha tadbirlar ro'yxati olingan.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: tadbirlarni olishda xato yuz berdi.",
    });
  }
};

// -------------------- Get Event By ID --------------------

const getEventById = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const item = await Event.findById(itemId).populate([
      { path: "event_type_id" },
      { path: "human_category_id" },
      { path: "venue_id" },
      { path: "lang_id" },
    ]);

    if (!item) {
      return res.status(404).json({ message: "Event not found" });
    }
    return res.status(200).json({
      message: "Event found",
      user: item,
      innerData: item,
      event: item,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Update Event --------------------

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const updateData = { ...req.body };
    const { event_type_id, human_category_id, venue_id, lang_id } = req.body;

    if (event_type_id && mongoose.Types.ObjectId.isValid(event_type_id)) {
      updateData.event_type_id = event_type_id;
    }

    if (human_category_id && mongoose.Types.ObjectId.isValid(human_category_id)) {
      updateData.human_category_id = human_category_id;
    }

    if (venue_id && mongoose.Types.ObjectId.isValid(venue_id)) {
      updateData.venue_id = venue_id;
    }

    if (lang_id && mongoose.Types.ObjectId.isValid(lang_id)) {
      updateData.lang_id = lang_id;
    }
    const updatedItem = await Event.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate([
      { path: "event_type_id" },
      { path: "human_category_id" },
      { path: "venue_id" },
      { path: "lang_id" },
    ]);

    if (!updatedItem) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json({
      success: true,
      message: "Event updated successfully",
      user: updatedItem,
      innerData: updatedItem,
      event: updatedItem,
    });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({
      success: false,
      message: "Server error: Failed to update event",
    });
  }
};

// -------------------- Delete Event --------------------

const deleteEvent = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const deletedItem = await Event.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json({
      message: "Event deleted successfully",
      deletedUser: deletedItem,
      deletedItem,
      innerData: deletedItem,
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Search Event --------------------

const searchEvent = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const orConditions = [
        { name: { $regex: query, $options: "i" } },
        { info: { $regex: query, $options: "i" } },
        { start_time: { $regex: query, $options: "i" } },
        { finish_time: { $regex: query, $options: "i" } },
    ];

    if (mongoose.Types.ObjectId.isValid(query)) {
      orConditions.push({ _id: query });
    }

    const result = await Event.find({
      $or: orConditions,
    }).populate([
      { path: "event_type_id" },
      { path: "human_category_id" },
      { path: "venue_id" },
      { path: "lang_id" },
    ]);
    if (result.length === 0) {
      return res.json({ message: "Bunday tadbir topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Server error: Failed to fetch events." });
  }
};

module.exports = {
  // Original names for routers
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  searchEvent,

  // Template aliases
  postRegister: createEvent,
  getUsers: getAllEvents,
  getEvents: getAllEvents,
  getUserById: getEventById,
  updateUser: updateEvent,
  deleteUser: deleteEvent,
  searchUser: searchEvent,
};
