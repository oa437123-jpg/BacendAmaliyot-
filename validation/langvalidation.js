const Joi = require("joi");

const createLangValidationSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
});

const updateLangValidationSchema = Joi.object({
    name: Joi.string().min(2).max(50).optional(),
});

module.exports = {
    createLangValidationSchema,
    updateLangValidationSchema,
};
