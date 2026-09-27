const { Router } = require("express");
const {
  postRegister,
  getCustomerAddresses,
  getCustomerAddressById,
  updateCustomerAddress,
  deleteCustomerAddress,
  searchCustomerAddress,
} = require("../controller/CustomerAddress.controler");

const validateScheme = (schema) => (req, res, next) => {
  if (!schema) return next();
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }

  next();
};

const {
  createCustomerAddressValidationSchema: registerValidationSchema,
  updateCustomerAddressValidationSchema: updateValidationSchema,
} = require("../validation/customeraddressvalidation");

const customerAddress = Router();

/**
 * @swagger
 * tags:
 *   name: CustomerAddress
 *   description: Mijoz manzillarini boshqarish uchun endpointlar
 */

/**
 * @swagger
 * /customeraddress/register:
 *   post:
 *     summary: Yangi customeraddress ro'yxatdan o'tkazish / yaratish
 *     tags: [CustomerAddress]
 *     description: Yangi customeraddress yaratish
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
 *                 description: Manzil nomi
 *               country_id:
 *                 type: string
 *                 description: Davlat ID (ObjectId)
 *               region_id:
 *                 type: string
 *                 description: Viloyat ID (ObjectId)
 *               district_id:
 *                 type: string
 *                 description: Tuman ID (ObjectId)
 *               street:
 *                 type: string
 *                 description: Ko'cha nomi
 *               house:
 *                 type: string
 *                 description: Uy raqami
 *               flat_id:
 *                 type: string
 *                 description: Kvartira ID (ObjectId)
 *               location:
 *                 type: string
 *                 description: Joylashuv kordinatasi
 *               post_index:
 *                 type: string
 *                 description: Pochta indeksi
 *               info:
 *                 type: string
 *                 description: Qo'shimcha ma'lumot
 *     responses:
 *       '201':
 *         description: CustomerAddress muvaffaqiyatli yaratildi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /customeraddress/getCustomerAddresses:
 *   get:
 *     summary: CustomerAddresslarni olish
 *     tags: [CustomerAddress]
 *     description: Barcha customeraddresslarni olish
 *     responses:
 *       '200':
 *         description: CustomerAddresslar muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /customeraddress/getUserById/{id}:
 *   get:
 *     summary: CustomerAddress ID bo'yicha olish
 *     tags: [CustomerAddress]
 *     description: ID bo'yicha customeraddressni topish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID bo'yicha customeraddressni topish
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: CustomerAddress muvaffaqiyatli qaytarildi
 *       '404':
 *         description: CustomerAddress topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /customeraddress/searchCustomerAddress:
 *   get:
 *     summary: CustomerAddresslarni qidirish
 *     tags: [CustomerAddress]
 *     description: Qidiruv so'rovi orqali customeraddresslarni izlash
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
 *         description: CustomerAddress topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /customeraddress/updateCustomerAddress/{id}:
 *   put:
 *     summary: CustomerAddressni yangilash
 *     tags: [CustomerAddress]
 *     description: CustomerAddress ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: CustomerAddress ID si
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
 *                 description: Manzil nomi
 *               country_id:
 *                 type: string
 *                 description: Davlat ID (ObjectId)
 *               region_id:
 *                 type: string
 *                 description: Viloyat ID (ObjectId)
 *               district_id:
 *                 type: string
 *                 description: Tuman ID (ObjectId)
 *               street:
 *                 type: string
 *                 description: Ko'cha nomi
 *               house:
 *                 type: string
 *                 description: Uy raqami
 *               flat_id:
 *                 type: string
 *                 description: Kvartira ID (ObjectId)
 *               location:
 *                 type: string
 *                 description: Joylashuv kordinatasi
 *               post_index:
 *                 type: string
 *                 description: Pochta indeksi
 *               info:
 *                 type: string
 *                 description: Qo'shimcha ma'lumot
 *     responses:
 *       '200':
 *         description: CustomerAddress muvaffaqiyatli yangilandi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 *       '404':
 *         description: CustomerAddress topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /customeraddress/deleteCustomerAddress/{id}:
 *   delete:
 *     summary: CustomerAddressni o'chirish
 *     tags: [CustomerAddress]
 *     description: ID bo'yicha customeraddressni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan customeraddress ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: CustomerAddress muvaffaqiyatli o'chirildi
 *       '404':
 *         description: CustomerAddress topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

// Andoza yo'llari
customerAddress.get("/getCustomerAddresses", getCustomerAddresses);
customerAddress.get("/getUsers", getCustomerAddresses);
customerAddress.get("/getAll", getCustomerAddresses);
customerAddress.get("/", getCustomerAddresses);

customerAddress.get("/getUserById/:id", getCustomerAddressById);
customerAddress.get("/getCustomerAddressById/:id", getCustomerAddressById);
customerAddress.get("/getById/:id", getCustomerAddressById);
customerAddress.get("/:id", getCustomerAddressById);

customerAddress.get("/searchCustomerAddress", searchCustomerAddress);
customerAddress.get("/searchUser", searchCustomerAddress);
customerAddress.get("/search", searchCustomerAddress);

customerAddress.post("/register", validateScheme(registerValidationSchema), postRegister);
customerAddress.post("/create", validateScheme(registerValidationSchema), postRegister);

customerAddress.put("/updateCustomerAddress/:id", validateScheme(updateValidationSchema), updateCustomerAddress);
customerAddress.put("/updateUser/:id", validateScheme(updateValidationSchema), updateCustomerAddress);
customerAddress.put("/update/:id", validateScheme(updateValidationSchema), updateCustomerAddress);

customerAddress.delete("/deleteCustomerAddress/:id", deleteCustomerAddress);
customerAddress.delete("/deleteUser/:id", deleteCustomerAddress);
customerAddress.delete("/delete/:id", deleteCustomerAddress);
customerAddress.delete("/:id", deleteCustomerAddress);

module.exports = {
  customerAddress,
  router: customerAddress,
  users: customerAddress,
};
