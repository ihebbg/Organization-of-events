const mongoose = require('mongoose')
const schema = mongoose.Schema

const user_schema = new schema({
    full_name: {
        type: String,
        // required: true,
    },
    email: {
        type: String,
        // required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    confpassword: {
        type: String,
        required: true,
    },
})
module.exports = mongoose.model('users', user_schema)
