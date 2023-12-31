const mongoose = require('mongoose')

const FriendsDBModel = mongoose.Schema({
    owner: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    friend: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    friendAvatar: {
        type: String,
        required: true
    },
    friendUsername : {
        type: String,
        required: true
    },
})

const FriendsModel = mongoose.model('FriendsList', FriendsDBModel)

module.exports = FriendsModel