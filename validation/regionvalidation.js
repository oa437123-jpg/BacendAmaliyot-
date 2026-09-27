const Joi = require("joi");

const createRegionValidationSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
});

const updateRegionValidationSchema = Joi.object({
    name: Joi.string().min(2).max(100).optional(),
});

module.exports = {
    createRegionValidationSchema,
    updateRegionValidationSchema,
};
