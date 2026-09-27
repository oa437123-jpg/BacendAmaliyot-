const Joi = require("joi");

const createBookingValidationSchema = Joi.object({
    cart_id: Joi.string().required(),
    createdAt: Joi.string().optional(),
    finished: Joi.string().optional(),
    payment_method_id: Joi.string().optional(),
    delivery_method_id: Joi.string().optional(),
    discount_id: Joi.string().optional(),
    status_id: Joi.string().optional(),
});

const updateBookingValidationSchema = Joi.object({
    cart_id: Joi.string().optional(),
    createdAt: Joi.string().optional(),
    finished: Joi.string().optional(),
    payment_method_id: Joi.string().optional(),
    delivery_method_id: Joi.string().optional(),
    discount_id: Joi.string().optional(),
    status_id: Joi.string().optional(),
});

module.exports = {
    createBookingValidationSchema,
    updateBookingValidationSchema,
};
