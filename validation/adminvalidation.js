const Joi = require("joi");

const createAdminValidationSchema = Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    login: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(3).max(100).optional(),
    hashed_password: Joi.string().min(3).max(100).optional(),
    is_active: Joi.boolean().optional(),
    is_creator: Joi.boolean().optional(),
    hashed_refresh_token: Joi.string().optional(),
});

const updateAdminValidationSchema = Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    login: Joi.string().min(3).max(50).optional(),
    password: Joi.string().min(3).max(100).optional(),
    hashed_password: Joi.string().min(3).max(100).optional(),
    is_active: Joi.boolean().optional(),
    is_creator: Joi.boolean().optional(),
    hashed_refresh_token: Joi.string().optional(),
});

module.exports = {
    createAdminValidationSchema,
    updateAdminValidationSchema,
};
