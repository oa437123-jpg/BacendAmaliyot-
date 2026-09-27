const Joi = require("joi");

const createTicketValidationSchema = Joi.object({
    event_id: Joi.string().optional(),
    seat_id: Joi.string().optional(),
    price: Joi.number().required(),
    service_fee: Joi.number().optional(),
    status_id: Joi.string().optional(),
    ticket_type_id: Joi.string().optional(),
});

const updateTicketValidationSchema = Joi.object({
    event_id: Joi.string().optional(),
    seat_id: Joi.string().optional(),
    price: Joi.number().optional(),
    service_fee: Joi.number().optional(),
    status_id: Joi.string().optional(),
    ticket_type_id: Joi.string().optional(),
});

module.exports = {
    createTicketValidationSchema,
    updateTicketValidationSchema,
};
