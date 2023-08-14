import Joi from "joi";

export const serviceSchema = Joi.object({
    name: Joi.string().trim().required(),
    description: Joi.string().trim().min(60).required(), 
    price: Joi.number().positive().required(),
    url: Joi.array().items(Joi.string().uri().required()).required(), 
    fk_category_id: Joi.array().items(Joi.number().positive().required()).required()
})


export const activeServiceSchema = Joi.object({
    active: Joi.boolean().required(),
    service_id: Joi.number().positive().required()
})