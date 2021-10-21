const Joi = require('joi')

const registervalidation = (data) => {
    const shemaregister = Joi.object({
        full_name: Joi.string().min(3).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(8).required(),
        confpassword: Joi.string().min(8).required(),
    })
    return shemaregister.validate(data)
}

const loginvalidation = (data) => {
    const schemalogin = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string()
            .min(8)
            .required()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    })
    return schemalogin.validate(data)
}
module.exports = { registervalidation, loginvalidation }
