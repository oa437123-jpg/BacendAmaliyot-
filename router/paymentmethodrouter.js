const { Router } = require("express");
const {
  postRegister,
  getPaymentMethods,
  getPaymentMethodById,
  updatePaymentMethod,
  deletePaymentMethod,
  searchPaymentMethod,
} = require("../controller/PaymentMethod.controler");

const validateScheme = (schema) => (req, res, next) => {
  if (!schema) return next();
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }

  next();
};

const {
  createPaymentMethodValidationSchema: registerValidationSchema,
  updatePaymentMethodValidationSchema: updateValidationSchema,
} = require("../validation/paymentmethodvalidation");

const paymentMethod = Router();

/**
 * @swagger
 * tags:
 *   name: PaymentMethod
 *   description: To'lov usullarini boshqarish uchun endpointlar
 */

/**
 * @swagger
 * /paymentmethod/register:
 *   post:
 *     summary: Yangi paymentmethod ro'yxatdan o'tkazish / yaratish
 *     tags: [PaymentMethod]
 *     description: Yangi paymentmethod yaratish
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
 *                 description: To'lov usuli nomi
 *     responses:
 *       '201':
 *         description: PaymentMethod muvaffaqiyatli yaratildi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /paymentmethod/getPaymentMethods:
 *   get:
 *     summary: PaymentMethodlarni olish
 *     tags: [PaymentMethod]
 *     description: Barcha paymentmethodlarni olish
 *     responses:
 *       '200':
 *         description: PaymentMethodlar muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /paymentmethod/getUserById/{id}:
 *   get:
 *     summary: PaymentMethod ID bo'yicha olish
 *     tags: [PaymentMethod]
 *     description: ID bo'yicha paymentmethodni topish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID bo'yicha paymentmethodni topish
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: PaymentMethod muvaffaqiyatli qaytarildi
 *       '404':
 *         description: PaymentMethod topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /paymentmethod/searchPaymentMethod:
 *   get:
 *     summary: PaymentMethodlarni qidirish
 *     tags: [PaymentMethod]
 *     description: Qidiruv so'rovi orqali paymentmethodlarni izlash
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
 *         description: PaymentMethod topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /paymentmethod/updatePaymentMethod/{id}:
 *   put:
 *     summary: PaymentMethodni yangilash
 *     tags: [PaymentMethod]
 *     description: PaymentMethod ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: PaymentMethod ID si
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
 *                 description: To'lov usuli nomi
 *     responses:
 *       '200':
 *         description: PaymentMethod muvaffaqiyatli yangilandi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '404':
 *         description: PaymentMethod topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /paymentmethod/deletePaymentMethod/{id}:
 *   delete:
 *     summary: PaymentMethodni o'chirish
 *     tags: [PaymentMethod]
 *     description: ID bo'yicha paymentmethodni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan paymentmethod ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: PaymentMethod muvaffaqiyatli o'chirildi
 *       '404':
 *         description: PaymentMethod topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

// Andoza yo'llari
paymentMethod.get("/getPaymentMethods", getPaymentMethods);
paymentMethod.get("/getUsers", getPaymentMethods);
paymentMethod.get("/getAll", getPaymentMethods);
paymentMethod.get("/", getPaymentMethods);

paymentMethod.get("/getUserById/:id", getPaymentMethodById);
paymentMethod.get("/getPaymentMethodById/:id", getPaymentMethodById);
paymentMethod.get("/getById/:id", getPaymentMethodById);
paymentMethod.get("/:id", getPaymentMethodById);

paymentMethod.get("/searchPaymentMethod", searchPaymentMethod);
paymentMethod.get("/searchUser", searchPaymentMethod);
paymentMethod.get("/search", searchPaymentMethod);

paymentMethod.post("/register", validateScheme(registerValidationSchema), postRegister);
paymentMethod.post("/create", validateScheme(registerValidationSchema), postRegister);

paymentMethod.put("/updatePaymentMethod/:id", validateScheme(updateValidationSchema), updatePaymentMethod);
paymentMethod.put("/updateUser/:id", validateScheme(updateValidationSchema), updatePaymentMethod);
paymentMethod.put("/update/:id", validateScheme(updateValidationSchema), updatePaymentMethod);

paymentMethod.delete("/deletePaymentMethod/:id", deletePaymentMethod);
paymentMethod.delete("/deleteUser/:id", deletePaymentMethod);
paymentMethod.delete("/delete/:id", deletePaymentMethod);
paymentMethod.delete("/:id", deletePaymentMethod);

module.exports = {
  paymentMethod,
  router: paymentMethod,
  users: paymentMethod,
};
