const mongoose = require("mongoose");
const { Customer } = require("../model/CustomerScheme");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// -------------------- Create Customer --------------------

const createCustomer = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      phone,
      password,
      hashed_password,
      email,
      birth_date,
      gender_id,
      lang_id,
      hashed_refresh_token,
    } = req.body;

    const existingCustomer = await Customer.findOne({ phone });
    if (existingCustomer) {
      return res.status(400).json({
        message: "Bu telefon raqam bilan royxatdan o`tgan mijoz mavjud",
      });
    }

    const rawPassword = password || hashed_password || "";
    const hashedPassword = rawPassword ? await bcrypt.hash(rawPassword, 10) : "";
    const customerData = {
      first_name: first_name || "",
      last_name: last_name || "",
      phone,
      hashed_password: hashedPassword,
      email: email || "",
      birth_date: birth_date || null,
      hashed_refresh_token: hashed_refresh_token || "",
    };

    if (gender_id && mongoose.Types.ObjectId.isValid(gender_id)) {
      customerData.gender_id = gender_id;
    }

    if (lang_id && mongoose.Types.ObjectId.isValid(lang_id)) {
      customerData.lang_id = lang_id;
    }

    const newCustomer = new Customer(customerData);
    await newCustomer.save();

    return res.status(201).json({
      success: true,
      message: "Customer muvaffaqiyatli royxatdan o`tdi",
      user: newCustomer,
      innerData: newCustomer,
      customer: newCustomer,
    });
  } catch (error) {
    console.error("Xato:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Ro'yxatdan o'tish jarayonida xatolik yuz berdi",
      error: error.message,
    });
  }
};

// -------------------- Get Customers --------------------

const getAllCustomers = async (req, res) => {
  try {
    const items = await Customer.find({}).populate([
      { path: "gender_id" },
      { path: "lang_id" },
    ]);
    res.json({
      success: true,
      message: "Barcha mijozlar ro'yxati olingan.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: mijozlarni olishda xato yuz berdi.",
    });
  }
};

// -------------------- Get Customer By ID --------------------

const getCustomerById = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const item = await Customer.findById(itemId).populate([
      { path: "gender_id" },
      { path: "lang_id" },
    ]);

    if (!item) {
      return res.status(404).json({ message: "Customer not found" });
    }
    return res.status(200).json({
      message: "Customer found",
      user: item,
      innerData: item,
      customer: item,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Update Customer --------------------

const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const updateData = { ...req.body };
    const rawPassword = updateData.password || updateData.hashed_password;
    if (rawPassword) {
      updateData.hashed_password = await bcrypt.hash(rawPassword, 10);
      delete updateData.password;
    }
    const { gender_id, lang_id } = req.body;

    if (gender_id && mongoose.Types.ObjectId.isValid(gender_id)) {
      updateData.gender_id = gender_id;
    }

    if (lang_id && mongoose.Types.ObjectId.isValid(lang_id)) {
      updateData.lang_id = lang_id;
    }
    const updatedItem = await Customer.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate([
      { path: "gender_id" },
      { path: "lang_id" },
    ]);

    if (!updatedItem) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json({
      success: true,
      message: "Customer updated successfully",
      user: updatedItem,
      innerData: updatedItem,
      customer: updatedItem,
    });
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({
      success: false,
      message: "Server error: Failed to update customer",
    });
  }
};

// -------------------- Delete Customer --------------------

const deleteCustomer = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const deletedItem = await Customer.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json({
      message: "Customer deleted successfully",
      deletedUser: deletedItem,
      deletedItem,
      innerData: deletedItem,
    });
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Search Customer --------------------

const searchCustomer = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const orConditions = [
        { first_name: { $regex: query, $options: "i" } },
        { last_name: { $regex: query, $options: "i" } },
        { phone: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
    ];

    if (mongoose.Types.ObjectId.isValid(query)) {
      orConditions.push({ _id: query });
    }

    const result = await Customer.find({
      $or: orConditions,
    }).populate([
      { path: "gender_id" },
      { path: "lang_id" },
    ]);
    if (result.length === 0) {
      return res.json({ message: "Bunday mijoz topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ message: "Server error: Failed to fetch customers." });
  }
};

// -----------------Login Customer--------------------

const postLogin = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const item = await Customer.findOne({ phone });
    if (!item) {
      return res.status(401).json({
        success: false,
        message: "phone is invalid",
      });
    }
    const passwordMatch = await bcrypt.compare(password, item.hashed_password);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "phone or password is invalid",
      });
    }
    const token = jwt.sign(
      { id: item._id, phone: item.phone },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "24h" }
    );
    return res.json({
      message: "Token",
      token: token,
    });
  } catch (error) {
    console.error("Error", error);
    return res.status(500).json({
      success: false,
      message: "Server error: An error occurred during the login process",
    });
  }
};

module.exports = {
  // Original names for routers
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  searchCustomer,

  // Template aliases
  postRegister: createCustomer,
  getUsers: getAllCustomers,
  getCustomers: getAllCustomers,
  getUserById: getCustomerById,
  updateUser: updateCustomer,
  deleteUser: deleteCustomer,
  searchUser: searchCustomer,
  postLogin,
};
