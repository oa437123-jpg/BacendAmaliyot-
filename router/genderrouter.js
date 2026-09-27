const { Router } = require("express");
const {
  postRegister,
  getGenders,
  getGenderById,
  updateGender,
  deleteGender,
  searchGender,
} = require("../controller/Gender.controler");

const validateScheme = (schema) => (req, res, next) => {
  if (!schema) return next();
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }

  next();
};

const {
  createGenderValidationSchema: registerValidationSchema,
  updateGenderValidationSchema: updateValidationSchema,
} = require("../validation/gendervalidation");

const gender = Router();

/**
 * @swagger
 * tags:
 *   name: Gender
 *   description: Jinslarni boshqarish uchun endpointlar
 */

/**
 * @swagger
 * /gender/register:
 *   post:
 *     summary: Yangi gender ro'yxatdan o'tkazish / yaratish
 *     tags: [Gender]
 *     description: Yangi gender yaratish
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
 *                 description: Jins nomi
 *     responses:
 *       '201':
 *         description: Gender muvaffaqiyatli yaratildi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /gender/getGenders:
 *   get:
 *     summary: Genderlarni olish
 *     tags: [Gender]
 *     description: Barcha genderlarni olish
 *     responses:
 *       '200':
 *         description: Genderlar muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /gender/getUserById/{id}:
 *   get:
 *     summary: Gender ID bo'yicha olish
 *     tags: [Gender]
 *     description: ID bo'yicha genderni topish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID bo'yicha genderni topish
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Gender muvaffaqiyatli qaytarildi
 *       '404':
 *         description: Gender topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /gender/searchGender:
 *   get:
 *     summary: Genderlarni qidirish
 *     tags: [Gender]
 *     description: Qidiruv so'rovi orqali genderlarni izlash
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
 *         description: Gender topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /gender/updateGender/{id}:
 *   put:
 *     summary: Genderni yangilash
 *     tags: [Gender]
 *     description: Gender ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Gender ID si
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
 *                 description: Jins nomi
 *     responses:
 *       '200':
 *         description: Gender muvaffaqiyatli yangilandi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '404':
 *         description: Gender topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /gender/deleteGender/{id}:
 *   delete:
 *     summary: Genderni o'chirish
 *     tags: [Gender]
 *     description: ID bo'yicha genderni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan gender ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Gender muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Gender topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

// Andoza yo'llari
gender.get("/getGenders", getGenders);
gender.get("/getUsers", getGenders);
gender.get("/getAll", getGenders);
gender.get("/", getGenders);

gender.get("/getUserById/:id", getGenderById);
gender.get("/getGenderById/:id", getGenderById);
gender.get("/getById/:id", getGenderById);
gender.get("/:id", getGenderById);

gender.get("/searchGender", searchGender);
gender.get("/searchUser", searchGender);
gender.get("/search", searchGender);

gender.post("/register", validateScheme(registerValidationSchema), postRegister);
gender.post("/create", validateScheme(registerValidationSchema), postRegister);

gender.put("/updateGender/:id", validateScheme(updateValidationSchema), updateGender);
gender.put("/updateUser/:id", validateScheme(updateValidationSchema), updateGender);
gender.put("/update/:id", validateScheme(updateValidationSchema), updateGender);

gender.delete("/deleteGender/:id", deleteGender);
gender.delete("/deleteUser/:id", deleteGender);
gender.delete("/delete/:id", deleteGender);
gender.delete("/:id", deleteGender);

module.exports = {
  gender,
  router: gender,
  users: gender,
};
