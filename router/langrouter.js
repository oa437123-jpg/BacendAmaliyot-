const { Router } = require("express");
const {
  postRegister,
  getLangs,
  getLangById,
  updateLang,
  deleteLang,
  searchLang,
} = require("../controller/Lang.controler");

const validateScheme = (schema) => (req, res, next) => {
  if (!schema) return next();
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }

  next();
};

const {
  createLangValidationSchema: registerValidationSchema,
  updateLangValidationSchema: updateValidationSchema,
} = require("../validation/langvalidation");

const lang = Router();

/**
 * @swagger
 * tags:
 *   name: Lang
 *   description: Tillarni boshqarish uchun endpointlar
 */

/**
 * @swagger
 * /lang/register:
 *   post:
 *     summary: Yangi lang ro'yxatdan o'tkazish / yaratish
 *     tags: [Lang]
 *     description: Yangi lang yaratish
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
 *                 description: Til nomi
 *     responses:
 *       '201':
 *         description: Lang muvaffaqiyatli yaratildi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /lang/getLangs:
 *   get:
 *     summary: Langlarni olish
 *     tags: [Lang]
 *     description: Barcha langlarni olish
 *     responses:
 *       '200':
 *         description: Langlar muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /lang/getUserById/{id}:
 *   get:
 *     summary: Lang ID bo'yicha olish
 *     tags: [Lang]
 *     description: ID bo'yicha langni topish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID bo'yicha langni topish
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lang muvaffaqiyatli qaytarildi
 *       '404':
 *         description: Lang topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /lang/searchLang:
 *   get:
 *     summary: Langlarni qidirish
 *     tags: [Lang]
 *     description: Qidiruv so'rovi orqali langlarni izlash
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
 *         description: Lang topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /lang/updateLang/{id}:
 *   put:
 *     summary: Langni yangilash
 *     tags: [Lang]
 *     description: Lang ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Lang ID si
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
 *                 description: Til nomi
 *     responses:
 *       '200':
 *         description: Lang muvaffaqiyatli yangilandi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '404':
 *         description: Lang topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /lang/deleteLang/{id}:
 *   delete:
 *     summary: Langni o'chirish
 *     tags: [Lang]
 *     description: ID bo'yicha langni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan lang ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lang muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Lang topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

// Andoza yo'llari
lang.get("/getLangs", getLangs);
lang.get("/getUsers", getLangs);
lang.get("/getAll", getLangs);
lang.get("/", getLangs);

lang.get("/getUserById/:id", getLangById);
lang.get("/getLangById/:id", getLangById);
lang.get("/getById/:id", getLangById);
lang.get("/:id", getLangById);

lang.get("/searchLang", searchLang);
lang.get("/searchUser", searchLang);
lang.get("/search", searchLang);

lang.post("/register", validateScheme(registerValidationSchema), postRegister);
lang.post("/create", validateScheme(registerValidationSchema), postRegister);

lang.put("/updateLang/:id", validateScheme(updateValidationSchema), updateLang);
lang.put("/updateUser/:id", validateScheme(updateValidationSchema), updateLang);
lang.put("/update/:id", validateScheme(updateValidationSchema), updateLang);

lang.delete("/deleteLang/:id", deleteLang);
lang.delete("/deleteUser/:id", deleteLang);
lang.delete("/delete/:id", deleteLang);
lang.delete("/:id", deleteLang);

module.exports = {
  lang,
  router: lang,
  users: lang,
};
