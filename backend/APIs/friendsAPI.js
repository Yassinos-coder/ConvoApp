const { Router } = require("express");
const FriendsModel = require("../Models/FriendsDBModel");
const UserModel = require("../Models/UserDBModel");
const { Gate } = require("../Helpers/apiAUTH");
const friendAPI = Router();

friendAPI.post("/friends/AddFriend", Gate, async (req, res) => {
  let friendData = req.body;
  try {
    // Below we get the userData for the friend
    let newFriendDataWithId = await UserModel.findOne({
      username: friendData.friend,
    });
    // Below we get the userData of the user that added that friend
    let newFriendDataWithIdToTheOtherSide = await UserModel.findOne({
      _id: friendData.owner,
    });
    // Below we check if they are already friends
    const DoesFriendAlreadyExist = await FriendsModel.findOne({
      owner: friendData.owner,
      friend: newFriendDataWithId._id,
    });
    // The check must be done
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
    const userFriendList = await FriendsModel.findOne({
      owner: friendData.owner,
      friend: newFriendDataWithId._id
    });
    res.send({
      userFriendList: userFriendList,
      message: "opSuccess",
    });
  } catch (err) {
    console.warn(`Error in AddFriend API ${err}`);
  }
});

friendAPI.get("/friends/GetFriendList/:uuid", Gate, async (req, res) => {
  let uuid = req.params.uuid;
  try {
    const FriendList = await FriendsModel.find({
      owner: uuid,
    });
    res.send({
      userFriendList: FriendList,
      message: "opSuccess",
    });
  } catch (err) {
    console.warn(`Error in GetFriendList API ${err}`);
    res.send({
      message: "opFail",
    });
  }
});

friendAPI.get("/friends/DeleteAllFriends/:userid", Gate, async (req, res) => {
  let uuid = req.params.userid;
  try {
    await FriendsModel.deleteMany({ $or: [{ owner: uuid }, { friend: uuid }] });
    res.send({
      message: "opSuccess",
    });
  } catch (err) {
    console.warn(`Error in DeleteFriends API ${err}`);
    res.send({
      message: "opFail",
    });
  }
});

module.exports = friendAPI;
