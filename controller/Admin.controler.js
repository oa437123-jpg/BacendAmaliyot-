const mongoose = require("mongoose");
const { Admin } = require("../model/AdminScheme");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// -------------------- Create Admin --------------------

const createAdmin = async (req, res) => {
  try {
    const {
      login,
      password,
      hashed_password,
      name,
      is_active,
      is_creator,
      hashed_refresh_token,
    } = req.body;

    const existingAdmin = await Admin.findOne({ login });
    if (existingAdmin) {
      return res.status(400).json({
        message: "Bu nom bilan royxatdan o`tgan admin mavjud",
      });
    }

    const rawPassword = password || hashed_password || "";
    const hashedPassword = rawPassword ? await bcrypt.hash(rawPassword, 10) : "";
    const adminData = {
      name: name || "",
      login,
      hashed_password: hashedPassword,
      is_active: is_active !== undefined ? is_active : true,
      is_creator: is_creator || false,
      hashed_refresh_token: hashed_refresh_token || "",
    };

    const newAdmin = new Admin(adminData);
    await newAdmin.save();

    return res.status(201).json({
      success: true,
      message: "Admin muvaffaqiyatli royxatdan o`tdi",
      user: newAdmin,
      innerData: newAdmin,
      admin: newAdmin,
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

// -------------------- Get Admins --------------------

const getAllAdmins = async (req, res) => {
  try {
    const items = await Admin.find({});
    res.json({
      success: true,
      message: "Barcha adminlar ro'yxati olingan.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching admins:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: adminlarni olishda xato yuz berdi.",
    });
  }
};

// -------------------- Get Admin By ID --------------------

const getAdminById = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const item = await Admin.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: "Admin not found" });
    }
    return res.status(200).json({
      message: "Admin found",
      user: item,
      innerData: item,
      admin: item,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Update Admin --------------------

const updateAdmin = async (req, res) => {
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
    const updatedItem = await Admin.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.json({
      success: true,
      message: "Admin updated successfully",
      user: updatedItem,
      innerData: updatedItem,
      admin: updatedItem,
    });
  } catch (error) {
    console.error("Error updating admin:", error);
    res.status(500).json({
      success: false,
      message: "Server error: Failed to update admin",
    });
  }
};

// -------------------- Delete Admin --------------------

const deleteAdmin = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Noto'g'ri ID formati" });
    }

    const deletedItem = await Admin.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.json({
      message: "Admin deleted successfully",
      deletedUser: deletedItem,
      deletedItem,
      innerData: deletedItem,
    });
  } catch (error) {
    console.error("Error deleting admin:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Search Admin --------------------

const searchAdmin = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const orConditions = [
        { name: { $regex: query, $options: "i" } },
        { login: { $regex: query, $options: "i" } },
    ];

    if (mongoose.Types.ObjectId.isValid(query)) {
      orConditions.push({ _id: query });
    }

    const result = await Admin.find({
      $or: orConditions,
    });
    if (result.length === 0) {
      return res.json({ message: "Bunday admin topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching admins:", error);
    res.status(500).json({ message: "Server error: Failed to fetch admins." });
  }
};

// -----------------Login Admin--------------------

const postLogin = async (req, res) => {
  try {
    const { login, password } = req.body;
    const item = await Admin.findOne({ login });
    if (!item) {
      return res.status(401).json({
        success: false,
        message: "login is invalid",
      });
    }
    const passwordMatch = await bcrypt.compare(password, item.hashed_password);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "login or password is invalid",
      });
    }
    const token = jwt.sign(
      { id: item._id, login: item.login },
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
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  searchAdmin,

  // Template aliases
  postRegister: createAdmin,
  getUsers: getAllAdmins,
  getAdmins: getAllAdmins,
  getUserById: getAdminById,
  updateUser: updateAdmin,
  deleteUser: deleteAdmin,
  searchUser: searchAdmin,
  postLogin,
};
