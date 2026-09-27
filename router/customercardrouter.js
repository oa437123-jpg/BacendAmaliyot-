const { Router } = require("express");
const {
  postRegister,
  getCustomerCards,
  getCustomerCardById,
  updateCustomerCard,
  deleteCustomerCard,
  searchCustomerCard,
} = require("../controller/CustomerCard.controler");

const validateScheme = (schema) => (req, res, next) => {
  if (!schema) return next();
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }

  next();
};

const {
  createCustomerCardValidationSchema: registerValidationSchema,
  updateCustomerCardValidationSchema: updateValidationSchema,
} = require("../validation/customercardvalidation");

const customerCard = Router();

/**
 * @swagger
 * tags:
 *   name: CustomerCard
 *   description: Mijoz kartalarini boshqarish uchun endpointlar
 */

/**
 * @swagger
 * /customercard/register:
 *   post:
 *     summary: Yangi customercard ro'yxatdan o'tkazish / yaratish
 *     tags: [CustomerCard]
 *     description: Yangi customercard yaratish
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
 *               name:
 *                 type: string
 *                 description: Karta egasi ismi
 *               phone:
 *                 type: string
 *                 description: Telefon raqami
 *               number:
 *                 type: string
 *                 description: Karta raqami
 *               year:
 *                 type: string
 *                 description: Amal qilish yili
 *               month:
 *                 type: string
 *                 description: Amal qilish oyi
 *               is_active:
 *                 type: boolean
 *                 description: Faollik holati
 *               is_main:
 *                 type: boolean
 *                 description: Asosiy karta holati
 *     responses:
 *       '201':
 *         description: CustomerCard muvaffaqiyatli yaratildi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /customercard/getCustomerCards:
 *   get:
 *     summary: CustomerCardlarni olish
 *     tags: [CustomerCard]
 *     description: Barcha customercardlarni olish
 *     responses:
 *       '200':
 *         description: CustomerCardlar muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /customercard/getUserById/{id}:
 *   get:
 *     summary: CustomerCard ID bo'yicha olish
 *     tags: [CustomerCard]
 *     description: ID bo'yicha customercardni topish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID bo'yicha customercardni topish
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: CustomerCard muvaffaqiyatli qaytarildi
 *       '404':
 *         description: CustomerCard topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /customercard/searchCustomerCard:
 *   get:
 *     summary: CustomerCardlarni qidirish
 *     tags: [CustomerCard]
 *     description: Qidiruv so'rovi orqali customercardlarni izlash
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
 *         description: CustomerCard topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /customercard/updateCustomerCard/{id}:
 *   put:
 *     summary: CustomerCardni yangilash
 *     tags: [CustomerCard]
 *     description: CustomerCard ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: CustomerCard ID si
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
 *               name:
 *                 type: string
 *                 description: Karta egasi ismi
 *               phone:
 *                 type: string
 *                 description: Telefon raqami
 *               number:
 *                 type: string
 *                 description: Karta raqami
 *               year:
 *                 type: string
 *                 description: Amal qilish yili
 *               month:
 *                 type: string
 *                 description: Amal qilish oyi
 *               is_active:
 *                 type: boolean
 *                 description: Faollik holati
 *               is_main:
 *                 type: boolean
 *                 description: Asosiy karta holati
 *     responses:
 *       '200':
 *         description: CustomerCard muvaffaqiyatli yangilandi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '404':
 *         description: CustomerCard topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /customercard/deleteCustomerCard/{id}:
 *   delete:
 *     summary: CustomerCardni o'chirish
 *     tags: [CustomerCard]
 *     description: ID bo'yicha customercardni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan customercard ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: CustomerCard muvaffaqiyatli o'chirildi
 *       '404':
 *         description: CustomerCard topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

// Andoza yo'llari
customerCard.get("/getCustomerCards", getCustomerCards);
customerCard.get("/getUsers", getCustomerCards);
customerCard.get("/getAll", getCustomerCards);
customerCard.get("/", getCustomerCards);

customerCard.get("/getUserById/:id", getCustomerCardById);
customerCard.get("/getCustomerCardById/:id", getCustomerCardById);
customerCard.get("/getById/:id", getCustomerCardById);
customerCard.get("/:id", getCustomerCardById);

customerCard.get("/searchCustomerCard", searchCustomerCard);
customerCard.get("/searchUser", searchCustomerCard);
customerCard.get("/search", searchCustomerCard);

customerCard.post("/register", validateScheme(registerValidationSchema), postRegister);
customerCard.post("/create", validateScheme(registerValidationSchema), postRegister);

customerCard.put("/updateCustomerCard/:id", validateScheme(updateValidationSchema), updateCustomerCard);
customerCard.put("/updateUser/:id", validateScheme(updateValidationSchema), updateCustomerCard);
customerCard.put("/update/:id", validateScheme(updateValidationSchema), updateCustomerCard);

customerCard.delete("/deleteCustomerCard/:id", deleteCustomerCard);
customerCard.delete("/deleteUser/:id", deleteCustomerCard);
customerCard.delete("/delete/:id", deleteCustomerCard);
customerCard.delete("/:id", deleteCustomerCard);

module.exports = {
  customerCard,
  router: customerCard,
  users: customerCard,
};
