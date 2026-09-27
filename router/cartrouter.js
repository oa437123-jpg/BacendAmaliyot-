const { Router } = require("express");
const {
  postRegister,
  getCarts,
  getCartById,
  updateCart,
  deleteCart,
  searchCart,
} = require("../controller/Cart.controler");

const validateScheme = (schema) => (req, res, next) => {
  if (!schema) return next();
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }

  next();
};

const {
  createCartValidationSchema: registerValidationSchema,
  updateCartValidationSchema: updateValidationSchema,
} = require("../validation/cartvalidation");

const cart = Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Savatlarni boshqarish uchun endpointlar
 */

/**
 * @swagger
 * /cart/register:
 *   post:
 *     summary: Yangi cart ro'yxatdan o'tkazish / yaratish
 *     tags: [Cart]
 *     description: Yangi cart yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: string
 *                 description: Mijoz ID (ObjectId)
 *               createdAt:
 *                 type: string
 *                 description: Yaratilgan vaqt
 *               finishedAt:
 *                 type: string
 *                 description: Tugash vaqti
 *               status_id:
 *                 type: string
 *                 description: Status ID (ObjectId)
 *     responses:
 *       '201':
 *         description: Cart muvaffaqiyatli yaratildi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /cart/getCarts:
 *   get:
 *     summary: Cartlarni olish
 *     tags: [Cart]
 *     description: Barcha cartlarni olish
 *     responses:
 *       '200':
 *         description: Cartlar muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /cart/getUserById/{id}:
 *   get:
 *     summary: Cart ID bo'yicha olish
 *     tags: [Cart]
 *     description: ID bo'yicha cartni topish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID bo'yicha cartni topish
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Cart muvaffaqiyatli qaytarildi
 *       '404':
 *         description: Cart topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /cart/searchCart:
 *   get:
 *     summary: Cartlarni qidirish
 *     tags: [Cart]
 *     description: Qidiruv so'rovi orqali cartlarni izlash
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
 *         description: Cart topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /cart/updateCart/{id}:
 *   put:
 *     summary: Cartni yangilash
 *     tags: [Cart]
 *     description: Cart ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Cart ID si
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
 *               customer_id:
 *                 type: string
 *                 description: Mijoz ID (ObjectId)
 *               createdAt:
 *                 type: string
 *                 description: Yaratilgan vaqt
 *               finishedAt:
 *                 type: string
 *                 description: Tugash vaqti
 *               status_id:
 *                 type: string
 *                 description: Status ID (ObjectId)
 *     responses:
 *       '200':
 *         description: Cart muvaffaqiyatli yangilandi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '404':
 *         description: Cart topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /cart/deleteCart/{id}:
 *   delete:
 *     summary: Cartni o'chirish
 *     tags: [Cart]
 *     description: ID bo'yicha cartni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan cart ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Cart muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Cart topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

// Andoza yo'llari
cart.get("/getCarts", getCarts);
cart.get("/getUsers", getCarts);
cart.get("/getAll", getCarts);
cart.get("/", getCarts);

cart.get("/getUserById/:id", getCartById);
cart.get("/getCartById/:id", getCartById);
cart.get("/getById/:id", getCartById);
cart.get("/:id", getCartById);

cart.get("/searchCart", searchCart);
cart.get("/searchUser", searchCart);
cart.get("/search", searchCart);

cart.post("/register", validateScheme(registerValidationSchema), postRegister);
cart.post("/create", validateScheme(registerValidationSchema), postRegister);

cart.put("/updateCart/:id", validateScheme(updateValidationSchema), updateCart);
cart.put("/updateUser/:id", validateScheme(updateValidationSchema), updateCart);
cart.put("/update/:id", validateScheme(updateValidationSchema), updateCart);

cart.delete("/deleteCart/:id", deleteCart);
cart.delete("/deleteUser/:id", deleteCart);
cart.delete("/delete/:id", deleteCart);
cart.delete("/:id", deleteCart);

module.exports = {
  cart,
  router: cart,
  users: cart,
};
