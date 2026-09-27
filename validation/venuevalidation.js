const Joi = require("joi");

const createVenueValidationSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    address: Joi.string().min(3).max(200).optional(),
    location: Joi.string().optional(),
    site: Joi.string().optional(),
    phone: Joi.string().min(5).max(30).optional(),
    schema: Joi.string().optional(),
    region_id: Joi.string().optional(),
    district_id: Joi.string().optional(),
});

const updateVenueValidationSchema = Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    address: Joi.string().min(3).max(200).optional(),
    location: Joi.string().optional(),
    site: Joi.string().optional(),
    phone: Joi.string().min(5).max(30).optional(),
    schema: Joi.string().optional(),
    region_id: Joi.string().optional(),
    district_id: Joi.string().optional(),
});

module.exports = {
    createVenueValidationSchema,
    updateVenueValidationSchema,
};
