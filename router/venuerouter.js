const { Router } = require("express");
const {
  postRegister,
  getVenues,
  getVenueById,
  updateVenue,
  deleteVenue,
  searchVenue,
} = require("../controller/Venue.controler");

const validateScheme = (schema) => (req, res, next) => {
  if (!schema) return next();
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }

  next();
};

const {
  createVenueValidationSchema: registerValidationSchema,
  updateVenueValidationSchema: updateValidationSchema,
} = require("../validation/venuevalidation");

const venue = Router();

/**
 * @swagger
 * tags:
 *   name: Venue
 *   description: Joylashuvlarni (venuelarni) boshqarish uchun endpointlar
 */

/**
 * @swagger
 * /venue/register:
 *   post:
 *     summary: Yangi venue ro'yxatdan o'tkazish / yaratish
 *     tags: [Venue]
 *     description: Yangi venue yaratish
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
 *                 description: Joylashuv nomi
 *               address:
 *                 type: string
 *                 description: Manzili
 *               location:
 *                 type: string
 *                 description: Joylashuvi
 *               site:
 *                 type: string
 *                 description: Sayt manzili
 *               phone:
 *                 type: string
 *                 description: Telefon raqami
 *               schema:
 *                 type: string
 *                 description: Joylashuv sxemasi
 *               region_id:
 *                 type: string
 *                 description: Viloyat ID (ObjectId)
 *               district_id:
 *                 type: string
 *                 description: Tuman ID (ObjectId)
 *     responses:
 *       '201':
 *         description: Venue muvaffaqiyatli yaratildi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /venue/getVenues:
 *   get:
 *     summary: Venuelarni olish
 *     tags: [Venue]
 *     description: Barcha venuelarni olish
 *     responses:
 *       '200':
 *         description: Venuelar muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /venue/getUserById/{id}:
 *   get:
 *     summary: Venue ID bo'yicha olish
 *     tags: [Venue]
 *     description: ID bo'yicha venueni topish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID bo'yicha venueni topish
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Venue muvaffaqiyatli qaytarildi
 *       '404':
 *         description: Venue topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /venue/searchVenue:
 *   get:
 *     summary: Venuelarni qidirish
 *     tags: [Venue]
 *     description: Qidiruv so'rovi orqali venuelarni izlash
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
 *         description: Venue topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /venue/updateVenue/{id}:
 *   put:
 *     summary: Venueni yangilash
 *     tags: [Venue]
 *     description: Venue ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Venue ID si
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
 *                 description: Joylashuv nomi
 *               address:
 *                 type: string
 *                 description: Manzili
 *               location:
 *                 type: string
 *                 description: Joylashuvi
 *               site:
 *                 type: string
 *                 description: Sayt manzili
 *               phone:
 *                 type: string
 *                 description: Telefon raqami
 *               schema:
 *                 type: string
 *                 description: Joylashuv sxemasi
 *               region_id:
 *                 type: string
 *                 description: Viloyat ID (ObjectId)
 *               district_id:
 *                 type: string
 *                 description: Tuman ID (ObjectId)
 *     responses:
 *       '200':
 *         description: Venue muvaffaqiyatli yangilandi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '404':
 *         description: Venue topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /venue/deleteVenue/{id}:
 *   delete:
 *     summary: Venueni o'chirish
 *     tags: [Venue]
 *     description: ID bo'yicha venueni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan venue ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Venue muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Venue topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

// Andoza yo'llari
venue.get("/getVenues", getVenues);
venue.get("/getUsers", getVenues);
venue.get("/getAll", getVenues);
venue.get("/", getVenues);

venue.get("/getUserById/:id", getVenueById);
venue.get("/getVenueById/:id", getVenueById);
venue.get("/getById/:id", getVenueById);
venue.get("/:id", getVenueById);

venue.get("/searchVenue", searchVenue);
venue.get("/searchUser", searchVenue);
venue.get("/search", searchVenue);

venue.post("/register", validateScheme(registerValidationSchema), postRegister);
venue.post("/create", validateScheme(registerValidationSchema), postRegister);

venue.put("/updateVenue/:id", validateScheme(updateValidationSchema), updateVenue);
venue.put("/updateUser/:id", validateScheme(updateValidationSchema), updateVenue);
venue.put("/update/:id", validateScheme(updateValidationSchema), updateVenue);

venue.delete("/deleteVenue/:id", deleteVenue);
venue.delete("/deleteUser/:id", deleteVenue);
venue.delete("/delete/:id", deleteVenue);
venue.delete("/:id", deleteVenue);

module.exports = {
  venue,
  router: venue,
  users: venue,
};
