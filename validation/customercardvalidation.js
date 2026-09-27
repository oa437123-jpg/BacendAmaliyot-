const Joi = require("joi");

const createCustomerCardValidationSchema = Joi.object({
    customer_id: Joi.string().optional(),
    name: Joi.string().min(2).max(100).optional(),
    phone: Joi.string().min(5).max(30).optional(),
    number: Joi.string().min(12).max(20).required(),
    year: Joi.string().optional(),
    month: Joi.string().optional(),
    is_active: Joi.boolean().optional(),
    is_main: Joi.boolean().optional(),
});

const updateCustomerCardValidationSchema = Joi.object({
    customer_id: Joi.string().optional(),
    name: Joi.string().min(2).max(100).optional(),
    phone: Joi.string().min(5).max(30).optional(),
    number: Joi.string().min(12).max(20).optional(),
    year: Joi.string().optional(),
    month: Joi.string().optional(),
    is_active: Joi.boolean().optional(),
    is_main: Joi.boolean().optional(),
});

module.exports = {
    createCustomerCardValidationSchema,
    updateCustomerCardValidationSchema,
};
