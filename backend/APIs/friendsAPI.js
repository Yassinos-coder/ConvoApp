const { Router } = require("express");
const FriendsModel = require("../Models/FriendsDBModel");
const UserModel = require('../Models/UserDBModel')
const { Gate } = require("../Helpers/apiAUTH");
const friendAPI = Router();

friendAPI.post("/friends/AddFriend", Gate, async (req, res) => {
  let friendData = req.body;
  try {
    let newFriendDataWithId = await UserModel.findOne({username : friendData.friend})
    console.log(newFriendDataWithId)
    const DoesFriendAlreadyExist = await FriendsModel.findOne({owner: friendData.owner, friend: newFriendDataWithId._id});
    const DoesFriendAlreadyExistOtherSide = await FriendsModel.findOne({owner: newFriendDataWithId._id, friend: friendData.owner});
    if (DoesFriendAlreadyExist && DoesFriendAlreadyExistOtherSide) {
      res.send({ message: "friendExists" });
    } else if (DoesFriendAlreadyExist && !DoesFriendAlreadyExistOtherSide) {
        res.send({ message: "friendExists" });
    }else {
        const newFriendToAdd = new FriendsModel({owner: friendData.owner, friend: newFriendDataWithId._id})
        const newFriendToAddOtherSide = new FriendsModel({owner: newFriendDataWithId._id, friend: friendData.owner})
        await newFriendToAdd.save()
        await newFriendToAddOtherSide.save()
    }
  } catch (err) {
    console.error(`Error in AddFriend API ${err}`);
  }
});

module.exports = friendAPI