const { Router } = require("express");
const {
  postRegister,
  postLogin,
  getAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  searchAdmin,
} = require("../controller/Admin.controler");

const validateScheme = (schema) => (req, res, next) => {
  if (!schema) return next();
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }

  next();
};

const {
  createAdminValidationSchema: registerValidationSchema,
  updateAdminValidationSchema: updateValidationSchema,
} = require("../validation/adminvalidation");

const Joi = require("joi");
const loginValidationSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required(),
});

const admin = Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Adminlarni boshqarish uchun endpointlar
 */

/**
 * @swagger
 * /admin/register:
 *   post:
 *     summary: Yangi admin ro'yxatdan o'tkazish / yaratish
 *     tags: [Admin]
 *     description: Yangi admin yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - login
 *             properties:
 *               name:
 *                 type: string
 *                 description: Admin ismi
 *               login:
 *                 type: string
 *                 description: Admin logini
 *               password:
 *                 type: string
 *                 description: Admin paroli
 *               hashed_password:
 *                 type: string
 *                 description: Admin paroli (heshlangan)
 *               is_active:
 *                 type: boolean
 *                 description: Admin faolligi
 *               is_creator:
 *                 type: boolean
 *                 description: Admin yaratuvchi huquqi
 *     responses:
 *       '201':
 *         description: Admin muvaffaqiyatli yaratildi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '500':
 *         description: Ichki server xatosi
 */
/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Admin tizimga kirishi
 *     tags: [Admin]
 *     description: Admin kiritgan ma'lumot bilan tizimga kirish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *                 description: Admin login
 *               password:
 *                 type: string
 *                 description: Admin paroli
 *     responses:
 *       '200':
 *         description: Admin muvaffaqiyatli tizimga kirdi
 *       '401':
 *         description: Noto'g'ri ma'lumot
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /admin/getAdmins:
 *   get:
 *     summary: Adminlarni olish
 *     tags: [Admin]
 *     description: Barcha adminlarni olish
 *     responses:
 *       '200':
 *         description: Adminlar muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /admin/getUserById/{id}:
 *   get:
 *     summary: Admin ID bo'yicha olish
 *     tags: [Admin]
 *     description: ID bo'yicha adminni topish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID bo'yicha adminni topish
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Admin muvaffaqiyatli qaytarildi
 *       '404':
 *         description: Admin topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /admin/searchAdmin:
 *   get:
 *     summary: Adminlarni qidirish
 *     tags: [Admin]
 *     description: Qidiruv so'rovi orqali adminlarni izlash
 *     parameters:
 *       - in: query
 *         name: query
 *         description: Qidiruv matni
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Qidiruv natijalari qaytarildi
 *       '404':
 *         description: Admin topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /admin/updateAdmin/{id}:
 *   put:
 *     summary: Adminni yangilash
 *     tags: [Admin]
 *     description: Admin ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Admin ID si
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Admin ismi
 *               login:
 *                 type: string
 *                 description: Admin logini
 *               password:
 *                 type: string
 *                 description: Admin paroli
 *               hashed_password:
 *                 type: string
 *                 description: Admin paroli (heshlangan)
 *               is_active:
 *                 type: boolean
 *                 description: Admin faolligi
 *               is_creator:
 *                 type: boolean
 *                 description: Admin yaratuvchi huquqi
 *     responses:
 *       '200':
 *         description: Admin muvaffaqiyatli yangilandi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '404':
 *         description: Admin topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /admin/deleteAdmin/{id}:
 *   delete:
 *     summary: Adminni o'chirish
 *     tags: [Admin]
 *     description: ID bo'yicha adminni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan admin ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Admin muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Admin topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

// Andoza yo'llari
admin.get("/getAdmins", getAdmins);
admin.get("/getUsers", getAdmins);
admin.get("/getAll", getAdmins);
admin.get("/", getAdmins);

admin.get("/getUserById/:id", getAdminById);
admin.get("/getAdminById/:id", getAdminById);
admin.get("/getById/:id", getAdminById);
admin.get("/:id", getAdminById);

admin.get("/searchAdmin", searchAdmin);
admin.get("/searchUser", searchAdmin);
admin.get("/search", searchAdmin);

admin.post("/register", validateScheme(registerValidationSchema), postRegister);
admin.post("/create", validateScheme(registerValidationSchema), postRegister);

admin.put("/updateAdmin/:id", validateScheme(updateValidationSchema), updateAdmin);
admin.put("/updateUser/:id", validateScheme(updateValidationSchema), updateAdmin);
admin.put("/update/:id", validateScheme(updateValidationSchema), updateAdmin);

admin.delete("/deleteAdmin/:id", deleteAdmin);
admin.delete("/deleteUser/:id", deleteAdmin);
admin.delete("/delete/:id", deleteAdmin);
admin.delete("/:id", deleteAdmin);
admin.post("/login", validateScheme(loginValidationSchema), postLogin);

module.exports = {
  admin,
  router: admin,
  users: admin,
};
