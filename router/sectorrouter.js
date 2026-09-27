const { Router } = require("express");
const {
  postRegister,
  getSectors,
  getSectorById,
  updateSector,
  deleteSector,
  searchSector,
} = require("../controller/Sector.controler");

const validateScheme = (schema) => (req, res, next) => {
  if (!schema) return next();
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }

  next();
};

const {
  createSectorValidationSchema: registerValidationSchema,
  updateSectorValidationSchema: updateValidationSchema,
} = require("../validation/sectorvalidation");

const sector = Router();

/**
 * @swagger
 * tags:
 *   name: Sector
 *   description: Sektorlarni boshqarish uchun endpointlar
 */

/**
 * @swagger
 * /sector/register:
 *   post:
 *     summary: Yangi sector ro'yxatdan o'tkazish / yaratish
 *     tags: [Sector]
 *     description: Yangi sector yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sector_name
 *             properties:
 *               sector_name:
 *                 type: string
 *                 description: Sektor nomi
 *     responses:
 *       '201':
 *         description: Sector muvaffaqiyatli yaratildi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /sector/getSectors:
 *   get:
 *     summary: Sectorlarni olish
 *     tags: [Sector]
 *     description: Barcha sectorlarni olish
 *     responses:
 *       '200':
 *         description: Sectorlar muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /sector/getUserById/{id}:
 *   get:
 *     summary: Sector ID bo'yicha olish
 *     tags: [Sector]
 *     description: ID bo'yicha sectorni topish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID bo'yicha sectorni topish
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Sector muvaffaqiyatli qaytarildi
 *       '404':
 *         description: Sector topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /sector/searchSector:
 *   get:
 *     summary: Sectorlarni qidirish
 *     tags: [Sector]
 *     description: Qidiruv so'rovi orqali sectorlarni izlash
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
 *         description: Sector topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /sector/updateSector/{id}:
 *   put:
 *     summary: Sectorni yangilash
 *     tags: [Sector]
 *     description: Sector ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Sector ID si
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
 *               sector_name:
 *                 type: string
 *                 description: Sektor nomi
 *     responses:
 *       '200':
 *         description: Sector muvaffaqiyatli yangilandi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '404':
 *         description: Sector topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /sector/deleteSector/{id}:
 *   delete:
 *     summary: Sectorni o'chirish
 *     tags: [Sector]
 *     description: ID bo'yicha sectorni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan sector ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Sector muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Sector topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

// Andoza yo'llari
sector.get("/getSectors", getSectors);
sector.get("/getUsers", getSectors);
sector.get("/getAll", getSectors);
sector.get("/", getSectors);

sector.get("/getUserById/:id", getSectorById);
sector.get("/getSectorById/:id", getSectorById);
sector.get("/getById/:id", getSectorById);
sector.get("/:id", getSectorById);

sector.get("/searchSector", searchSector);
sector.get("/searchUser", searchSector);
sector.get("/search", searchSector);

sector.post("/register", validateScheme(registerValidationSchema), postRegister);
sector.post("/create", validateScheme(registerValidationSchema), postRegister);

sector.put("/updateSector/:id", validateScheme(updateValidationSchema), updateSector);
sector.put("/updateUser/:id", validateScheme(updateValidationSchema), updateSector);
sector.put("/update/:id", validateScheme(updateValidationSchema), updateSector);

sector.delete("/deleteSector/:id", deleteSector);
sector.delete("/deleteUser/:id", deleteSector);
sector.delete("/delete/:id", deleteSector);
sector.delete("/:id", deleteSector);

module.exports = {
  sector,
  router: sector,
  users: sector,
};
