const mongoose = require('mongoose')


const UserDBModel = mongoose.Schema({
    avatar: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true 
    },
    user_presence : {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    date_of_creation: {
        type: String,
        required: true
    }
})

const UserModel = mongoose.model('users', UserDBModel)

module.exports = UserModel