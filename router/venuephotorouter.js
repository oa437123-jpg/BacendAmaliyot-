const { Router } = require("express");
const {
  postRegister,
  getVenuePhotos,
  getVenuePhotoById,
  updateVenuePhoto,
  deleteVenuePhoto,
  searchVenuePhoto,
} = require("../controller/VenuePhoto.controler");

const validateScheme = (schema) => (req, res, next) => {
  if (!schema) return next();
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }

  next();
};

const {
  createVenuePhotoValidationSchema: registerValidationSchema,
  updateVenuePhotoValidationSchema: updateValidationSchema,
} = require("../validation/venuephotovalidation");

const venuePhoto = Router();

/**
 * @swagger
 * tags:
 *   name: VenuePhoto
 *   description: Venue rasmlarini boshqarish uchun endpointlar
 */

/**
 * @swagger
 * /venuephoto/register:
 *   post:
 *     summary: Yangi venuephoto ro'yxatdan o'tkazish / yaratish
 *     tags: [VenuePhoto]
 *     description: Yangi venuephoto yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - url
 *             properties:
 *               venue_id:
 *                 type: string
 *                 description: Venue ID (ObjectId)
 *               url:
 *                 type: string
 *                 description: Rasm URL manzili
 *     responses:
 *       '201':
 *         description: VenuePhoto muvaffaqiyatli yaratildi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /venuephoto/getVenuePhotos:
 *   get:
 *     summary: VenuePhotolarni olish
 *     tags: [VenuePhoto]
 *     description: Barcha venuephotolarni olish
 *     responses:
 *       '200':
 *         description: VenuePhotolar muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /venuephoto/getUserById/{id}:
 *   get:
 *     summary: VenuePhoto ID bo'yicha olish
 *     tags: [VenuePhoto]
 *     description: ID bo'yicha venuephotoni topish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID bo'yicha venuephotoni topish
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: VenuePhoto muvaffaqiyatli qaytarildi
 *       '404':
 *         description: VenuePhoto topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /venuephoto/searchVenuePhoto:
 *   get:
 *     summary: VenuePhotolarni qidirish
 *     tags: [VenuePhoto]
 *     description: Qidiruv so'rovi orqali venuephotolarni izlash
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
 *         description: VenuePhoto topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /venuephoto/updateVenuePhoto/{id}:
 *   put:
 *     summary: VenuePhotoni yangilash
 *     tags: [VenuePhoto]
 *     description: VenuePhoto ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: VenuePhoto ID si
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
 *               url:
 *                 type: string
 *                 description: Rasm URL manzili
 *     responses:
 *       '200':
 *         description: VenuePhoto muvaffaqiyatli yangilandi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '404':
 *         description: VenuePhoto topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /venuephoto/deleteVenuePhoto/{id}:
 *   delete:
 *     summary: VenuePhotoni o'chirish
 *     tags: [VenuePhoto]
 *     description: ID bo'yicha venuephotoni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan venuephoto ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: VenuePhoto muvaffaqiyatli o'chirildi
 *       '404':
 *         description: VenuePhoto topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

// Andoza yo'llari
venuePhoto.get("/getVenuePhotos", getVenuePhotos);
venuePhoto.get("/getUsers", getVenuePhotos);
venuePhoto.get("/getAll", getVenuePhotos);
venuePhoto.get("/", getVenuePhotos);

venuePhoto.get("/getUserById/:id", getVenuePhotoById);
venuePhoto.get("/getVenuePhotoById/:id", getVenuePhotoById);
venuePhoto.get("/getById/:id", getVenuePhotoById);
venuePhoto.get("/:id", getVenuePhotoById);

venuePhoto.get("/searchVenuePhoto", searchVenuePhoto);
venuePhoto.get("/searchUser", searchVenuePhoto);
venuePhoto.get("/search", searchVenuePhoto);

venuePhoto.post("/register", validateScheme(registerValidationSchema), postRegister);
venuePhoto.post("/create", validateScheme(registerValidationSchema), postRegister);

venuePhoto.put("/updateVenuePhoto/:id", validateScheme(updateValidationSchema), updateVenuePhoto);
venuePhoto.put("/updateUser/:id", validateScheme(updateValidationSchema), updateVenuePhoto);
venuePhoto.put("/update/:id", validateScheme(updateValidationSchema), updateVenuePhoto);

venuePhoto.delete("/deleteVenuePhoto/:id", deleteVenuePhoto);
venuePhoto.delete("/deleteUser/:id", deleteVenuePhoto);
venuePhoto.delete("/delete/:id", deleteVenuePhoto);
venuePhoto.delete("/:id", deleteVenuePhoto);

module.exports = {
  venuePhoto,
  router: venuePhoto,
  users: venuePhoto,
};
