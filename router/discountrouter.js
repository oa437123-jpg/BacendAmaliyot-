const { Router } = require("express");
const {
  postRegister,
  getDiscounts,
  getDiscountById,
  updateDiscount,
  deleteDiscount,
  searchDiscount,
} = require("../controller/Discount.controler");

const validateScheme = (schema) => (req, res, next) => {
  if (!schema) return next();
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }

  next();
};

const {
  createDiscountValidationSchema: registerValidationSchema,
  updateDiscountValidationSchema: updateValidationSchema,
} = require("../validation/discountvalidation");

const discount = Router();

/**
 * @swagger
 * tags:
 *   name: Discount
 *   description: Chegirmalarni boshqarish uchun endpointlar
 */

/**
 * @swagger
 * /discount/register:
 *   post:
 *     summary: Yangi discount ro'yxatdan o'tkazish / yaratish
 *     tags: [Discount]
 *     description: Yangi discount yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               discount:
 *                 type: string
 *                 description: Chegirma miqdori/foizi
 *               finish_date:
 *                 type: string
 *                 description: Tugash sanasi (YYYY-MM-DD)
 *     responses:
 *       '201':
 *         description: Discount muvaffaqiyatli yaratildi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /discount/getDiscounts:
 *   get:
 *     summary: Discountlarni olish
 *     tags: [Discount]
 *     description: Barcha discountlarni olish
 *     responses:
 *       '200':
 *         description: Discountlar muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /discount/getUserById/{id}:
 *   get:
 *     summary: Discount ID bo'yicha olish
 *     tags: [Discount]
 *     description: ID bo'yicha discountni topish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID bo'yicha discountni topish
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Discount muvaffaqiyatli qaytarildi
 *       '404':
 *         description: Discount topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /discount/searchDiscount:
 *   get:
 *     summary: Discountlarni qidirish
 *     tags: [Discount]
 *     description: Qidiruv so'rovi orqali discountlarni izlash
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
 *         description: Discount topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /discount/updateDiscount/{id}:
 *   put:
 *     summary: Discountni yangilash
 *     tags: [Discount]
 *     description: Discount ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Discount ID si
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
 *               discount:
 *                 type: string
 *                 description: Chegirma miqdori/foizi
 *               finish_date:
 *                 type: string
 *                 description: Tugash sanasi (YYYY-MM-DD)
 *     responses:
 *       '200':
 *         description: Discount muvaffaqiyatli yangilandi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '404':
 *         description: Discount topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /discount/deleteDiscount/{id}:
 *   delete:
 *     summary: Discountni o'chirish
 *     tags: [Discount]
 *     description: ID bo'yicha discountni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan discount ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Discount muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Discount topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

// Andoza yo'llari
discount.get("/getDiscounts", getDiscounts);
discount.get("/getUsers", getDiscounts);
discount.get("/getAll", getDiscounts);
discount.get("/", getDiscounts);

discount.get("/getUserById/:id", getDiscountById);
discount.get("/getDiscountById/:id", getDiscountById);
discount.get("/getById/:id", getDiscountById);
discount.get("/:id", getDiscountById);

discount.get("/searchDiscount", searchDiscount);
discount.get("/searchUser", searchDiscount);
discount.get("/search", searchDiscount);

discount.post("/register", validateScheme(registerValidationSchema), postRegister);
discount.post("/create", validateScheme(registerValidationSchema), postRegister);

discount.put("/updateDiscount/:id", validateScheme(updateValidationSchema), updateDiscount);
discount.put("/updateUser/:id", validateScheme(updateValidationSchema), updateDiscount);
discount.put("/update/:id", validateScheme(updateValidationSchema), updateDiscount);

discount.delete("/deleteDiscount/:id", deleteDiscount);
discount.delete("/deleteUser/:id", deleteDiscount);
discount.delete("/delete/:id", deleteDiscount);
discount.delete("/:id", deleteDiscount);

module.exports = {
  discount,
  router: discount,
  users: discount,
};
