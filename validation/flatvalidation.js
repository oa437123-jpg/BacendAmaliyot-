const Joi = require("joi");

const createFlatValidationSchema = Joi.object({
    etaj: Joi.number().optional(),
    condition: Joi.string().min(1).max(50).required(),
});

const updateFlatValidationSchema = Joi.object({
    etaj: Joi.number().optional(),
    condition: Joi.string().min(1).max(50).optional(),
});

module.exports = {
    createFlatValidationSchema,
    updateFlatValidationSchema,
};
