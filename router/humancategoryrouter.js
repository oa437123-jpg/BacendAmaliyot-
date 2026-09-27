const { Router } = require("express");
const {
  postRegister,
  getHumanCategories,
  getHumanCategoryById,
  updateHumanCategory,
  deleteHumanCategory,
  searchHumanCategory,
} = require("../controller/HumanCategory.controler");

const validateScheme = (schema) => (req, res, next) => {
  if (!schema) return next();
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }

  next();
};

const {
  createHumanCategoryValidationSchema: registerValidationSchema,
  updateHumanCategoryValidationSchema: updateValidationSchema,
} = require("../validation/humancategoryvalidation");

const humanCategory = Router();

/**
 * @swagger
 * tags:
 *   name: HumanCategory
 *   description: Inson toifalarini boshqarish uchun endpointlar
 */

/**
 * @swagger
 * /humancategory/register:
 *   post:
 *     summary: Yangi humancategory ro'yxatdan o'tkazish / yaratish
 *     tags: [HumanCategory]
 *     description: Yangi humancategory yaratish
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
 *                 description: Toifa nomi
 *               start_age:
 *                 type: number
 *                 description: Boshlang'ich yosh
 *               finish_age:
 *                 type: number
 *                 description: Tugash yoshi
 *               gender_id:
 *                 type: string
 *                 description: Jins ID (ObjectId)
 *     responses:
 *       '201':
 *         description: HumanCategory muvaffaqiyatli yaratildi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /humancategory/getHumanCategories:
 *   get:
 *     summary: HumanCategorylarni olish
 *     tags: [HumanCategory]
 *     description: Barcha humancategorylarni olish
 *     responses:
 *       '200':
 *         description: HumanCategorylar muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /humancategory/getUserById/{id}:
 *   get:
 *     summary: HumanCategory ID bo'yicha olish
 *     tags: [HumanCategory]
 *     description: ID bo'yicha humancategoryni topish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID bo'yicha humancategoryni topish
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: HumanCategory muvaffaqiyatli qaytarildi
 *       '404':
 *         description: HumanCategory topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /humancategory/searchHumanCategory:
 *   get:
 *     summary: HumanCategorylarni qidirish
 *     tags: [HumanCategory]
 *     description: Qidiruv so'rovi orqali humancategorylarni izlash
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
 *         description: HumanCategory topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /humancategory/updateHumanCategory/{id}:
 *   put:
 *     summary: HumanCategoryni yangilash
 *     tags: [HumanCategory]
 *     description: HumanCategory ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: HumanCategory ID si
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
 *                 description: Toifa nomi
 *               start_age:
 *                 type: number
 *                 description: Boshlang'ich yosh
 *               finish_age:
 *                 type: number
 *                 description: Tugash yoshi
 *               gender_id:
 *                 type: string
 *                 description: Jins ID (ObjectId)
 *     responses:
 *       '200':
 *         description: HumanCategory muvaffaqiyatli yangilandi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '404':
 *         description: HumanCategory topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /humancategory/deleteHumanCategory/{id}:
 *   delete:
 *     summary: HumanCategoryni o'chirish
 *     tags: [HumanCategory]
 *     description: ID bo'yicha humancategoryni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan humancategory ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: HumanCategory muvaffaqiyatli o'chirildi
 *       '404':
 *         description: HumanCategory topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

// Andoza yo'llari
humanCategory.get("/getHumanCategories", getHumanCategories);
humanCategory.get("/getUsers", getHumanCategories);
humanCategory.get("/getAll", getHumanCategories);
humanCategory.get("/", getHumanCategories);

humanCategory.get("/getUserById/:id", getHumanCategoryById);
humanCategory.get("/getHumanCategoryById/:id", getHumanCategoryById);
humanCategory.get("/getById/:id", getHumanCategoryById);
humanCategory.get("/:id", getHumanCategoryById);

humanCategory.get("/searchHumanCategory", searchHumanCategory);
humanCategory.get("/searchUser", searchHumanCategory);
humanCategory.get("/search", searchHumanCategory);

humanCategory.post("/register", validateScheme(registerValidationSchema), postRegister);
humanCategory.post("/create", validateScheme(registerValidationSchema), postRegister);

humanCategory.put("/updateHumanCategory/:id", validateScheme(updateValidationSchema), updateHumanCategory);
humanCategory.put("/updateUser/:id", validateScheme(updateValidationSchema), updateHumanCategory);
humanCategory.put("/update/:id", validateScheme(updateValidationSchema), updateHumanCategory);

humanCategory.delete("/deleteHumanCategory/:id", deleteHumanCategory);
humanCategory.delete("/deleteUser/:id", deleteHumanCategory);
humanCategory.delete("/delete/:id", deleteHumanCategory);
humanCategory.delete("/:id", deleteHumanCategory);

module.exports = {
  humanCategory,
  router: humanCategory,
  users: humanCategory,
};
