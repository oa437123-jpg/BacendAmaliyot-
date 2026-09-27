const { Router } = require("express");
const {
  postRegister,
  getVenueTypes,
  getVenueTypesById,
  updateVenueTypes,
  deleteVenueTypes,
  searchVenueTypes,
} = require("../controller/VenueTypes.controler");

const validateScheme = (schema) => (req, res, next) => {
  if (!schema) return next();
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }

  next();
};

const {
  createVenueTypesValidationSchema: registerValidationSchema,
  updateVenueTypesValidationSchema: updateValidationSchema,
} = require("../validation/venuetypesvalidation");

const venueTypes = Router();

/**
 * @swagger
 * tags:
 *   name: VenueTypes
 *   description: Venue turlarini boshqarish uchun endpointlar
 */

/**
 * @swagger
 * /venuetypes/register:
 *   post:
 *     summary: Yangi venuetypes ro'yxatdan o'tkazish / yaratish
 *     tags: [VenueTypes]
 *     description: Yangi venuetypes yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               venue_id:
 *                 type: string
 *                 description: Venue ID (ObjectId)
 *               type_id:
 *                 type: string
 *                 description: Tur ID (ObjectId)
 *     responses:
 *       '201':
 *         description: VenueTypes muvaffaqiyatli yaratildi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /venuetypes/getVenueTypes:
 *   get:
 *     summary: VenueTypeslarni olish
 *     tags: [VenueTypes]
 *     description: Barcha venuetypeslarni olish
 *     responses:
 *       '200':
 *         description: VenueTypeslar muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /venuetypes/getUserById/{id}:
 *   get:
 *     summary: VenueTypes ID bo'yicha olish
 *     tags: [VenueTypes]
 *     description: ID bo'yicha venuetypesni topish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID bo'yicha venuetypesni topish
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: VenueTypes muvaffaqiyatli qaytarildi
 *       '404':
 *         description: VenueTypes topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /venuetypes/searchVenueTypes:
 *   get:
 *     summary: VenueTypeslarni qidirish
 *     tags: [VenueTypes]
 *     description: Qidiruv so'rovi orqali venuetypeslarni izlash
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
 *         description: VenueTypes topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /venuetypes/updateVenueTypes/{id}:
 *   put:
 *     summary: VenueTypesni yangilash
 *     tags: [VenueTypes]
 *     description: VenueTypes ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: VenueTypes ID si
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
 *               venue_id:
 *                 type: string
 *                 description: Venue ID (ObjectId)
 *               type_id:
 *                 type: string
 *                 description: Tur ID (ObjectId)
 *     responses:
 *       '200':
 *         description: VenueTypes muvaffaqiyatli yangilandi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '404':
 *         description: VenueTypes topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /venuetypes/deleteVenueTypes/{id}:
 *   delete:
 *     summary: VenueTypesni o'chirish
 *     tags: [VenueTypes]
 *     description: ID bo'yicha venuetypesni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan venuetypes ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: VenueTypes muvaffaqiyatli o'chirildi
 *       '404':
 *         description: VenueTypes topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

// Andoza yo'llari
venueTypes.get("/getVenueTypes", getVenueTypes);
venueTypes.get("/getUsers", getVenueTypes);
venueTypes.get("/getAll", getVenueTypes);
venueTypes.get("/", getVenueTypes);

venueTypes.get("/getUserById/:id", getVenueTypesById);
venueTypes.get("/getVenueTypesById/:id", getVenueTypesById);
venueTypes.get("/getById/:id", getVenueTypesById);
venueTypes.get("/:id", getVenueTypesById);

venueTypes.get("/searchVenueTypes", searchVenueTypes);
venueTypes.get("/searchUser", searchVenueTypes);
venueTypes.get("/search", searchVenueTypes);

venueTypes.post("/register", validateScheme(registerValidationSchema), postRegister);
venueTypes.post("/create", validateScheme(registerValidationSchema), postRegister);

venueTypes.put("/updateVenueTypes/:id", validateScheme(updateValidationSchema), updateVenueTypes);
venueTypes.put("/updateUser/:id", validateScheme(updateValidationSchema), updateVenueTypes);
venueTypes.put("/update/:id", validateScheme(updateValidationSchema), updateVenueTypes);

venueTypes.delete("/deleteVenueTypes/:id", deleteVenueTypes);
venueTypes.delete("/deleteUser/:id", deleteVenueTypes);
venueTypes.delete("/delete/:id", deleteVenueTypes);
venueTypes.delete("/:id", deleteVenueTypes);

module.exports = {
  venueTypes,
  router: venueTypes,
  users: venueTypes,
};
