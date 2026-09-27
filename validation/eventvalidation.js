const Joi = require("joi");

const createEventValidationSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    photo: Joi.string().optional(),
    start_date: Joi.date().optional(),
    start_time: Joi.string().optional(),
    finish_date: Joi.date().optional(),
    finish_time: Joi.string().optional(),
    info: Joi.string().optional(),
    event_type_id: Joi.string().optional(),
    human_category_id: Joi.string().optional(),
    venue_id: Joi.string().optional(),
    lang_id: Joi.string().optional(),
    release_date: Joi.date().optional(),
});

const updateEventValidationSchema = Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    photo: Joi.string().optional(),
    start_date: Joi.date().optional(),
    start_time: Joi.string().optional(),
    finish_date: Joi.date().optional(),
    finish_time: Joi.string().optional(),
    info: Joi.string().optional(),
    event_type_id: Joi.string().optional(),
    human_category_id: Joi.string().optional(),
    venue_id: Joi.string().optional(),
    lang_id: Joi.string().optional(),
    release_date: Joi.date().optional(),
});

module.exports = {
    createEventValidationSchema,
    updateEventValidationSchema,
};
