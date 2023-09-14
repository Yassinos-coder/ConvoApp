const { Router } = require("express");
const { Gate } = require("../Helpers/apiAUTH");
const MessageModel = require("../Models/MessageDBModel");

const messageAPI = Router();

messageAPI.get("/dms/GetMessages/:from/:to", Gate, async (req, res) => {
  let from = req.params.from;
  let to = req.params.to;
  try {
    const messagesData = await MessageModel.find({
      $or: [
        { from: from, to: to },
        { from: to, to: from },
      ],
    });
    res.send({
      messagesData: messagesData,
      message: "opSuccess",
    });
  } catch (err) {
    console.warn(`Error in GetMessages API ${err}`);
    res.send({
      message: "opFail",
    });
  }
});

messageAPI.post("/dms/SendMessage", Gate, async (req, res) => {
  let dataDM = req.body;
  try {
    const newMessage = new MessageModel(dataDM);
    const newMessageData = await newMessage.save();
    res.send({
      newMessageData: newMessageData,
      message: "opSuccess",
    });
  } catch (err) {
    console.warn(`Error in SendMessage API ${err}`);
    res.send({
      message: "opFail",
    });
  }
});

messageAPI.post("/dms/purgeData", Gate, async (req, res) => {
  let purgeData = req.body;
  try {
    const newMessagesAfterPurge = await MessageModel.deleteMany({
      $or: [
        { from: purgeData.from, to: purgeData.to },
        { from: purgeData.to, to: purgeData.from },
      ],
    });
    res.send({
      newMessagesAfterPurge: newMessagesAfterPurge,
      message: "opSuccess",
    });
  } catch (err) {
    console.warn(`Error in purgeData API ${err}`);
    res.send({
      message: "opFail",
    });
  }
});

module.exports = messageAPI;
