const Joi = require("joi");

const createSectorValidationSchema = Joi.object({
    sector_name: Joi.string().min(2).max(100).required(),
});

const updateSectorValidationSchema = Joi.object({
    sector_name: Joi.string().min(2).max(100).optional(),
});

module.exports = {
    createSectorValidationSchema,
    updateSectorValidationSchema,
};
