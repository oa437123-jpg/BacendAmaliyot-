const Joi = require("joi");

const createEventTypeValidationSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    parent_event_type_id: Joi.string().optional(),
});

const updateEventTypeValidationSchema = Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    parent_event_type_id: Joi.string().optional(),
});

module.exports = {
    createEventTypeValidationSchema,
    updateEventTypeValidationSchema,
};
