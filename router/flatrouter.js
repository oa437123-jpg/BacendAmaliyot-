const { Router } = require("express");
const {
  postRegister,
  getFlats,
  getFlatById,
  updateFlat,
  deleteFlat,
  searchFlat,
} = require("../controller/Flat.controler");

const validateScheme = (schema) => (req, res, next) => {
  if (!schema) return next();
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }

  next();
};

const {
  createFlatValidationSchema: registerValidationSchema,
  updateFlatValidationSchema: updateValidationSchema,
} = require("../validation/flatvalidation");

const flat = Router();

/**
 * @swagger
 * tags:
 *   name: Flat
 *   description: Kvartiralarni boshqarish uchun endpointlar
 */

/**
 * @swagger
 * /flat/register:
 *   post:
 *     summary: Yangi flat ro'yxatdan o'tkazish / yaratish
 *     tags: [Flat]
 *     description: Yangi flat yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               etaj:
 *                 type: number
 *                 description: Qavat raqami
 *               condition:
 *                 type: string
 *                 description: Kvartira holati
 *     responses:
 *       '201':
 *         description: Flat muvaffaqiyatli yaratildi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /flat/getFlats:
 *   get:
 *     summary: Flatlarni olish
 *     tags: [Flat]
 *     description: Barcha flatlarni olish
 *     responses:
 *       '200':
 *         description: Flatlar muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /flat/getUserById/{id}:
 *   get:
 *     summary: Flat ID bo'yicha olish
 *     tags: [Flat]
 *     description: ID bo'yicha flatni topish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID bo'yicha flatni topish
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Flat muvaffaqiyatli qaytarildi
 *       '404':
 *         description: Flat topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /flat/searchFlat:
 *   get:
 *     summary: Flatlarni qidirish
 *     tags: [Flat]
 *     description: Qidiruv so'rovi orqali flatlarni izlash
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
 *         description: Flat topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /flat/updateFlat/{id}:
 *   put:
 *     summary: Flatni yangilash
 *     tags: [Flat]
 *     description: Flat ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Flat ID si
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
 *               etaj:
 *                 type: number
 *                 description: Qavat raqami
 *               condition:
 *                 type: string
 *                 description: Kvartira holati
 *     responses:
 *       '200':
 *         description: Flat muvaffaqiyatli yangilandi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '404':
 *         description: Flat topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /flat/deleteFlat/{id}:
 *   delete:
 *     summary: Flatni o'chirish
 *     tags: [Flat]
 *     description: ID bo'yicha flatni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan flat ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Flat muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Flat topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

// Andoza yo'llari
flat.get("/getFlats", getFlats);
flat.get("/getUsers", getFlats);
flat.get("/getAll", getFlats);
flat.get("/", getFlats);

flat.get("/getUserById/:id", getFlatById);
flat.get("/getFlatById/:id", getFlatById);
flat.get("/getById/:id", getFlatById);
flat.get("/:id", getFlatById);

flat.get("/searchFlat", searchFlat);
flat.get("/searchUser", searchFlat);
flat.get("/search", searchFlat);

flat.post("/register", validateScheme(registerValidationSchema), postRegister);
flat.post("/create", validateScheme(registerValidationSchema), postRegister);

flat.put("/updateFlat/:id", validateScheme(updateValidationSchema), updateFlat);
flat.put("/updateUser/:id", validateScheme(updateValidationSchema), updateFlat);
flat.put("/update/:id", validateScheme(updateValidationSchema), updateFlat);

flat.delete("/deleteFlat/:id", deleteFlat);
flat.delete("/deleteUser/:id", deleteFlat);
flat.delete("/delete/:id", deleteFlat);
flat.delete("/:id", deleteFlat);

module.exports = {
  flat,
  router: flat,
  users: flat,
};
