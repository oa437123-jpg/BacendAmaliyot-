const Joi = require("joi");

const createSeatTypeValidationSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
});

const updateSeatTypeValidationSchema = Joi.object({
    name: Joi.string().min(2).max(100).optional(),
});

module.exports = {
    createSeatTypeValidationSchema,
    updateSeatTypeValidationSchema,
};
