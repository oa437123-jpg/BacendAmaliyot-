const Joi = require("joi");

const createDistrictValidationSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    region_id: Joi.string().optional(),
});

const updateDistrictValidationSchema = Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    region_id: Joi.string().optional(),
});

module.exports = {
    createDistrictValidationSchema,
    updateDistrictValidationSchema,
};
