const { Router } = require("express");
const {
  postRegister,
  getEventTypes,
  getEventTypeById,
  updateEventType,
  deleteEventType,
  searchEventType,
} = require("../controller/EventType.controler");

const validateScheme = (schema) => (req, res, next) => {
  if (!schema) return next();
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }

  next();
};

const {
  createEventTypeValidationSchema: registerValidationSchema,
  updateEventTypeValidationSchema: updateValidationSchema,
} = require("../validation/eventtypevalidation");

const eventType = Router();

/**
 * @swagger
 * tags:
 *   name: EventType
 *   description: Tadbir turlarini boshqarish uchun endpointlar
 */

/**
 * @swagger
 * /eventtype/register:
 *   post:
 *     summary: Yangi eventtype ro'yxatdan o'tkazish / yaratish
 *     tags: [EventType]
 *     description: Yangi eventtype yaratish
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
 *                 description: Tadbir turi nomi
 *               parent_event_type_id:
 *                 type: string
 *                 description: Asosiy tadbir turi ID (ObjectId)
 *     responses:
 *       '201':
 *         description: EventType muvaffaqiyatli yaratildi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /eventtype/getEventTypes:
 *   get:
 *     summary: EventTypelarni olish
 *     tags: [EventType]
 *     description: Barcha eventtypelarni olish
 *     responses:
 *       '200':
 *         description: EventTypelar muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /eventtype/getUserById/{id}:
 *   get:
 *     summary: EventType ID bo'yicha olish
 *     tags: [EventType]
 *     description: ID bo'yicha eventtypeni topish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID bo'yicha eventtypeni topish
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: EventType muvaffaqiyatli qaytarildi
 *       '404':
 *         description: EventType topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /eventtype/searchEventType:
 *   get:
 *     summary: EventTypelarni qidirish
 *     tags: [EventType]
 *     description: Qidiruv so'rovi orqali eventtypelarni izlash
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
 *         description: EventType topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /eventtype/updateEventType/{id}:
 *   put:
 *     summary: EventTypeni yangilash
 *     tags: [EventType]
 *     description: EventType ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: EventType ID si
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
 *                 description: Tadbir turi nomi
 *               parent_event_type_id:
 *                 type: string
 *                 description: Asosiy tadbir turi ID (ObjectId)
 *     responses:
 *       '200':
 *         description: EventType muvaffaqiyatli yangilandi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '404':
 *         description: EventType topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /eventtype/deleteEventType/{id}:
 *   delete:
 *     summary: EventTypeni o'chirish
 *     tags: [EventType]
 *     description: ID bo'yicha eventtypeni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan eventtype ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: EventType muvaffaqiyatli o'chirildi
 *       '404':
 *         description: EventType topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

// Andoza yo'llari
eventType.get("/getEventTypes", getEventTypes);
eventType.get("/getUsers", getEventTypes);
eventType.get("/getAll", getEventTypes);
eventType.get("/", getEventTypes);

eventType.get("/getUserById/:id", getEventTypeById);
eventType.get("/getEventTypeById/:id", getEventTypeById);
eventType.get("/getById/:id", getEventTypeById);
eventType.get("/:id", getEventTypeById);

eventType.get("/searchEventType", searchEventType);
eventType.get("/searchUser", searchEventType);
eventType.get("/search", searchEventType);

eventType.post("/register", validateScheme(registerValidationSchema), postRegister);
eventType.post("/create", validateScheme(registerValidationSchema), postRegister);

eventType.put("/updateEventType/:id", validateScheme(updateValidationSchema), updateEventType);
eventType.put("/updateUser/:id", validateScheme(updateValidationSchema), updateEventType);
eventType.put("/update/:id", validateScheme(updateValidationSchema), updateEventType);

eventType.delete("/deleteEventType/:id", deleteEventType);
eventType.delete("/deleteUser/:id", deleteEventType);
eventType.delete("/delete/:id", deleteEventType);
eventType.delete("/:id", deleteEventType);

module.exports = {
  eventType,
  router: eventType,
  users: eventType,
};
