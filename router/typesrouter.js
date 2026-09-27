const { Router } = require("express");
const {
  postRegister,
  getTypes,
  getTypesById,
  updateTypes,
  deleteTypes,
  searchTypes,
} = require("../controller/Types.controler");

const validateScheme = (schema) => (req, res, next) => {
  if (!schema) return next();
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }

  next();
};

const {
  createTypesValidationSchema: registerValidationSchema,
  updateTypesValidationSchema: updateValidationSchema,
} = require("../validation/typesvalidation");

const types = Router();

/**
 * @swagger
 * tags:
 *   name: Types
 *   description: Turlarni boshqarish uchun endpointlar
 */

/**
 * @swagger
 * /types/register:
 *   post:
 *     summary: Yangi types ro'yxatdan o'tkazish / yaratish
 *     tags: [Types]
 *     description: Yangi types yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Tur nomi
 *     responses:
 *       '201':
 *         description: Types muvaffaqiyatli yaratildi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /types/getTypes:
 *   get:
 *     summary: Typeslarni olish
 *     tags: [Types]
 *     description: Barcha typeslarni olish
 *     responses:
 *       '200':
 *         description: Typeslar muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /types/getUserById/{id}:
 *   get:
 *     summary: Types ID bo'yicha olish
 *     tags: [Types]
 *     description: ID bo'yicha typesni topish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID bo'yicha typesni topish
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Types muvaffaqiyatli qaytarildi
 *       '404':
 *         description: Types topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /types/searchTypes:
 *   get:
 *     summary: Typeslarni qidirish
 *     tags: [Types]
 *     description: Qidiruv so'rovi orqali typeslarni izlash
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
 *         description: Types topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /types/updateTypes/{id}:
 *   put:
 *     summary: Typesni yangilash
 *     tags: [Types]
 *     description: Types ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Types ID si
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
 *                 description: Tur nomi
 *     responses:
 *       '200':
 *         description: Types muvaffaqiyatli yangilandi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '404':
 *         description: Types topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /types/deleteTypes/{id}:
 *   delete:
 *     summary: Typesni o'chirish
 *     tags: [Types]
 *     description: ID bo'yicha typesni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan types ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Types muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Types topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

// Andoza yo'llari
types.get("/getTypes", getTypes);
types.get("/getUsers", getTypes);
types.get("/getAll", getTypes);
types.get("/", getTypes);

types.get("/getUserById/:id", getTypesById);
types.get("/getTypesById/:id", getTypesById);
types.get("/getById/:id", getTypesById);
types.get("/:id", getTypesById);

types.get("/searchTypes", searchTypes);
types.get("/searchUser", searchTypes);
types.get("/search", searchTypes);

types.post("/register", validateScheme(registerValidationSchema), postRegister);
types.post("/create", validateScheme(registerValidationSchema), postRegister);

types.put("/updateTypes/:id", validateScheme(updateValidationSchema), updateTypes);
types.put("/updateUser/:id", validateScheme(updateValidationSchema), updateTypes);
types.put("/update/:id", validateScheme(updateValidationSchema), updateTypes);

types.delete("/deleteTypes/:id", deleteTypes);
types.delete("/deleteUser/:id", deleteTypes);
types.delete("/delete/:id", deleteTypes);
types.delete("/:id", deleteTypes);

module.exports = {
  types,
  router: types,
  users: types,
};
