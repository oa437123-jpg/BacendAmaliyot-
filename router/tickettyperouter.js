const { Router } = require("express");
const {
  postRegister,
  getTicketTypes,
  getTicketTypeById,
  updateTicketType,
  deleteTicketType,
  searchTicketType,
} = require("../controller/TicketType.controler");

const validateScheme = (schema) => (req, res, next) => {
  if (!schema) return next();
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }

  next();
};

const {
  createTicketTypeValidationSchema: registerValidationSchema,
  updateTicketTypeValidationSchema: updateValidationSchema,
} = require("../validation/tickettypevalidation");

const ticketType = Router();

/**
 * @swagger
 * tags:
 *   name: TicketType
 *   description: Chipta turlarini boshqarish uchun endpointlar
 */

/**
 * @swagger
 * /tickettype/register:
 *   post:
 *     summary: Yangi tickettype ro'yxatdan o'tkazish / yaratish
 *     tags: [TicketType]
 *     description: Yangi tickettype yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               ticket_type:
 *                 type: string
 *                 description: Chipta turi turi
 *               name:
 *                 type: string
 *                 description: Chipta turi nomi
 *               color:
 *                 type: string
 *                 description: Rangi
 *     responses:
 *       '201':
 *         description: TicketType muvaffaqiyatli yaratildi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /tickettype/getTicketTypes:
 *   get:
 *     summary: TicketTypelarni olish
 *     tags: [TicketType]
 *     description: Barcha tickettypelarni olish
 *     responses:
 *       '200':
 *         description: TicketTypelar muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /tickettype/getUserById/{id}:
 *   get:
 *     summary: TicketType ID bo'yicha olish
 *     tags: [TicketType]
 *     description: ID bo'yicha tickettypeni topish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID bo'yicha tickettypeni topish
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: TicketType muvaffaqiyatli qaytarildi
 *       '404':
 *         description: TicketType topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /tickettype/searchTicketType:
 *   get:
 *     summary: TicketTypelarni qidirish
 *     tags: [TicketType]
 *     description: Qidiruv so'rovi orqali tickettypelarni izlash
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
 *         description: TicketType topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /tickettype/updateTicketType/{id}:
 *   put:
 *     summary: TicketTypeni yangilash
 *     tags: [TicketType]
 *     description: TicketType ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: TicketType ID si
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
 *               ticket_type:
 *                 type: string
 *                 description: Chipta turi turi
 *               name:
 *                 type: string
 *                 description: Chipta turi nomi
 *               color:
 *                 type: string
 *                 description: Rangi
 *     responses:
 *       '200':
 *         description: TicketType muvaffaqiyatli yangilandi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '404':
 *         description: TicketType topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /tickettype/deleteTicketType/{id}:
 *   delete:
 *     summary: TicketTypeni o'chirish
 *     tags: [TicketType]
 *     description: ID bo'yicha tickettypeni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan tickettype ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: TicketType muvaffaqiyatli o'chirildi
 *       '404':
 *         description: TicketType topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

// Andoza yo'llari
ticketType.get("/getTicketTypes", getTicketTypes);
ticketType.get("/getUsers", getTicketTypes);
ticketType.get("/getAll", getTicketTypes);
ticketType.get("/", getTicketTypes);

ticketType.get("/getUserById/:id", getTicketTypeById);
ticketType.get("/getTicketTypeById/:id", getTicketTypeById);
ticketType.get("/getById/:id", getTicketTypeById);
ticketType.get("/:id", getTicketTypeById);

ticketType.get("/searchTicketType", searchTicketType);
ticketType.get("/searchUser", searchTicketType);
ticketType.get("/search", searchTicketType);

ticketType.post("/register", validateScheme(registerValidationSchema), postRegister);
ticketType.post("/create", validateScheme(registerValidationSchema), postRegister);

ticketType.put("/updateTicketType/:id", validateScheme(updateValidationSchema), updateTicketType);
ticketType.put("/updateUser/:id", validateScheme(updateValidationSchema), updateTicketType);
ticketType.put("/update/:id", validateScheme(updateValidationSchema), updateTicketType);

ticketType.delete("/deleteTicketType/:id", deleteTicketType);
ticketType.delete("/deleteUser/:id", deleteTicketType);
ticketType.delete("/delete/:id", deleteTicketType);
ticketType.delete("/:id", deleteTicketType);

module.exports = {
  ticketType,
  router: ticketType,
  users: ticketType,
};
