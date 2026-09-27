const { Router } = require("express");
const {
  postRegister,
  getDeliveryMethods,
  getDeliveryMethodById,
  updateDeliveryMethod,
  deleteDeliveryMethod,
  searchDeliveryMethod,
} = require("../controller/DeliveryMethod.controler");

const validateScheme = (schema) => (req, res, next) => {
  if (!schema) return next();
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }

  next();
};

const {
  createDeliveryMethodValidationSchema: registerValidationSchema,
  updateDeliveryMethodValidationSchema: updateValidationSchema,
} = require("../validation/deliverymethodvalidation");

const deliveryMethod = Router();

/**
 * @swagger
 * tags:
 *   name: DeliveryMethod
 *   description: Yetkazib berish usullarini boshqarish uchun endpointlar
 */

/**
 * @swagger
 * /deliverymethod/register:
 *   post:
 *     summary: Yangi deliverymethod ro'yxatdan o'tkazish / yaratish
 *     tags: [DeliveryMethod]
 *     description: Yangi deliverymethod yaratish
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
 *                 description: Yetkazib berish usuli nomi
 *     responses:
 *       '201':
 *         description: DeliveryMethod muvaffaqiyatli yaratildi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /deliverymethod/getDeliveryMethods:
 *   get:
 *     summary: DeliveryMethodlarni olish
 *     tags: [DeliveryMethod]
 *     description: Barcha deliverymethodlarni olish
 *     responses:
 *       '200':
 *         description: DeliveryMethodlar muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /deliverymethod/getUserById/{id}:
 *   get:
 *     summary: DeliveryMethod ID bo'yicha olish
 *     tags: [DeliveryMethod]
 *     description: ID bo'yicha deliverymethodni topish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID bo'yicha deliverymethodni topish
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: DeliveryMethod muvaffaqiyatli qaytarildi
 *       '404':
 *         description: DeliveryMethod topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /deliverymethod/searchDeliveryMethod:
 *   get:
 *     summary: DeliveryMethodlarni qidirish
 *     tags: [DeliveryMethod]
 *     description: Qidiruv so'rovi orqali deliverymethodlarni izlash
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
 *         description: DeliveryMethod topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /deliverymethod/updateDeliveryMethod/{id}:
 *   put:
 *     summary: DeliveryMethodni yangilash
 *     tags: [DeliveryMethod]
 *     description: DeliveryMethod ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: DeliveryMethod ID si
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
 *                 description: Yetkazib berish usuli nomi
 *     responses:
 *       '200':
 *         description: DeliveryMethod muvaffaqiyatli yangilandi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '404':
 *         description: DeliveryMethod topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /deliverymethod/deleteDeliveryMethod/{id}:
 *   delete:
 *     summary: DeliveryMethodni o'chirish
 *     tags: [DeliveryMethod]
 *     description: ID bo'yicha deliverymethodni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan deliverymethod ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: DeliveryMethod muvaffaqiyatli o'chirildi
 *       '404':
 *         description: DeliveryMethod topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

// Andoza yo'llari
deliveryMethod.get("/getDeliveryMethods", getDeliveryMethods);
deliveryMethod.get("/getUsers", getDeliveryMethods);
deliveryMethod.get("/getAll", getDeliveryMethods);
deliveryMethod.get("/", getDeliveryMethods);

deliveryMethod.get("/getUserById/:id", getDeliveryMethodById);
deliveryMethod.get("/getDeliveryMethodById/:id", getDeliveryMethodById);
deliveryMethod.get("/getById/:id", getDeliveryMethodById);
deliveryMethod.get("/:id", getDeliveryMethodById);

deliveryMethod.get("/searchDeliveryMethod", searchDeliveryMethod);
deliveryMethod.get("/searchUser", searchDeliveryMethod);
deliveryMethod.get("/search", searchDeliveryMethod);

deliveryMethod.post("/register", validateScheme(registerValidationSchema), postRegister);
deliveryMethod.post("/create", validateScheme(registerValidationSchema), postRegister);

deliveryMethod.put("/updateDeliveryMethod/:id", validateScheme(updateValidationSchema), updateDeliveryMethod);
deliveryMethod.put("/updateUser/:id", validateScheme(updateValidationSchema), updateDeliveryMethod);
deliveryMethod.put("/update/:id", validateScheme(updateValidationSchema), updateDeliveryMethod);

deliveryMethod.delete("/deleteDeliveryMethod/:id", deleteDeliveryMethod);
deliveryMethod.delete("/deleteUser/:id", deleteDeliveryMethod);
deliveryMethod.delete("/delete/:id", deleteDeliveryMethod);
deliveryMethod.delete("/:id", deleteDeliveryMethod);

module.exports = {
  deliveryMethod,
  router: deliveryMethod,
  users: deliveryMethod,
};
