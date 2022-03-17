const errMessages = (errors) => {
    console.log(errors)
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
                err.message = `Pole powinno zawierać co najmniej ${err.local.limit} znak`;
                break;
            case "number.max":
                err.message = `Pole powinno zawierać co najwyżej ${err.local.limit} znak`;
                break;
            case "string.pattern.base":
                err.message = `Niepoprawne dane`;
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

const reservationSchema = Joi.object({
    lastname: Joi.string()
        .required().min(3).max(30).error(errMessages),
    phone_num: Joi
        .string().min(9).max(11).required().pattern(/^\d{3} ?\d{3} ?\d{3} ?$/).error(errMessages),
    rof: Joi.optional(),
    table_number: Joi.optional(),
    tableSeats: Joi.optional(),
    localization: Joi.optional(),
    reservation_start: Joi.optional(),
    reservation_end: Joi.optional(),
    table_ID: Joi.optional()

})

module.exports = reservationSchema;