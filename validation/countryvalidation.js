const Joi = require("joi");

const createCountryValidationSchema = Joi.object({
    country_name: Joi.string().min(2).max(100).required(),
});

const updateCountryValidationSchema = Joi.object({
    country_name: Joi.string().min(2).max(100).optional(),
});

module.exports = {
    createCountryValidationSchema,
    updateCountryValidationSchema,
};
