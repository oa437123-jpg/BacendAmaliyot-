const mongoose = require("mongoose");
const { CustomerAddress } = require("../model/CustomerAddressScheme");

// -------------------- Create CustomerAddress --------------------

const createCustomerAddress = async (req, res) => {
  try {
    const itemData = { ...req.body };
    const { customer_id, region_id, district_id, flat_id } = req.body;

    if (customer_id && mongoose.Types.ObjectId.isValid(customer_id)) {
      itemData.customer_id = customer_id;
    }

    if (region_id && mongoose.Types.ObjectId.isValid(region_id)) {
      itemData.region_id = region_id;
    }

    if (district_id && mongoose.Types.ObjectId.isValid(district_id)) {
      itemData.district_id = district_id;
    }

    if (flat_id && mongoose.Types.ObjectId.isValid(flat_id)) {
      itemData.flat_id = flat_id;
    }
    const newItem = new CustomerAddress(itemData);
    await newItem.save();

    return res.status(201).json({
      success: true,
      message: "Mijoz manzili muvaffaqiyatli yaratildi",
      user: newItem,
      innerData: newItem,
      customerAddress: newItem,
    });
  } catch (error) {
    console.error("Xato:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: mijoz manzili yaratish jarayonida xatolik yuz berdi",
      error: error.message,
    });
  }
};

// -------------------- Get CustomerAddresses --------------------

const getAllCustomerAddresses = async (req, res) => {
  try {
    const items = await CustomerAddress.find({}).populate([
      { path: "customer_id" },
      { path: "region_id" },
      { path: "district_id" },
      { path: "flat_id" },
    ]);
    res.json({
      success: true,
      message: "Barcha mijoz manzillari ro'yxati olingan.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching customeraddresses:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: mijoz manzillarini olishda xato yuz berdi.",
    });
  }
};

// -------------------- Get CustomerAddress By ID --------------------

const getCustomerAddressById = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const item = await CustomerAddress.findById(itemId).populate([
      { path: "customer_id" },
      { path: "region_id" },
      { path: "district_id" },
      { path: "flat_id" },
    ]);

    if (!item) {
      return res.status(404).json({ message: "CustomerAddress not found" });
    }
    return res.status(200).json({
      message: "CustomerAddress found",
      user: item,
      innerData: item,
      customerAddress: item,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Update CustomerAddress --------------------

const updateCustomerAddress = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const updateData = { ...req.body };
    const { customer_id, region_id, district_id, flat_id } = req.body;

    if (customer_id && mongoose.Types.ObjectId.isValid(customer_id)) {
      updateData.customer_id = customer_id;
    }

    if (region_id && mongoose.Types.ObjectId.isValid(region_id)) {
      updateData.region_id = region_id;
    }

    if (district_id && mongoose.Types.ObjectId.isValid(district_id)) {
      updateData.district_id = district_id;
    }

    if (flat_id && mongoose.Types.ObjectId.isValid(flat_id)) {
      updateData.flat_id = flat_id;
    }
    const updatedItem = await CustomerAddress.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate([
      { path: "customer_id" },
      { path: "region_id" },
      { path: "district_id" },
      { path: "flat_id" },
    ]);

    if (!updatedItem) {
      return res.status(404).json({ message: "CustomerAddress not found" });
    }
    res.json({
      success: true,
      message: "CustomerAddress updated successfully",
      user: updatedItem,
      innerData: updatedItem,
      customerAddress: updatedItem,
    });
  } catch (error) {
    console.error("Error updating customeraddress:", error);
    res.status(500).json({
      success: false,
      message: "Server error: Failed to update customeraddress",
    });
  }
};

// -------------------- Delete CustomerAddress --------------------

const deleteCustomerAddress = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const deletedItem = await CustomerAddress.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "CustomerAddress not found" });
    }
    res.json({
      message: "CustomerAddress deleted successfully",
      deletedUser: deletedItem,
      deletedItem,
      innerData: deletedItem,
    });
  } catch (error) {
    console.error("Error deleting customeraddress:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Search CustomerAddress --------------------

const searchCustomerAddress = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const orConditions = [
        { street: { $regex: query, $options: "i" } },
        { house: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
        { post_index: { $regex: query, $options: "i" } },
        { info: { $regex: query, $options: "i" } },
    ];

    if (mongoose.Types.ObjectId.isValid(query)) {
      orConditions.push({ _id: query });
    }

    const result = await CustomerAddress.find({
      $or: orConditions,
    }).populate([
      { path: "customer_id" },
      { path: "region_id" },
      { path: "district_id" },
      { path: "flat_id" },
    ]);
    if (result.length === 0) {
      return res.json({ message: "Bunday mijoz manzili topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching customeraddresses:", error);
    res.status(500).json({ message: "Server error: Failed to fetch customeraddresses." });
  }
};

module.exports = {
  // Original names for routers
  createCustomerAddress,
  getAllCustomerAddresses,
  getCustomerAddressById,
  updateCustomerAddress,
  deleteCustomerAddress,
  searchCustomerAddress,

  // Template aliases
  postRegister: createCustomerAddress,
  getUsers: getAllCustomerAddresses,
  getCustomerAddresses: getAllCustomerAddresses,
  getUserById: getCustomerAddressById,
  updateUser: updateCustomerAddress,
  deleteUser: deleteCustomerAddress,
  searchUser: searchCustomerAddress,
};
