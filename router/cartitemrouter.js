const { Router } = require("express");
const {
  postRegister,
  getCartItems,
  getCartItemById,
  updateCartItem,
  deleteCartItem,
  searchCartItem,
} = require("../controller/CartItem.controler");

const validateScheme = (schema) => (req, res, next) => {
  if (!schema) return next();
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }

  next();
};

const {
  createCartItemValidationSchema: registerValidationSchema,
  updateCartItemValidationSchema: updateValidationSchema,
} = require("../validation/cartitemvalidation");

const cartItem = Router();

/**
 * @swagger
 * tags:
 *   name: CartItem
 *   description: Savat elementlarini boshqarish uchun endpointlar
 */

/**
 * @swagger
 * /cartitem/register:
 *   post:
 *     summary: Yangi cartitem ro'yxatdan o'tkazish / yaratish
 *     tags: [CartItem]
 *     description: Yangi cartitem yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cart_id:
 *                 type: string
 *                 description: Savat ID (ObjectId)
 *               ticket_id:
 *                 type: string
 *                 description: Chipta ID (ObjectId)
 *     responses:
 *       '201':
 *         description: CartItem muvaffaqiyatli yaratildi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /cartitem/getCartItems:
 *   get:
 *     summary: CartItemlarni olish
 *     tags: [CartItem]
 *     description: Barcha cartitemlarni olish
 *     responses:
 *       '200':
 *         description: CartItemlar muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /cartitem/getUserById/{id}:
 *   get:
 *     summary: CartItem ID bo'yicha olish
 *     tags: [CartItem]
 *     description: ID bo'yicha cartitemni topish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID bo'yicha cartitemni topish
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: CartItem muvaffaqiyatli qaytarildi
 *       '404':
 *         description: CartItem topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /cartitem/searchCartItem:
 *   get:
 *     summary: CartItemlarni qidirish
 *     tags: [CartItem]
 *     description: Qidiruv so'rovi orqali cartitemlarni izlash
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
 *         description: CartItem topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /cartitem/updateCartItem/{id}:
 *   put:
 *     summary: CartItemni yangilash
 *     tags: [CartItem]
 *     description: CartItem ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: CartItem ID si
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
 *               cart_id:
 *                 type: string
 *                 description: Savat ID (ObjectId)
 *               ticket_id:
 *                 type: string
 *                 description: Chipta ID (ObjectId)
 *     responses:
 *       '200':
 *         description: CartItem muvaffaqiyatli yangilandi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '404':
 *         description: CartItem topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /cartitem/deleteCartItem/{id}:
 *   delete:
 *     summary: CartItemni o'chirish
 *     tags: [CartItem]
 *     description: ID bo'yicha cartitemni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan cartitem ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: CartItem muvaffaqiyatli o'chirildi
 *       '404':
 *         description: CartItem topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

// Andoza yo'llari
cartItem.get("/getCartItems", getCartItems);
cartItem.get("/getUsers", getCartItems);
cartItem.get("/getAll", getCartItems);
cartItem.get("/", getCartItems);

cartItem.get("/getUserById/:id", getCartItemById);
cartItem.get("/getCartItemById/:id", getCartItemById);
cartItem.get("/getById/:id", getCartItemById);
cartItem.get("/:id", getCartItemById);

cartItem.get("/searchCartItem", searchCartItem);
cartItem.get("/searchUser", searchCartItem);
cartItem.get("/search", searchCartItem);

cartItem.post("/register", validateScheme(registerValidationSchema), postRegister);
cartItem.post("/create", validateScheme(registerValidationSchema), postRegister);

cartItem.put("/updateCartItem/:id", validateScheme(updateValidationSchema), updateCartItem);
cartItem.put("/updateUser/:id", validateScheme(updateValidationSchema), updateCartItem);
cartItem.put("/update/:id", validateScheme(updateValidationSchema), updateCartItem);

cartItem.delete("/deleteCartItem/:id", deleteCartItem);
cartItem.delete("/deleteUser/:id", deleteCartItem);
cartItem.delete("/delete/:id", deleteCartItem);
cartItem.delete("/:id", deleteCartItem);

module.exports = {
  cartItem,
  router: cartItem,
  users: cartItem,
};
