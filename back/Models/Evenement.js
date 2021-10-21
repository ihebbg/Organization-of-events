const mongoose = require('mongoose')
require('../Models/User')
const schema = mongoose.Schema
const evenement_schema = new schema({
    name_evenement: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    participants_number: {
        type: Number,
        required: true,
    },
    date_evenement: {
        type: Date,
        required: true,
    },
    commentaire: {
        type: String,
    },
    place: {
        type: String,
        required: true,
    },
    salle: {
        type: String,
        // required: true,
    },
    city: {
        type: String,
    },
    adress: {
        type: String,
    },

    User: {
        type: schema.Types.ObjectId,
        ref: 'users',
    },
})
module.exports = mongoose.model('evenements', evenement_schema)
