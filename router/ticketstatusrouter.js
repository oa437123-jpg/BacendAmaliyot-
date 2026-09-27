const { Router } = require("express");
const {
  postRegister,
  getTicketStatuses,
  getTicketStatusById,
  updateTicketStatus,
  deleteTicketStatus,
  searchTicketStatus,
} = require("../controller/TicketStatus.controler");

const validateScheme = (schema) => (req, res, next) => {
  if (!schema) return next();
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }

  next();
};

const {
  createTicketStatusValidationSchema: registerValidationSchema,
  updateTicketStatusValidationSchema: updateValidationSchema,
} = require("../validation/ticketstatusvalidation");

const ticketStatus = Router();

/**
 * @swagger
 * tags:
 *   name: TicketStatus
 *   description: Chipta statuslarini boshqarish uchun endpointlar
 */

/**
 * @swagger
 * /ticketstatus/register:
 *   post:
 *     summary: Yangi ticketstatus ro'yxatdan o'tkazish / yaratish
 *     tags: [TicketStatus]
 *     description: Yangi ticketstatus yaratish
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
 *                 description: Chipta statusi nomi
 *     responses:
 *       '201':
 *         description: TicketStatus muvaffaqiyatli yaratildi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /ticketstatus/getTicketStatuses:
 *   get:
 *     summary: TicketStatuslarni olish
 *     tags: [TicketStatus]
 *     description: Barcha ticketstatuslarni olish
 *     responses:
 *       '200':
 *         description: TicketStatuslar muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /ticketstatus/getUserById/{id}:
 *   get:
 *     summary: TicketStatus ID bo'yicha olish
 *     tags: [TicketStatus]
 *     description: ID bo'yicha ticketstatusni topish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID bo'yicha ticketstatusni topish
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: TicketStatus muvaffaqiyatli qaytarildi
 *       '404':
 *         description: TicketStatus topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /ticketstatus/searchTicketStatus:
 *   get:
 *     summary: TicketStatuslarni qidirish
 *     tags: [TicketStatus]
 *     description: Qidiruv so'rovi orqali ticketstatuslarni izlash
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
 *         description: TicketStatus topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /ticketstatus/updateTicketStatus/{id}:
 *   put:
 *     summary: TicketStatusni yangilash
 *     tags: [TicketStatus]
 *     description: TicketStatus ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: TicketStatus ID si
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
 *                 description: Chipta statusi nomi
 *     responses:
 *       '200':
 *         description: TicketStatus muvaffaqiyatli yangilandi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '404':
 *         description: TicketStatus topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /ticketstatus/deleteTicketStatus/{id}:
 *   delete:
 *     summary: TicketStatusni o'chirish
 *     tags: [TicketStatus]
 *     description: ID bo'yicha ticketstatusni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan ticketstatus ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: TicketStatus muvaffaqiyatli o'chirildi
 *       '404':
 *         description: TicketStatus topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

// Andoza yo'llari
ticketStatus.get("/getTicketStatuses", getTicketStatuses);
ticketStatus.get("/getUsers", getTicketStatuses);
ticketStatus.get("/getAll", getTicketStatuses);
ticketStatus.get("/", getTicketStatuses);

ticketStatus.get("/getUserById/:id", getTicketStatusById);
ticketStatus.get("/getTicketStatusById/:id", getTicketStatusById);
ticketStatus.get("/getById/:id", getTicketStatusById);
ticketStatus.get("/:id", getTicketStatusById);

ticketStatus.get("/searchTicketStatus", searchTicketStatus);
ticketStatus.get("/searchUser", searchTicketStatus);
ticketStatus.get("/search", searchTicketStatus);

ticketStatus.post("/register", validateScheme(registerValidationSchema), postRegister);
ticketStatus.post("/create", validateScheme(registerValidationSchema), postRegister);

ticketStatus.put("/updateTicketStatus/:id", validateScheme(updateValidationSchema), updateTicketStatus);
ticketStatus.put("/updateUser/:id", validateScheme(updateValidationSchema), updateTicketStatus);
ticketStatus.put("/update/:id", validateScheme(updateValidationSchema), updateTicketStatus);

ticketStatus.delete("/deleteTicketStatus/:id", deleteTicketStatus);
ticketStatus.delete("/deleteUser/:id", deleteTicketStatus);
ticketStatus.delete("/delete/:id", deleteTicketStatus);
ticketStatus.delete("/:id", deleteTicketStatus);

module.exports = {
  ticketStatus,
  router: ticketStatus,
  users: ticketStatus,
};
