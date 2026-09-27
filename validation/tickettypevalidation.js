const Joi = require("joi");

const createTicketTypeValidationSchema = Joi.object({
    ticket_type: Joi.string().min(2).max(50).required(),
    name: Joi.string().min(2).max(100).optional(),
    color: Joi.string().min(2).max(50).optional(),
});

const updateTicketTypeValidationSchema = Joi.object({
    ticket_type: Joi.string().min(2).max(50).optional(),
    name: Joi.string().min(2).max(100).optional(),
    color: Joi.string().min(2).max(50).optional(),
});

module.exports = {
    createTicketTypeValidationSchema,
    updateTicketTypeValidationSchema,
};
