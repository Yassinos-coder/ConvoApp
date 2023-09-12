const mongoose = require('mongoose')

const MessageDBModel = mongoose.Schema({
    from: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    to: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date_of_message: {
        type: String,
        required: true
    }
})

const MessageModel = mongoose.model('usersMessages', MessageDBModel)

module.exports = MessageModel