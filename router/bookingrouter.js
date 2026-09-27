const { Router } = require("express");
const {
  postRegister,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  searchBooking,
} = require("../controller/Booking.controler");

const validateScheme = (schema) => (req, res, next) => {
  if (!schema) return next();
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }

  next();
};

const {
  createBookingValidationSchema: registerValidationSchema,
  updateBookingValidationSchema: updateValidationSchema,
} = require("../validation/bookingvalidation");

const booking = Router();

/**
 * @swagger
 * tags:
 *   name: Booking
 *   description: Bookinglarni boshqarish uchun endpointlar
 */

/**
 * @swagger
 * /booking/register:
 *   post:
 *     summary: Yangi booking ro'yxatdan o'tkazish / yaratish
 *     tags: [Booking]
 *     description: Yangi booking yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cart_id:
 *                 type: string
 *                 description: Savat ID (ObjectId)
 *               createdAt:
 *                 type: string
 *                 description: Yaratilgan vaqt
 *               finished:
 *                 type: string
 *                 description: Tugash vaqti
 *               payment_method_id:
 *                 type: string
 *                 description: To'lov usuli ID (ObjectId)
 *               delivery_method_id:
 *                 type: string
 *                 description: Yetkazib berish usuli ID (ObjectId)
 *               discount_id:
 *                 type: string
 *                 description: Chegirma ID (ObjectId)
 *               status_id:
 *                 type: string
 *                 description: Status ID (ObjectId)
 *     responses:
 *       '201':
 *         description: Booking muvaffaqiyatli yaratildi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /booking/getBookings:
 *   get:
 *     summary: Bookinglarni olish
 *     tags: [Booking]
 *     description: Barcha bookinglarni olish
 *     responses:
 *       '200':
 *         description: Bookinglar muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /booking/getUserById/{id}:
 *   get:
 *     summary: Booking ID bo'yicha olish
 *     tags: [Booking]
 *     description: ID bo'yicha bookingni topish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID bo'yicha bookingni topish
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Booking muvaffaqiyatli qaytarildi
 *       '404':
 *         description: Booking topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /booking/searchBooking:
 *   get:
 *     summary: Bookinglarni qidirish
 *     tags: [Booking]
 *     description: Qidiruv so'rovi orqali bookinglarni izlash
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
 *         description: Booking topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /booking/updateBooking/{id}:
 *   put:
 *     summary: Bookingni yangilash
 *     tags: [Booking]
 *     description: Booking ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Booking ID si
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
 *               cart_id:
 *                 type: string
 *                 description: Savat ID (ObjectId)
 *               createdAt:
 *                 type: string
 *                 description: Yaratilgan vaqt
 *               finished:
 *                 type: string
 *                 description: Tugash vaqti
 *               payment_method_id:
 *                 type: string
 *                 description: To'lov usuli ID (ObjectId)
 *               delivery_method_id:
 *                 type: string
 *                 description: Yetkazib berish usuli ID (ObjectId)
 *               discount_id:
 *                 type: string
 *                 description: Chegirma ID (ObjectId)
 *               status_id:
 *                 type: string
 *                 description: Status ID (ObjectId)
 *     responses:
 *       '200':
 *         description: Booking muvaffaqiyatli yangilandi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '404':
 *         description: Booking topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /booking/deleteBooking/{id}:
 *   delete:
 *     summary: Bookingni o'chirish
 *     tags: [Booking]
 *     description: ID bo'yicha bookingni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan booking ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Booking muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Booking topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

// Andoza yo'llari
booking.get("/getBookings", getBookings);
booking.get("/getUsers", getBookings);
booking.get("/getAll", getBookings);
booking.get("/", getBookings);

booking.get("/getUserById/:id", getBookingById);
booking.get("/getBookingById/:id", getBookingById);
booking.get("/getById/:id", getBookingById);
booking.get("/:id", getBookingById);

booking.get("/searchBooking", searchBooking);
booking.get("/searchUser", searchBooking);
booking.get("/search", searchBooking);

booking.post("/register", validateScheme(registerValidationSchema), postRegister);
booking.post("/create", validateScheme(registerValidationSchema), postRegister);

booking.put("/updateBooking/:id", validateScheme(updateValidationSchema), updateBooking);
booking.put("/updateUser/:id", validateScheme(updateValidationSchema), updateBooking);
booking.put("/update/:id", validateScheme(updateValidationSchema), updateBooking);

booking.delete("/deleteBooking/:id", deleteBooking);
booking.delete("/deleteUser/:id", deleteBooking);
booking.delete("/delete/:id", deleteBooking);
booking.delete("/:id", deleteBooking);

module.exports = {
  booking,
  router: booking,
  users: booking,
};
