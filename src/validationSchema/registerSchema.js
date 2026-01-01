import Joi from "joi";

const registerSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export default registerSchema;
