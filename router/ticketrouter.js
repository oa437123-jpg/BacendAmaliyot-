const { Router } = require("express");
const {
  postRegister,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
  searchTicket,
} = require("../controller/Ticket.controler");

const validateScheme = (schema) => (req, res, next) => {
  if (!schema) return next();
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }

  next();
};

const {
  createTicketValidationSchema: registerValidationSchema,
  updateTicketValidationSchema: updateValidationSchema,
} = require("../validation/ticketvalidation");

const ticket = Router();

/**
 * @swagger
 * tags:
 *   name: Ticket
 *   description: Chiptalarni boshqarish uchun endpointlar
 */

/**
 * @swagger
 * /ticket/register:
 *   post:
 *     summary: Yangi ticket ro'yxatdan o'tkazish / yaratish
 *     tags: [Ticket]
 *     description: Yangi ticket yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               event_id:
 *                 type: string
 *                 description: Tadbir ID (ObjectId)
 *               seat_id:
 *                 type: string
 *                 description: O'rindiq ID (ObjectId)
 *               price:
 *                 type: number
 *                 description: Chipta narxi
 *               service_fee:
 *                 type: number
 *                 description: Xizmat haqi
 *               status_id:
 *                 type: string
 *                 description: Status ID (ObjectId)
 *               ticket_type_id:
 *                 type: string
 *                 description: Chipta turi ID (ObjectId)
 *     responses:
 *       '201':
 *         description: Ticket muvaffaqiyatli yaratildi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /ticket/getTickets:
 *   get:
 *     summary: Ticketlarni olish
 *     tags: [Ticket]
 *     description: Barcha ticketlarni olish
 *     responses:
 *       '200':
 *         description: Ticketlar muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /ticket/getUserById/{id}:
 *   get:
 *     summary: Ticket ID bo'yicha olish
 *     tags: [Ticket]
 *     description: ID bo'yicha ticketni topish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID bo'yicha ticketni topish
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Ticket muvaffaqiyatli qaytarildi
 *       '404':
 *         description: Ticket topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /ticket/searchTicket:
 *   get:
 *     summary: Ticketlarni qidirish
 *     tags: [Ticket]
 *     description: Qidiruv so'rovi orqali ticketlarni izlash
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
 *         description: Ticket topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /ticket/updateTicket/{id}:
 *   put:
 *     summary: Ticketni yangilash
 *     tags: [Ticket]
 *     description: Ticket ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Ticket ID si
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
 *               event_id:
 *                 type: string
 *                 description: Tadbir ID (ObjectId)
 *               seat_id:
 *                 type: string
 *                 description: O'rindiq ID (ObjectId)
 *               price:
 *                 type: number
 *                 description: Chipta narxi
 *               service_fee:
 *                 type: number
 *                 description: Xizmat haqi
 *               status_id:
 *                 type: string
 *                 description: Status ID (ObjectId)
 *               ticket_type_id:
 *                 type: string
 *                 description: Chipta turi ID (ObjectId)
 *     responses:
 *       '200':
 *         description: Ticket muvaffaqiyatli yangilandi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '404':
 *         description: Ticket topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /ticket/deleteTicket/{id}:
 *   delete:
 *     summary: Ticketni o'chirish
 *     tags: [Ticket]
 *     description: ID bo'yicha ticketni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan ticket ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Ticket muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Ticket topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

// Andoza yo'llari
ticket.get("/getTickets", getTickets);
ticket.get("/getUsers", getTickets);
ticket.get("/getAll", getTickets);
ticket.get("/", getTickets);

ticket.get("/getUserById/:id", getTicketById);
ticket.get("/getTicketById/:id", getTicketById);
ticket.get("/getById/:id", getTicketById);
ticket.get("/:id", getTicketById);

ticket.get("/searchTicket", searchTicket);
ticket.get("/searchUser", searchTicket);
ticket.get("/search", searchTicket);

ticket.post("/register", validateScheme(registerValidationSchema), postRegister);
ticket.post("/create", validateScheme(registerValidationSchema), postRegister);

ticket.put("/updateTicket/:id", validateScheme(updateValidationSchema), updateTicket);
ticket.put("/updateUser/:id", validateScheme(updateValidationSchema), updateTicket);
ticket.put("/update/:id", validateScheme(updateValidationSchema), updateTicket);

ticket.delete("/deleteTicket/:id", deleteTicket);
ticket.delete("/deleteUser/:id", deleteTicket);
ticket.delete("/delete/:id", deleteTicket);
ticket.delete("/:id", deleteTicket);

module.exports = {
  ticket,
  router: ticket,
  users: ticket,
};
