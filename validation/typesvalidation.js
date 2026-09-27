const Joi = require("joi");

const createTypesValidationSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
});

const updateTypesValidationSchema = Joi.object({
    name: Joi.string().min(2).max(100).optional(),
});

module.exports = {
    createTypesValidationSchema,
    updateTypesValidationSchema,
};
