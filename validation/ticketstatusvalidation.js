const Joi = require("joi");

const createTicketStatusValidationSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
});

const updateTicketStatusValidationSchema = Joi.object({
    name: Joi.string().min(2).max(100).optional(),
});

module.exports = {
    createTicketStatusValidationSchema,
    updateTicketStatusValidationSchema,
};
