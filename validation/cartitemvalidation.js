const Joi = require("joi");

const createCartItemValidationSchema = Joi.object({
    cart_id: Joi.string().required(),
    ticket_id: Joi.string().optional(),
});

const updateCartItemValidationSchema = Joi.object({
    cart_id: Joi.string().optional(),
    ticket_id: Joi.string().optional(),
});

module.exports = {
    createCartItemValidationSchema,
    updateCartItemValidationSchema,
};
