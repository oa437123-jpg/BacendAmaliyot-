const Joi = require("joi");

const createGenderValidationSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
});

const updateGenderValidationSchema = Joi.object({
    name: Joi.string().min(2).max(50).optional(),
});

module.exports = {
    createGenderValidationSchema,
    updateGenderValidationSchema,
};
