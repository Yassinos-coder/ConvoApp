const { Router } = require("express");
const FriendsModel = require("../Models/FriendsDBModel");
const UserModel = require("../Models/UserDBModel");
const { Gate } = require("../Helpers/apiAUTH");
const friendAPI = Router();

friendAPI.post("/friends/AddFriend", Gate, async (req, res) => {
  let friendData = req.body;
  try {
    let newFriendDataWithId = await UserModel.findOne({
      username: friendData.friend,
    });
    let newFriendDataWithIdToTheOtherSide = await UserModel.findOne({
      _id: friendData.owner,
    });
    const DoesFriendAlreadyExist = await FriendsModel.findOne({
      owner: friendData.owner,
      friend: newFriendDataWithId._id,
    });
    const DoesFriendAlreadyExistOtherSide = await FriendsModel.findOne({
      owner: newFriendDataWithId._id,
      friend: friendData.owner,
    });
    if (DoesFriendAlreadyExist && DoesFriendAlreadyExistOtherSide) {
      res.send({ message: "friendExists" });
    } else if (DoesFriendAlreadyExist && !DoesFriendAlreadyExistOtherSide) {
      res.send({ message: "friendExists" });
    } else {
      const newFriendToAdd = new FriendsModel({
        owner: friendData.owner,
        friend: newFriendDataWithId._id,
        friendAvatar: newFriendDataWithId.avatar,
        friendUsername: newFriendDataWithId.username,
      });
      const newFriendToAddOtherSide = new FriendsModel({
        owner: newFriendDataWithId._id,
        friend: friendData.owner,
        friendAvatar: newFriendDataWithIdToTheOtherSide.avatar,
        friendUsername: newFriendDataWithIdToTheOtherSide.username,
      });
      await newFriendToAdd.save();
      await newFriendToAddOtherSide.save();
    }
  } catch (err) {
    console.warn(`Error in AddFriend API ${err}`);
  }
});

friendAPI.get('/friends/GetFriendList/:uuid', Gate, async(req, res) => {
  let uuid = req.params.uuid
  try {
    const FriendList = await FriendsModel.find({owner: uuid})
    res.send({
      userFriendList: FriendList,
      message: 'opSuccess'
    })
  } catch (err) {
    console.warn(`Error in GetFriendList API ${err}`)
    res.send({
      message: 'opFail'
    })
  }
})

module.exports = friendAPI;
