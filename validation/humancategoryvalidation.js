const Joi = require("joi");

const createHumanCategoryValidationSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    start_age: Joi.number().optional(),
    finish_age: Joi.number().optional(),
    gender_id: Joi.string().optional(),
});

const updateHumanCategoryValidationSchema = Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    start_age: Joi.number().optional(),
    finish_age: Joi.number().optional(),
    gender_id: Joi.string().optional(),
});

module.exports = {
    createHumanCategoryValidationSchema,
    updateHumanCategoryValidationSchema,
};
