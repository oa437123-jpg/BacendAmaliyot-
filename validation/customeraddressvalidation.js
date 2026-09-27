const Joi = require("joi");

const createCustomerAddressValidationSchema = Joi.object({
    customer_id: Joi.string().optional(),
    name: Joi.string().min(2).max(100).required(),
    region_id: Joi.string().optional(),
    district_id: Joi.string().optional(),
    street: Joi.string().min(2).max(100).optional(),
    house: Joi.string().optional(),
    flat_id: Joi.string().optional(),
    location: Joi.string().optional(),
    post_index: Joi.string().optional(),
    info: Joi.string().optional(),
});

const updateCustomerAddressValidationSchema = Joi.object({
    customer_id: Joi.string().optional(),
    name: Joi.string().min(2).max(100).optional(),
    region_id: Joi.string().optional(),
    district_id: Joi.string().optional(),
    street: Joi.string().min(2).max(100).optional(),
    house: Joi.string().optional(),
    flat_id: Joi.string().optional(),
    location: Joi.string().optional(),
    post_index: Joi.string().optional(),
    info: Joi.string().optional(),
});

module.exports = {
    createCustomerAddressValidationSchema,
    updateCustomerAddressValidationSchema,
};
