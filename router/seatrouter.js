const { Router } = require("express");
const {
  postRegister,
  getSeats,
  getSeatById,
  updateSeat,
  deleteSeat,
  searchSeat,
} = require("../controller/Seat.controler");

const validateScheme = (schema) => (req, res, next) => {
  if (!schema) return next();
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }

  next();
};

const {
  createSeatValidationSchema: registerValidationSchema,
  updateSeatValidationSchema: updateValidationSchema,
} = require("../validation/seatvalidation");

const seat = Router();

/**
 * @swagger
 * tags:
 *   name: Seat
 *   description: O'rindiqlarni (joylarni) boshqarish uchun endpointlar
 */

/**
 * @swagger
 * /seat/register:
 *   post:
 *     summary: Yangi seat ro'yxatdan o'tkazish / yaratish
 *     tags: [Seat]
 *     description: Yangi seat yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sector_id:
 *                 type: string
 *                 description: Sektor ID (ObjectId)
 *               row_number:
 *                 type: number
 *                 description: Qator raqami
 *               number:
 *                 type: number
 *                 description: O'rindiq raqami
 *               venue_id:
 *                 type: string
 *                 description: Venue ID (ObjectId)
 *               seat_type_id:
 *                 type: string
 *                 description: O'rindiq turi ID (ObjectId)
 *               location_in_schema:
 *                 type: string
 *                 description: Sxemadagi joylashuvi
 *     responses:
 *       '201':
 *         description: Seat muvaffaqiyatli yaratildi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /seat/getSeats:
 *   get:
 *     summary: Seatlarni olish
 *     tags: [Seat]
 *     description: Barcha seatlarni olish
 *     responses:
 *       '200':
 *         description: Seatlar muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /seat/getUserById/{id}:
 *   get:
 *     summary: Seat ID bo'yicha olish
 *     tags: [Seat]
 *     description: ID bo'yicha seatni topish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID bo'yicha seatni topish
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Seat muvaffaqiyatli qaytarildi
 *       '404':
 *         description: Seat topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /seat/searchSeat:
 *   get:
 *     summary: Seatlarni qidirish
 *     tags: [Seat]
 *     description: Qidiruv so'rovi orqali seatlarni izlash
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
 *         description: Seat topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /seat/updateSeat/{id}:
 *   put:
 *     summary: Seatni yangilash
 *     tags: [Seat]
 *     description: Seat ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Seat ID si
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
 *               sector_id:
 *                 type: string
 *                 description: Sektor ID (ObjectId)
 *               row_number:
 *                 type: number
 *                 description: Qator raqami
 *               number:
 *                 type: number
 *                 description: O'rindiq raqami
 *               venue_id:
 *                 type: string
 *                 description: Venue ID (ObjectId)
 *               seat_type_id:
 *                 type: string
 *                 description: O'rindiq turi ID (ObjectId)
 *               location_in_schema:
 *                 type: string
 *                 description: Sxemadagi joylashuvi
 *     responses:
 *       '200':
 *         description: Seat muvaffaqiyatli yangilandi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '404':
 *         description: Seat topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /seat/deleteSeat/{id}:
 *   delete:
 *     summary: Seatni o'chirish
 *     tags: [Seat]
 *     description: ID bo'yicha seatni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan seat ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Seat muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Seat topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

// Andoza yo'llari
seat.get("/getSeats", getSeats);
seat.get("/getUsers", getSeats);
seat.get("/getAll", getSeats);
seat.get("/", getSeats);

seat.get("/getUserById/:id", getSeatById);
seat.get("/getSeatById/:id", getSeatById);
seat.get("/getById/:id", getSeatById);
seat.get("/:id", getSeatById);

seat.get("/searchSeat", searchSeat);
seat.get("/searchUser", searchSeat);
seat.get("/search", searchSeat);

seat.post("/register", validateScheme(registerValidationSchema), postRegister);
seat.post("/create", validateScheme(registerValidationSchema), postRegister);

seat.put("/updateSeat/:id", validateScheme(updateValidationSchema), updateSeat);
seat.put("/updateUser/:id", validateScheme(updateValidationSchema), updateSeat);
seat.put("/update/:id", validateScheme(updateValidationSchema), updateSeat);

seat.delete("/deleteSeat/:id", deleteSeat);
seat.delete("/deleteUser/:id", deleteSeat);
seat.delete("/delete/:id", deleteSeat);
seat.delete("/:id", deleteSeat);

module.exports = {
  seat,
  router: seat,
  users: seat,
};
