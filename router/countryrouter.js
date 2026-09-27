const { Router } = require("express");
const {
  postRegister,
  getCountries,
  getCountryById,
  updateCountry,
  deleteCountry,
  searchCountry,
} = require("../controller/Country.controler");

const validateScheme = (schema) => (req, res, next) => {
  if (!schema) return next();
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }

  next();
};

const {
  createCountryValidationSchema: registerValidationSchema,
  updateCountryValidationSchema: updateValidationSchema,
} = require("../validation/countryvalidation");

const country = Router();

/**
 * @swagger
 * tags:
 *   name: Country
 *   description: Davlatlarni boshqarish uchun endpointlar
 */

/**
 * @swagger
 * /country/register:
 *   post:
 *     summary: Yangi country ro'yxatdan o'tkazish / yaratish
 *     tags: [Country]
 *     description: Yangi country yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - country_name
 *             properties:
 *               country_name:
 *                 type: string
 *                 description: Davlat nomi
 *     responses:
 *       '201':
 *         description: Country muvaffaqiyatli yaratildi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /country/getCountries:
 *   get:
 *     summary: Countrylarni olish
 *     tags: [Country]
 *     description: Barcha countrylarni olish
 *     responses:
 *       '200':
 *         description: Countrylar muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /country/getUserById/{id}:
 *   get:
 *     summary: Country ID bo'yicha olish
 *     tags: [Country]
 *     description: ID bo'yicha countryni topish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID bo'yicha countryni topish
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Country muvaffaqiyatli qaytarildi
 *       '404':
 *         description: Country topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /country/searchCountry:
 *   get:
 *     summary: Countrylarni qidirish
 *     tags: [Country]
 *     description: Qidiruv so'rovi orqali countrylarni izlash
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
 *         description: Country topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /country/updateCountry/{id}:
 *   put:
 *     summary: Countryni yangilash
 *     tags: [Country]
 *     description: Country ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Country ID si
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
 *               country_name:
 *                 type: string
 *                 description: Davlat nomi
 *     responses:
 *       '200':
 *         description: Country muvaffaqiyatli yangilandi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '404':
 *         description: Country topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /country/deleteCountry/{id}:
 *   delete:
 *     summary: Countryni o'chirish
 *     tags: [Country]
 *     description: ID bo'yicha countryni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan country ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Country muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Country topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

// Andoza yo'llari
country.get("/getCountries", getCountries);
country.get("/getUsers", getCountries);
country.get("/getAll", getCountries);
country.get("/", getCountries);

country.get("/getUserById/:id", getCountryById);
country.get("/getCountryById/:id", getCountryById);
country.get("/getById/:id", getCountryById);
country.get("/:id", getCountryById);

country.get("/searchCountry", searchCountry);
country.get("/searchUser", searchCountry);
country.get("/search", searchCountry);

country.post("/register", validateScheme(registerValidationSchema), postRegister);
country.post("/create", validateScheme(registerValidationSchema), postRegister);

country.put("/updateCountry/:id", validateScheme(updateValidationSchema), updateCountry);
country.put("/updateUser/:id", validateScheme(updateValidationSchema), updateCountry);
country.put("/update/:id", validateScheme(updateValidationSchema), updateCountry);

country.delete("/deleteCountry/:id", deleteCountry);
country.delete("/deleteUser/:id", deleteCountry);
country.delete("/delete/:id", deleteCountry);
country.delete("/:id", deleteCountry);

module.exports = {
  country,
  router: country,
  users: country,
};
