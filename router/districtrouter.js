const { Router } = require("express");
const {
  postRegister,
  getDistricts,
  getDistrictById,
  updateDistrict,
  deleteDistrict,
  searchDistrict,
} = require("../controller/District.controler");

const validateScheme = (schema) => (req, res, next) => {
  if (!schema) return next();
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }

  next();
};

const {
  createDistrictValidationSchema: registerValidationSchema,
  updateDistrictValidationSchema: updateValidationSchema,
} = require("../validation/districtvalidation");

const district = Router();

/**
 * @swagger
 * tags:
 *   name: District
 *   description: Tumanlarni boshqarish uchun endpointlar
 */

/**
 * @swagger
 * /district/register:
 *   post:
 *     summary: Yangi district ro'yxatdan o'tkazish / yaratish
 *     tags: [District]
 *     description: Yangi district yaratish
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
 *                 description: Tuman nomi
 *               region_id:
 *                 type: string
 *                 description: Viloyat ID (ObjectId)
 *     responses:
 *       '201':
 *         description: District muvaffaqiyatli yaratildi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /district/getDistricts:
 *   get:
 *     summary: Districtlarni olish
 *     tags: [District]
 *     description: Barcha districtlarni olish
 *     responses:
 *       '200':
 *         description: Districtlar muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /district/getUserById/{id}:
 *   get:
 *     summary: District ID bo'yicha olish
 *     tags: [District]
 *     description: ID bo'yicha districtni topish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID bo'yicha districtni topish
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: District muvaffaqiyatli qaytarildi
 *       '404':
 *         description: District topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /district/searchDistrict:
 *   get:
 *     summary: Districtlarni qidirish
 *     tags: [District]
 *     description: Qidiruv so'rovi orqali districtlarni izlash
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
 *         description: District topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /district/updateDistrict/{id}:
 *   put:
 *     summary: Districtni yangilash
 *     tags: [District]
 *     description: District ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: District ID si
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
 *                 description: Tuman nomi
 *               region_id:
 *                 type: string
 *                 description: Viloyat ID (ObjectId)
 *     responses:
 *       '200':
 *         description: District muvaffaqiyatli yangilandi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '404':
 *         description: District topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /district/deleteDistrict/{id}:
 *   delete:
 *     summary: Districtni o'chirish
 *     tags: [District]
 *     description: ID bo'yicha districtni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan district ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: District muvaffaqiyatli o'chirildi
 *       '404':
 *         description: District topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

// Andoza yo'llari
district.get("/getDistricts", getDistricts);
district.get("/getUsers", getDistricts);
district.get("/getAll", getDistricts);
district.get("/", getDistricts);

district.get("/getUserById/:id", getDistrictById);
district.get("/getDistrictById/:id", getDistrictById);
district.get("/getById/:id", getDistrictById);
district.get("/:id", getDistrictById);

district.get("/searchDistrict", searchDistrict);
district.get("/searchUser", searchDistrict);
district.get("/search", searchDistrict);

district.post("/register", validateScheme(registerValidationSchema), postRegister);
district.post("/create", validateScheme(registerValidationSchema), postRegister);

district.put("/updateDistrict/:id", validateScheme(updateValidationSchema), updateDistrict);
district.put("/updateUser/:id", validateScheme(updateValidationSchema), updateDistrict);
district.put("/update/:id", validateScheme(updateValidationSchema), updateDistrict);

district.delete("/deleteDistrict/:id", deleteDistrict);
district.delete("/deleteUser/:id", deleteDistrict);
district.delete("/delete/:id", deleteDistrict);
district.delete("/:id", deleteDistrict);

module.exports = {
  district,
  router: district,
  users: district,
};
