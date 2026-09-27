const Joi = require("joi");

const createVenueTypesValidationSchema = Joi.object({
    venue_id: Joi.string().required(),
    type_id: Joi.string().optional(),
});

const updateVenueTypesValidationSchema = Joi.object({
    venue_id: Joi.string().optional(),
    type_id: Joi.string().optional(),
});

module.exports = {
    createVenueTypesValidationSchema,
    updateVenueTypesValidationSchema,
};
