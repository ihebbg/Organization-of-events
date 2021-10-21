const Joi = require('joi')

const validation_event = (data) => {
    const schemaevent = Joi.object({
        name_evenement: Joi.string().min(3).required(),
        type: Joi.string().required(),
        participants_number: Joi.number().required(),
        date_evenement: Joi.date().required(),
        commentaire: Joi.string(),
        place: Joi.string().required(),
        salle: Joi.string(),
        city: Joi.string(),
        adress: Joi.string(),
    }).options({ allowUnknown: true })
    return schemaevent.validate(data)
}
module.exports = { validation_event }
