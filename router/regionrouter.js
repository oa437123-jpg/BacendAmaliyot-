const { Router } = require("express");
const {
  postRegister,
  getRegions,
  getRegionById,
  updateRegion,
  deleteRegion,
  searchRegion,
} = require("../controller/Region.controler");

const validateScheme = (schema) => (req, res, next) => {
  if (!schema) return next();
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }

  next();
};

const {
  createRegionValidationSchema: registerValidationSchema,
  updateRegionValidationSchema: updateValidationSchema,
} = require("../validation/regionvalidation");

const region = Router();

/**
 * @swagger
 * tags:
 *   name: Region
 *   description: Viloyatlarni boshqarish uchun endpointlar
 */

/**
 * @swagger
 * /region/register:
 *   post:
 *     summary: Yangi region ro'yxatdan o'tkazish / yaratish
 *     tags: [Region]
 *     description: Yangi region yaratish
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
 *                 description: Viloyat nomi
 *     responses:
 *       '201':
 *         description: Region muvaffaqiyatli yaratildi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /region/getRegions:
 *   get:
 *     summary: Regionlarni olish
 *     tags: [Region]
 *     description: Barcha regionlarni olish
 *     responses:
 *       '200':
 *         description: Regionlar muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /region/getUserById/{id}:
 *   get:
 *     summary: Region ID bo'yicha olish
 *     tags: [Region]
 *     description: ID bo'yicha regionni topish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID bo'yicha regionni topish
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Region muvaffaqiyatli qaytarildi
 *       '404':
 *         description: Region topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /region/searchRegion:
 *   get:
 *     summary: Regionlarni qidirish
 *     tags: [Region]
 *     description: Qidiruv so'rovi orqali regionlarni izlash
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
 *         description: Region topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /region/updateRegion/{id}:
 *   put:
 *     summary: Regionni yangilash
 *     tags: [Region]
 *     description: Region ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Region ID si
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
 *                 description: Viloyat nomi
 *     responses:
 *       '200':
 *         description: Region muvaffaqiyatli yangilandi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '404':
 *         description: Region topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /region/deleteRegion/{id}:
 *   delete:
 *     summary: Regionni o'chirish
 *     tags: [Region]
 *     description: ID bo'yicha regionni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan region ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Region muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Region topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

// Andoza yo'llari
region.get("/getRegions", getRegions);
region.get("/getUsers", getRegions);
region.get("/getAll", getRegions);
region.get("/", getRegions);

region.get("/getUserById/:id", getRegionById);
region.get("/getRegionById/:id", getRegionById);
region.get("/getById/:id", getRegionById);
region.get("/:id", getRegionById);

region.get("/searchRegion", searchRegion);
region.get("/searchUser", searchRegion);
region.get("/search", searchRegion);

region.post("/register", validateScheme(registerValidationSchema), postRegister);
region.post("/create", validateScheme(registerValidationSchema), postRegister);

region.put("/updateRegion/:id", validateScheme(updateValidationSchema), updateRegion);
region.put("/updateUser/:id", validateScheme(updateValidationSchema), updateRegion);
region.put("/update/:id", validateScheme(updateValidationSchema), updateRegion);

region.delete("/deleteRegion/:id", deleteRegion);
region.delete("/deleteUser/:id", deleteRegion);
region.delete("/delete/:id", deleteRegion);
region.delete("/:id", deleteRegion);

module.exports = {
  region,
  router: region,
  users: region,
};
