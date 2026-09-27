const mongoose = require("mongoose");
const { Country } = require("../model/CountryScheme");

// -------------------- Create Country --------------------

const createCountry = async (req, res) => {
  try {
    const { country_name } = req.body;
    const existingItem = await Country.findOne({ country_name });
    if (existingItem) {
      return res.status(400).json({
        message: "Bu nomli davlat allaqachon mavjud.",
      });
    }
    const itemData = { ...req.body };
    const newItem = new Country(itemData);
    await newItem.save();

    return res.status(201).json({
      success: true,
      message: "Davlat muvaffaqiyatli yaratildi",
      user: newItem,
      innerData: newItem,
      country: newItem,
    });
  } catch (error) {
    console.error("Xato:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: davlat yaratish jarayonida xatolik yuz berdi",
      error: error.message,
    });
  }
};

// -------------------- Get Countries --------------------

const getAllCountries = async (req, res) => {
  try {
    const items = await Country.find({});
    res.json({
      success: true,
      message: "Barcha davlatlar ro'yxati olingan.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching countries:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: davlatlarni olishda xato yuz berdi.",
    });
  }
};

// -------------------- Get Country By ID --------------------

const getCountryById = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const item = await Country.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: "Country not found" });
    }
    return res.status(200).json({
      message: "Country found",
      user: item,
      innerData: item,
      country: item,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Update Country --------------------

const updateCountry = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const updateData = { ...req.body };
    const updatedItem = await Country.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ message: "Country not found" });
    }
    res.json({
      success: true,
      message: "Country updated successfully",
      user: updatedItem,
      innerData: updatedItem,
      country: updatedItem,
    });
  } catch (error) {
    console.error("Error updating country:", error);
    res.status(500).json({
      success: false,
      message: "Server error: Failed to update country",
    });
  }
};

// -------------------- Delete Country --------------------

const deleteCountry = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const deletedItem = await Country.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "Country not found" });
    }
    res.json({
      message: "Country deleted successfully",
      deletedUser: deletedItem,
      deletedItem,
      innerData: deletedItem,
    });
  } catch (error) {
    console.error("Error deleting country:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Search Country --------------------

const searchCountry = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const orConditions = [
        { country_name: { $regex: query, $options: "i" } },
    ];

    if (mongoose.Types.ObjectId.isValid(query)) {
      orConditions.push({ _id: query });
    }

    const result = await Country.find({
      $or: orConditions,
    });
    if (result.length === 0) {
      return res.json({ message: "Bunday davlat topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching countries:", error);
    res.status(500).json({ message: "Server error: Failed to fetch countries." });
  }
};

module.exports = {
  // Original names for routers
  createCountry,
  getAllCountries,
  getCountryById,
  updateCountry,
  deleteCountry,
  searchCountry,

  // Template aliases
  postRegister: createCountry,
  getUsers: getAllCountries,
  getCountries: getAllCountries,
  getUserById: getCountryById,
  updateUser: updateCountry,
  deleteUser: deleteCountry,
  searchUser: searchCountry,
};
