import Joi from "joi";

export const signUpSchema = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().email().trim().required(),
    password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).trim().required(),
    tp_user: Joi.number().positive().required(),
    phone: Joi.string().trim().required(),
    postcode: Joi.number().min(8).required(),
    city: Joi.required()
});

export const loginSchema = Joi.object({
    email: Joi.string().email().trim().required(),
    password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).trim().required()
})