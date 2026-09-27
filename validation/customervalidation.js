const Joi = require("joi");

const createCustomerValidationSchema = Joi.object({
    first_name: Joi.string().min(2).max(100).optional(),
    last_name: Joi.string().min(2).max(100).optional(),
    phone: Joi.string().min(5).max(30).required(),
    password: Joi.string().min(3).max(100).optional(),
    hashed_password: Joi.string().min(3).max(100).optional(),
    email: Joi.string().email().optional(),
    birth_date: Joi.date().optional(),
    gender_id: Joi.string().optional(),
    lang_id: Joi.string().optional(),
    hashed_refresh_token: Joi.string().optional(),
});

const updateCustomerValidationSchema = Joi.object({
    first_name: Joi.string().min(2).max(100).optional(),
    last_name: Joi.string().min(2).max(100).optional(),
    phone: Joi.string().min(5).max(30).optional(),
    password: Joi.string().min(3).max(100).optional(),
    hashed_password: Joi.string().min(3).max(100).optional(),
    email: Joi.string().email().optional(),
    birth_date: Joi.date().optional(),
    gender_id: Joi.string().optional(),
    lang_id: Joi.string().optional(),
    hashed_refresh_token: Joi.string().optional(),
});

module.exports = {
    createCustomerValidationSchema,
    updateCustomerValidationSchema,
};
