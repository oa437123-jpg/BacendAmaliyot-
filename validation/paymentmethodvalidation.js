const Joi = require("joi");

const createPaymentMethodValidationSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
});

const updatePaymentMethodValidationSchema = Joi.object({
    name: Joi.string().min(2).max(100).optional(),
});

module.exports = {
    createPaymentMethodValidationSchema,
    updatePaymentMethodValidationSchema,
};
