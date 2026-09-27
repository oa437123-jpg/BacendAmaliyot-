const Joi = require("joi");

const createDiscountValidationSchema = Joi.object({
    discount: Joi.string().min(1).max(50).required(),
    finish_date: Joi.date().optional(),
});

const updateDiscountValidationSchema = Joi.object({
    discount: Joi.string().min(1).max(50).optional(),
    finish_date: Joi.date().optional(),
});

module.exports = {
    createDiscountValidationSchema,
    updateDiscountValidationSchema,
};
