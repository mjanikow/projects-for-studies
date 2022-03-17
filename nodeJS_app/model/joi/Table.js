const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "Pole jest wymagane";
                break;
            case "string.min":
                err.message = `Pole powinno zawierać co najmniej ${err.local.limit} znaki`;
                break;
            case "string.max":
                err.message = `Pole powinno zawierać co najwyżej ${err.local.limit} znaki`;
                break;
            case "number.min":
                err.message = `Pole powinno zawierać jedną liczbę`;
                break;
            case "number.max":
                err.message = `Pole powinno zawierać jedną liczbę`;
                break;
            case "number.base":
                err.message = `Pole powinno zawierać liczbę`;
                break;
            default:
                break;
        }
    });
    return errors;
}



const Joi = require('joi');

const tableSchema = Joi.object({
    table_ID: Joi.number()
        .optional()
        .allow(""),
    table_number: Joi.string()
        .min(2).max(3).required()
        .error(errMessages),
    seats: Joi.number()
        .required().max(9)
        .error(errMessages),
    localization: Joi.string()
        .required().error(errMessages),
    rof: Joi.optional(),
    mus: Joi.optional(),
    spec: Joi.optional(),
    addons: Joi.optional()
})

module.exports = tableSchema;