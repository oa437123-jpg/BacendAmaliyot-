const { Router } = require("express");
const {
  postRegister,
  getSeatTypes,
  getSeatTypeById,
  updateSeatType,
  deleteSeatType,
  searchSeatType,
} = require("../controller/SeatType.controler");

const validateScheme = (schema) => (req, res, next) => {
  if (!schema) return next();
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }

  next();
};

const {
  createSeatTypeValidationSchema: registerValidationSchema,
  updateSeatTypeValidationSchema: updateValidationSchema,
} = require("../validation/seattypevalidation");

const seatType = Router();

/**
 * @swagger
 * tags:
 *   name: SeatType
 *   description: O'rindiq turlarini boshqarish uchun endpointlar
 */

/**
 * @swagger
 * /seattype/register:
 *   post:
 *     summary: Yangi seattype ro'yxatdan o'tkazish / yaratish
 *     tags: [SeatType]
 *     description: Yangi seattype yaratish
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
 *                 description: O'rindiq turi nomi
 *     responses:
 *       '201':
 *         description: SeatType muvaffaqiyatli yaratildi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /seattype/getSeatTypes:
 *   get:
 *     summary: SeatTypelarni olish
 *     tags: [SeatType]
 *     description: Barcha seattypelarni olish
 *     responses:
 *       '200':
 *         description: SeatTypelar muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /seattype/getUserById/{id}:
 *   get:
 *     summary: SeatType ID bo'yicha olish
 *     tags: [SeatType]
 *     description: ID bo'yicha seattypeni topish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID bo'yicha seattypeni topish
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: SeatType muvaffaqiyatli qaytarildi
 *       '404':
 *         description: SeatType topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /seattype/searchSeatType:
 *   get:
 *     summary: SeatTypelarni qidirish
 *     tags: [SeatType]
 *     description: Qidiruv so'rovi orqali seattypelarni izlash
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
 *         description: SeatType topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /seattype/updateSeatType/{id}:
 *   put:
 *     summary: SeatTypeni yangilash
 *     tags: [SeatType]
 *     description: SeatType ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: SeatType ID si
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
 *                 description: O'rindiq turi nomi
 *     responses:
 *       '200':
 *         description: SeatType muvaffaqiyatli yangilandi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '404':
 *         description: SeatType topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /seattype/deleteSeatType/{id}:
 *   delete:
 *     summary: SeatTypeni o'chirish
 *     tags: [SeatType]
 *     description: ID bo'yicha seattypeni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan seattype ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: SeatType muvaffaqiyatli o'chirildi
 *       '404':
 *         description: SeatType topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

// Andoza yo'llari
seatType.get("/getSeatTypes", getSeatTypes);
seatType.get("/getUsers", getSeatTypes);
seatType.get("/getAll", getSeatTypes);
seatType.get("/", getSeatTypes);

seatType.get("/getUserById/:id", getSeatTypeById);
seatType.get("/getSeatTypeById/:id", getSeatTypeById);
seatType.get("/getById/:id", getSeatTypeById);
seatType.get("/:id", getSeatTypeById);

seatType.get("/searchSeatType", searchSeatType);
seatType.get("/searchUser", searchSeatType);
seatType.get("/search", searchSeatType);

seatType.post("/register", validateScheme(registerValidationSchema), postRegister);
seatType.post("/create", validateScheme(registerValidationSchema), postRegister);

seatType.put("/updateSeatType/:id", validateScheme(updateValidationSchema), updateSeatType);
seatType.put("/updateUser/:id", validateScheme(updateValidationSchema), updateSeatType);
seatType.put("/update/:id", validateScheme(updateValidationSchema), updateSeatType);

seatType.delete("/deleteSeatType/:id", deleteSeatType);
seatType.delete("/deleteUser/:id", deleteSeatType);
seatType.delete("/delete/:id", deleteSeatType);
seatType.delete("/:id", deleteSeatType);

module.exports = {
  seatType,
  router: seatType,
  users: seatType,
};
