const Joi = require("joi");

const createDeliveryMethodValidationSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
});

const updateDeliveryMethodValidationSchema = Joi.object({
    name: Joi.string().min(2).max(100).optional(),
});

module.exports = {
    createDeliveryMethodValidationSchema,
    updateDeliveryMethodValidationSchema,
};
