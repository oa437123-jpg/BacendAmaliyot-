const mongoose = require("mongoose");
const { Booking } = require("../model/BookingScheme");

// -------------------- Create Booking --------------------

const createBooking = async (req, res) => {
  try {
    const itemData = { ...req.body };
    const { cart_id, payment_method_id, delivery_method_id, discount_id, status_id } = req.body;

    if (cart_id && mongoose.Types.ObjectId.isValid(cart_id)) {
      itemData.cart_id = cart_id;
    }

    if (payment_method_id && mongoose.Types.ObjectId.isValid(payment_method_id)) {
      itemData.payment_method_id = payment_method_id;
    }

    if (delivery_method_id && mongoose.Types.ObjectId.isValid(delivery_method_id)) {
      itemData.delivery_method_id = delivery_method_id;
    }

    if (discount_id && mongoose.Types.ObjectId.isValid(discount_id)) {
      itemData.discount_id = discount_id;
    }

    if (status_id && mongoose.Types.ObjectId.isValid(status_id)) {
      itemData.status_id = status_id;
    }
    const newItem = new Booking(itemData);
    await newItem.save();

    return res.status(201).json({
      success: true,
      message: "Booking muvaffaqiyatli yaratildi",
      user: newItem,
      innerData: newItem,
      booking: newItem,
    });
  } catch (error) {
    console.error("Xato:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: booking yaratish jarayonida xatolik yuz berdi",
      error: error.message,
    });
  }
};

// -------------------- Get Bookings --------------------

const getAllBookings = async (req, res) => {
  try {
    const items = await Booking.find({}).populate([
      { path: "cart_id" },
      { path: "payment_method_id" },
      { path: "delivery_method_id" },
      { path: "discount_id" },
      { path: "status_id" },
    ]);
    res.json({
      success: true,
      message: "Barcha bookinglar ro'yxati olingan.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: bookinglarni olishda xato yuz berdi.",
    });
  }
};

// -------------------- Get Booking By ID --------------------

const getBookingById = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const item = await Booking.findById(itemId).populate([
      { path: "cart_id" },
      { path: "payment_method_id" },
      { path: "delivery_method_id" },
      { path: "discount_id" },
      { path: "status_id" },
    ]);

    if (!item) {
      return res.status(404).json({ message: "Booking not found" });
    }
    return res.status(200).json({
      message: "Booking found",
      user: item,
      innerData: item,
      booking: item,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Update Booking --------------------

const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const updateData = { ...req.body };
    const { cart_id, payment_method_id, delivery_method_id, discount_id, status_id } = req.body;

    if (cart_id && mongoose.Types.ObjectId.isValid(cart_id)) {
      updateData.cart_id = cart_id;
    }

    if (payment_method_id && mongoose.Types.ObjectId.isValid(payment_method_id)) {
      updateData.payment_method_id = payment_method_id;
    }

    if (delivery_method_id && mongoose.Types.ObjectId.isValid(delivery_method_id)) {
      updateData.delivery_method_id = delivery_method_id;
    }

    if (discount_id && mongoose.Types.ObjectId.isValid(discount_id)) {
      updateData.discount_id = discount_id;
    }

    if (status_id && mongoose.Types.ObjectId.isValid(status_id)) {
      updateData.status_id = status_id;
    }
    const updatedItem = await Booking.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate([
      { path: "cart_id" },
      { path: "payment_method_id" },
      { path: "delivery_method_id" },
      { path: "discount_id" },
      { path: "status_id" },
    ]);

    if (!updatedItem) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json({
      success: true,
      message: "Booking updated successfully",
      user: updatedItem,
      innerData: updatedItem,
      booking: updatedItem,
    });
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({
      success: false,
      message: "Server error: Failed to update booking",
    });
  }
};

// -------------------- Delete Booking --------------------

const deleteBooking = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const deletedItem = await Booking.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json({
      message: "Booking deleted successfully",
      deletedUser: deletedItem,
      deletedItem,
      innerData: deletedItem,
    });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Search Booking --------------------

const searchBooking = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const orConditions = [
        { createdAt: { $regex: query, $options: "i" } },
        { finished: { $regex: query, $options: "i" } },
    ];

    if (mongoose.Types.ObjectId.isValid(query)) {
      orConditions.push({ _id: query });
    }

    const result = await Booking.find({
      $or: orConditions,
    }).populate([
      { path: "cart_id" },
      { path: "payment_method_id" },
      { path: "delivery_method_id" },
      { path: "discount_id" },
      { path: "status_id" },
    ]);
    if (result.length === 0) {
      return res.json({ message: "Bunday booking topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Server error: Failed to fetch bookings." });
  }
};

module.exports = {
  // Original names for routers
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  searchBooking,

  // Template aliases
  postRegister: createBooking,
  getUsers: getAllBookings,
  getBookings: getAllBookings,
  getUserById: getBookingById,
  updateUser: updateBooking,
  deleteUser: deleteBooking,
  searchUser: searchBooking,
};
