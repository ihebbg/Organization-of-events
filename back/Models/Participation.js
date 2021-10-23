const mongoose = require('mongoose')
const schema = mongoose.Schema
require('./User')
require('./Evenement')
const participation_schema = new schema({
    user: {
        type: schema.Types.ObjectId,
        ref: 'users',
    },
    evenement: {
        type: schema.Types.ObjectId,
        ref: 'evenements',
    },
})
module.exports = mongoose.model('participations', participation_schema)
