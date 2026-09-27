const Joi = require("joi");

const createCartValidationSchema = Joi.object({
    customer_id: Joi.string().required(),
    createdAt: Joi.string().optional(),
    finishedAt: Joi.string().optional(),
    status_id: Joi.string().optional(),
});

const updateCartValidationSchema = Joi.object({
    customer_id: Joi.string().optional(),
    createdAt: Joi.string().optional(),
    finishedAt: Joi.string().optional(),
    status_id: Joi.string().optional(),
});

module.exports = {
    createCartValidationSchema,
    updateCartValidationSchema,
};
