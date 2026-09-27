const mongoose = require("mongoose");
const { EventType } = require("../model/EventTypeScheme");

// -------------------- Create EventType --------------------

const createEventType = async (req, res) => {
  try {
    const itemData = { ...req.body };
    const { parent_event_type_id } = req.body;

    if (parent_event_type_id && mongoose.Types.ObjectId.isValid(parent_event_type_id)) {
      itemData.parent_event_type_id = parent_event_type_id;
    }
    const newItem = new EventType(itemData);
    await newItem.save();

    return res.status(201).json({
      success: true,
      message: "Tadbir turi muvaffaqiyatli yaratildi",
      user: newItem,
      innerData: newItem,
      eventType: newItem,
    });
  } catch (error) {
    console.error("Xato:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: tadbir turi yaratish jarayonida xatolik yuz berdi",
      error: error.message,
    });
  }
};

// -------------------- Get EventTypes --------------------

const getAllEventTypes = async (req, res) => {
  try {
    const items = await EventType.find({}).populate([
      { path: "parent_event_type_id" },
    ]);
    res.json({
      success: true,
      message: "Barcha tadbir turlari ro'yxati olingan.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching eventtypes:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: tadbir turlarini olishda xato yuz berdi.",
    });
  }
};

// -------------------- Get EventType By ID --------------------

const getEventTypeById = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const item = await EventType.findById(itemId).populate([
      { path: "parent_event_type_id" },
    ]);

    if (!item) {
      return res.status(404).json({ message: "EventType not found" });
    }
    return res.status(200).json({
      message: "EventType found",
      user: item,
      innerData: item,
      eventType: item,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Update EventType --------------------

const updateEventType = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const updateData = { ...req.body };
    const { parent_event_type_id } = req.body;

    if (parent_event_type_id && mongoose.Types.ObjectId.isValid(parent_event_type_id)) {
      updateData.parent_event_type_id = parent_event_type_id;
    }
    const updatedItem = await EventType.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate([
      { path: "parent_event_type_id" },
    ]);

    if (!updatedItem) {
      return res.status(404).json({ message: "EventType not found" });
    }
    res.json({
      success: true,
      message: "EventType updated successfully",
      user: updatedItem,
      innerData: updatedItem,
      eventType: updatedItem,
    });
  } catch (error) {
    console.error("Error updating eventtype:", error);
    res.status(500).json({
      success: false,
      message: "Server error: Failed to update eventtype",
    });
  }
};

// -------------------- Delete EventType --------------------

const deleteEventType = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const deletedItem = await EventType.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "EventType not found" });
    }
    res.json({
      message: "EventType deleted successfully",
      deletedUser: deletedItem,
      deletedItem,
      innerData: deletedItem,
    });
  } catch (error) {
    console.error("Error deleting eventtype:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Search EventType --------------------

const searchEventType = async (req, res) => {
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

    const result = await EventType.find({
      $or: orConditions,
    }).populate([
      { path: "parent_event_type_id" },
    ]);
    if (result.length === 0) {
      return res.json({ message: "Bunday tadbir turi topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching eventtypes:", error);
    res.status(500).json({ message: "Server error: Failed to fetch eventtypes." });
  }
};

module.exports = {
  // Original names for routers
  createEventType,
  getAllEventTypes,
  getEventTypeById,
  updateEventType,
  deleteEventType,
  searchEventType,

  // Template aliases
  postRegister: createEventType,
  getUsers: getAllEventTypes,
  getEventTypes: getAllEventTypes,
  getUserById: getEventTypeById,
  updateUser: updateEventType,
  deleteUser: deleteEventType,
  searchUser: searchEventType,
};
