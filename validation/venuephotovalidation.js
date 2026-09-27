const Joi = require("joi");

const createVenuePhotoValidationSchema = Joi.object({
    venue_id: Joi.string().optional(),
    url: Joi.string().min(5).max(500).required(),
});

const updateVenuePhotoValidationSchema = Joi.object({
    venue_id: Joi.string().optional(),
    url: Joi.string().min(5).max(500).optional(),
});

module.exports = {
    createVenuePhotoValidationSchema,
    updateVenuePhotoValidationSchema,
};
