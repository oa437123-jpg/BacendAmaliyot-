const Joi = require("joi");

const createSeatValidationSchema = Joi.object({
    sector_id: Joi.string().optional(),
    row_number: Joi.number().optional(),
    number: Joi.number().optional(),
    venue_id: Joi.string().optional(),
    seat_type_id: Joi.string().optional(),
    location_in_schema: Joi.string().min(1).max(50).required(),
});

const updateSeatValidationSchema = Joi.object({
    sector_id: Joi.string().optional(),
    row_number: Joi.number().optional(),
    number: Joi.number().optional(),
    venue_id: Joi.string().optional(),
    seat_type_id: Joi.string().optional(),
    location_in_schema: Joi.string().min(1).max(50).optional(),
});

module.exports = {
    createSeatValidationSchema,
    updateSeatValidationSchema,
};
