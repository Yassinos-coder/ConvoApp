const mongoose = require('mongoose')

const FriendsDBModel = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    friend: {
        type: mongoose.Types.ObjectId,
        required: true
    },
})

const FriendsModel = mongoose.model('FriendsList', FriendsDBModel)

module.exports = FriendsModel