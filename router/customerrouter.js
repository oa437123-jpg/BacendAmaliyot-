const { Router } = require("express");
const {
  postRegister,
  postLogin,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  searchCustomer,
} = require("../controller/Customer.controler");

const validateScheme = (schema) => (req, res, next) => {
  if (!schema) return next();
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }

  next();
};

const {
  createCustomerValidationSchema: registerValidationSchema,
  updateCustomerValidationSchema: updateValidationSchema,
} = require("../validation/customervalidation");

const Joi = require("joi");
const loginValidationSchema = Joi.object({
  phone: Joi.string().required(),
  password: Joi.string().required(),
});

const customer = Router();

/**
 * @swagger
 * tags:
 *   name: Customer
 *   description: Mijozlarni boshqarish uchun endpointlar
 */

/**
 * @swagger
 * /customer/register:
 *   post:
 *     summary: Yangi customer ro'yxatdan o'tkazish / yaratish
 *     tags: [Customer]
 *     description: Yangi customer yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *             properties:
 *               first_name:
 *                 type: string
 *                 description: Mijoz ismi
 *               last_name:
 *                 type: string
 *                 description: Mijoz familiyasi
 *               phone:
 *                 type: string
 *                 description: Mijoz telefon raqami
 *               password:
 *                 type: string
 *                 description: Mijoz paroli
 *               hashed_password:
 *                 type: string
 *                 description: Mijoz paroli (heshlangan)
 *               email:
 *                 type: string
 *                 description: Mijoz emaili
 *               birth_date:
 *                 type: string
 *                 description: Tug'ilgan sana (YYYY-MM-DD)
 *               gender_id:
 *                 type: string
 *                 description: Jins ID (ObjectId)
 *               lang_id:
 *                 type: string
 *                 description: Til ID (ObjectId)
 *     responses:
 *       '201':
 *         description: Customer muvaffaqiyatli yaratildi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '500':
 *         description: Ichki server xatosi
 */
/**
 * @swagger
 * /customer/login:
 *   post:
 *     summary: Customer tizimga kirishi
 *     tags: [Customer]
 *     description: Customer kiritgan ma'lumot bilan tizimga kirish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 description: Customer phone
 *               password:
 *                 type: string
 *                 description: Customer paroli
 *     responses:
 *       '200':
 *         description: Customer muvaffaqiyatli tizimga kirdi
 *       '401':
 *         description: Noto'g'ri ma'lumot
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /customer/getCustomers:
 *   get:
 *     summary: Customerlarni olish
 *     tags: [Customer]
 *     description: Barcha customerlarni olish
 *     responses:
 *       '200':
 *         description: Customerlar muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /customer/getUserById/{id}:
 *   get:
 *     summary: Customer ID bo'yicha olish
 *     tags: [Customer]
 *     description: ID bo'yicha customerni topish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID bo'yicha customerni topish
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Customer muvaffaqiyatli qaytarildi
 *       '404':
 *         description: Customer topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /customer/searchCustomer:
 *   get:
 *     summary: Customerlarni qidirish
 *     tags: [Customer]
 *     description: Qidiruv so'rovi orqali customerlarni izlash
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
 *         description: Customer topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /customer/updateCustomer/{id}:
 *   put:
 *     summary: Customerni yangilash
 *     tags: [Customer]
 *     description: Customer ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Customer ID si
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
 *               first_name:
 *                 type: string
 *                 description: Mijoz ismi
 *               last_name:
 *                 type: string
 *                 description: Mijoz familiyasi
 *               phone:
 *                 type: string
 *                 description: Mijoz telefon raqami
 *               password:
 *                 type: string
 *                 description: Mijoz paroli
 *               hashed_password:
 *                 type: string
 *                 description: Mijoz paroli (heshlangan)
 *               email:
 *                 type: string
 *                 description: Mijoz emaili
 *               birth_date:
 *                 type: string
 *                 description: Tug'ilgan sana (YYYY-MM-DD)
 *               gender_id:
 *                 type: string
 *                 description: Jins ID (ObjectId)
 *               lang_id:
 *                 type: string
 *                 description: Til ID (ObjectId)
 *     responses:
 *       '200':
 *         description: Customer muvaffaqiyatli yangilandi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '404':
 *         description: Customer topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /customer/deleteCustomer/{id}:
 *   delete:
 *     summary: Customerni o'chirish
 *     tags: [Customer]
 *     description: ID bo'yicha customerni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan customer ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Customer muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Customer topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

// Andoza yo'llari
customer.get("/getCustomers", getCustomers);
customer.get("/getUsers", getCustomers);
customer.get("/getAll", getCustomers);
customer.get("/", getCustomers);

customer.get("/getUserById/:id", getCustomerById);
customer.get("/getCustomerById/:id", getCustomerById);
customer.get("/getById/:id", getCustomerById);
customer.get("/:id", getCustomerById);

customer.get("/searchCustomer", searchCustomer);
customer.get("/searchUser", searchCustomer);
customer.get("/search", searchCustomer);

customer.post("/register", validateScheme(registerValidationSchema), postRegister);
customer.post("/create", validateScheme(registerValidationSchema), postRegister);

customer.put("/updateCustomer/:id", validateScheme(updateValidationSchema), updateCustomer);
customer.put("/updateUser/:id", validateScheme(updateValidationSchema), updateCustomer);
customer.put("/update/:id", validateScheme(updateValidationSchema), updateCustomer);

customer.delete("/deleteCustomer/:id", deleteCustomer);
customer.delete("/deleteUser/:id", deleteCustomer);
customer.delete("/delete/:id", deleteCustomer);
customer.delete("/:id", deleteCustomer);
customer.post("/login", validateScheme(loginValidationSchema), postLogin);

module.exports = {
  customer,
  router: customer,
  users: customer,
};
