const { Router } = require("express");
const {
  postRegister,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  searchEvent,
} = require("../controller/Event.controler");

const validateScheme = (schema) => (req, res, next) => {
  if (!schema) return next();
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }

  next();
};

const {
  createEventValidationSchema: registerValidationSchema,
  updateEventValidationSchema: updateValidationSchema,
} = require("../validation/eventvalidation");

const event = Router();

/**
 * @swagger
 * tags:
 *   name: Event
 *   description: Tadbirlarni boshqarish uchun endpointlar
 */

/**
 * @swagger
 * /event/register:
 *   post:
 *     summary: Yangi event ro'yxatdan o'tkazish / yaratish
 *     tags: [Event]
 *     description: Yangi event yaratish
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
 *                 description: Tadbir nomi
 *               photo:
 *                 type: string
 *                 description: Tadbir rasmi URL
 *               start_date:
 *                 type: string
 *                 description: Boshlanish sanasi (YYYY-MM-DD)
 *               start_time:
 *                 type: string
 *                 description: Boshlanish vaqti
 *               finish_date:
 *                 type: string
 *                 description: Tugash sanasi (YYYY-MM-DD)
 *               finish_time:
 *                 type: string
 *                 description: Tugash vaqti
 *               info:
 *                 type: string
 *                 description: Tadbir haqida ma'lumot
 *               event_type_id:
 *                 type: string
 *                 description: Tadbir turi ID (ObjectId)
 *               human_category_id:
 *                 type: string
 *                 description: Inson toifasi ID (ObjectId)
 *               venue_id:
 *                 type: string
 *                 description: Venue ID (ObjectId)
 *               lang_id:
 *                 type: string
 *                 description: Til ID (ObjectId)
 *               release_date:
 *                 type: string
 *                 description: Chiqarilgan sana (YYYY-MM-DD)
 *     responses:
 *       '201':
 *         description: Event muvaffaqiyatli yaratildi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /event/getEvents:
 *   get:
 *     summary: Eventlarni olish
 *     tags: [Event]
 *     description: Barcha eventlarni olish
 *     responses:
 *       '200':
 *         description: Eventlar muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /event/getUserById/{id}:
 *   get:
 *     summary: Event ID bo'yicha olish
 *     tags: [Event]
 *     description: ID bo'yicha eventni topish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID bo'yicha eventni topish
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Event muvaffaqiyatli qaytarildi
 *       '404':
 *         description: Event topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /event/searchEvent:
 *   get:
 *     summary: Eventlarni qidirish
 *     tags: [Event]
 *     description: Qidiruv so'rovi orqali eventlarni izlash
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
 *         description: Event topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /event/updateEvent/{id}:
 *   put:
 *     summary: Eventni yangilash
 *     tags: [Event]
 *     description: Event ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Event ID si
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
 *                 description: Tadbir nomi
 *               photo:
 *                 type: string
 *                 description: Tadbir rasmi URL
 *               start_date:
 *                 type: string
 *                 description: Boshlanish sanasi (YYYY-MM-DD)
 *               start_time:
 *                 type: string
 *                 description: Boshlanish vaqti
 *               finish_date:
 *                 type: string
 *                 description: Tugash sanasi (YYYY-MM-DD)
 *               finish_time:
 *                 type: string
 *                 description: Tugash vaqti
 *               info:
 *                 type: string
 *                 description: Tadbir haqida ma'lumot
 *               event_type_id:
 *                 type: string
 *                 description: Tadbir turi ID (ObjectId)
 *               human_category_id:
 *                 type: string
 *                 description: Inson toifasi ID (ObjectId)
 *               venue_id:
 *                 type: string
 *                 description: Venue ID (ObjectId)
 *               lang_id:
 *                 type: string
 *                 description: Til ID (ObjectId)
 *               release_date:
 *                 type: string
 *                 description: Chiqarilgan sana (YYYY-MM-DD)
 *     responses:
 *       '200':
 *         description: Event muvaffaqiyatli yangilandi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '404':
 *         description: Event topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /event/deleteEvent/{id}:
 *   delete:
 *     summary: Eventni o'chirish
 *     tags: [Event]
 *     description: ID bo'yicha eventni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan event ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Event muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Event topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

// Andoza yo'llari
event.get("/getEvents", getEvents);
event.get("/getUsers", getEvents);
event.get("/getAll", getEvents);
event.get("/", getEvents);

event.get("/getUserById/:id", getEventById);
event.get("/getEventById/:id", getEventById);
event.get("/getById/:id", getEventById);
event.get("/:id", getEventById);

event.get("/searchEvent", searchEvent);
event.get("/searchUser", searchEvent);
event.get("/search", searchEvent);

event.post("/register", validateScheme(registerValidationSchema), postRegister);
event.post("/create", validateScheme(registerValidationSchema), postRegister);

event.put("/updateEvent/:id", validateScheme(updateValidationSchema), updateEvent);
event.put("/updateUser/:id", validateScheme(updateValidationSchema), updateEvent);
event.put("/update/:id", validateScheme(updateValidationSchema), updateEvent);

event.delete("/deleteEvent/:id", deleteEvent);
event.delete("/deleteUser/:id", deleteEvent);
event.delete("/delete/:id", deleteEvent);
event.delete("/:id", deleteEvent);

module.exports = {
  event,
  router: event,
  users: event,
};
