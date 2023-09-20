const { Router } = require("express");
const UserModel = require("../Models/UserDBModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const SaltRounds = 10;
const { Gate } = require("../Helpers/apiAUTH");
const FriendsModel = require("../Models/FriendsDBModel");

const userAPI = Router();

userAPI.post("/users/newUserCreation", async (req, res) => {
  let newUserData = req.body;
  newUserData.username = newUserData.username.toLowerCase();
  try {
    const DoesUserAlreadyExists = await UserModel.findOne({
      username: newUserData.username, // Removed $eq here
    });
    if (DoesUserAlreadyExists) {
      res.send({
        message: "usernameTaken",
      });
    } else {
      newUserData.username = newUserData.username.toLowerCase();
      newUserData.email = newUserData.email.toLowerCase();
      newUserData.password = bcrypt.hashSync(newUserData.password, SaltRounds);
      fs.mkdirSync(`./uploads/userData/${newUserData.username}`, {
        recursive: true,
      });
      const addUser = new UserModel(newUserData);
      const userData = await addUser.save();
      res.send({
        userData: userData,
        message: "userCreated!",
      });
    }
  } catch (err) {
    console.warn(`Error in newUserCreation API => ${err}`);
    res.send({
      message: "ErrorTryAgain",
    });
  }
});

userAPI.post("/users/login", async (req, res) => {
  let loginData = req.body;
  loginData.username = loginData.username.toLowerCase();
  try {
    const DoesUserAlreadyExists = await UserModel.findOne({
      username: loginData.username, // Removed $eq here
    });
    if (DoesUserAlreadyExists) {
      let result = bcrypt.compareSync(
        loginData.password,
        DoesUserAlreadyExists.password
      );
      let userToken = jwt.sign(
        DoesUserAlreadyExists.date_of_creation,
        process.env.SECRET_SERVICE
      );
      if (result) {
        await UserModel.updateOne(
          { _id: DoesUserAlreadyExists._id },
          { user_presence: "Online" }
        );
        res.send({
          userData: DoesUserAlreadyExists,
          giveAccess: result,
          userToken: userToken,
        });
      } else {
        res.send({ message: "wrongPass!" });
      }
    } else {
      res.send({
        message: "userNoExist",
      });
    }
  } catch (err) {
    console.warn(`Error in Login API ${err}`);
    res.send({
      message: "ErrorTryAgain",
    });
  }
});

userAPI.post("/users/changeStatus/:uuid", Gate, async (req, res) => {
  let uuid = req.params.uuid;
  try {
    await UserModel.updateOne({ _id: uuid }, { user_presence: "Offline" });
    res.send({ message: "OpSuccess" });
  } catch (err) {
    console.warn(`Error in changeStatus API ${err} `);
    res.send({ message: "OpFailed" });
  }
});

userAPI.get("/users/GetUserStatus/:username", Gate, async (req, res) => {
  let username = req.params.username;
  try {
    const result = await UserModel.findOne({ username: username });
    res.send({
      message: "opSuccess",
      userStatus: result.user_presence,
    });
  } catch (err) {
    console.warn(`Error in GetUserStatus API ${err}`);
  }
});

userAPI.get("/users/GetAllUsers", async (req, res) => {
  try {
    const result = await UserModel.find({}, "_id user_presence");
    res.send({
      message: "opSuccess",
      AllUsers: result,
    });
  } catch (err) {
    console.warn(`Error in GetAllUsers API ${err}`);
  }
});

userAPI.get("/users/DeleteAvatar/:userid", Gate, async (req, res) => {
  let uuid = req.params.userid;
  try {
    await UserModel.updateOne({ _id: uuid }, { avatar: "none" });
    res.send({ message: "opSuccess" });
  } catch (err) {
    console.warn(`Error in DeleteAvatar API ${err}`);
  }
});

userAPI.get("/users/DeleteAccount/:uuid", Gate, async (req, res) => {
  let uuid = req.params.uuid;
  try {
    const userData = await UserModel.findOne({ _id: uuid });
    await FriendsModel.deleteMany({
      $or: [{ owner: uuid }, { friend: uuid }],
    });
    await UserModel.deleteOne({ _id: uuid });
    let path = `./uploads/userData/${userData.username}`;
    fs.rmSync(path, { recursive: true, force: true });
    res.send({ message: "opSuccess" });
  } catch (err) {
    console.warn(`Error in DeleteAccount API ${err}`);
    res.send({ message: "opFail" });
  }
});

userAPI.post("/users/UpdateProfilePicture/:uuid", Gate, async (req, res) => {
  let uuid = req.params.uuid;
  let newPicture = req.files.picture;
  try {
    const userData = await UserModel.findOne({ _id: uuid });
    const dirUserpath = `./uploads/userData/${userData.username}/`;
    if (!fs.existsSync(dirUserpath)) {
      fs.mkdirSync(dirUserpath);
    }
    let SplitnewPictureName = newPicture.name.split(".");
    SplitnewPictureName = `${userData._id}.${SplitnewPictureName[1]}`;
    newPicture.name = SplitnewPictureName;
    let saveToPath = `./uploads/userData/${userData.username}/${newPicture.name}`;
    newPicture.mv(saveToPath, async (err) => {
      if (err) {
        console.error(`Error in mv Func ${err}`);
        res.send({
          message: "opFail",
        });
      } else {
        await UserModel.updateOne({ _id: uuid }, { avatar: newPicture.name });
        await FriendsModel.updateOne(
          { friend: uuid },
          { friendAvatar: newPicture.name }
        );
        const userDataUpdated = await UserModel.findOne({ _id: uuid });
        res.send({
          userData: userDataUpdated,
          message: "opSuccess",
        });
      }
    });
  } catch (err) {
    console.warn(`Error in UpdateProfilePicture API ${err}`);
    res.send({ message: "opFail" });
  }
});

userAPI.post("/users/UpdateUsername/:uuid", Gate, async (req, res) => {
  let uuid = req.params.uuid;
  let username = req.body;
  username.username = username.username.toLowerCase();
  try {
    await UserModel.updateOne(
      { _id: { $eq: uuid } }, // Correct usage of $eq for comparison
      { username: username.username }
    );
    const newUserDataAfterUpdate = await UserModel.findOne({ _id: uuid });
    res.send({
      userData: newUserDataAfterUpdate,
      message: "opSuccess",
    });
  } catch (err) {
    console.warn(`Error in UpdateUsername API ${err}`);
    res.send({
      message: "opFail",
    });
  }
});

userAPI.post("/users/UpdateEmail/:uuid", Gate, async (req, res) => {
  let uuid = req.params.uuid;
  let email = req.body;
  try {
    await UserModel.updateOne({ _id: { $eq: uuid } }, { email: email.email });
    const newUserDataAfterUpdate = await UserModel.findOne({
      _id: { $eq: uuid },
    });
    res.send({
      userData: newUserDataAfterUpdate,
      message: "opSuccess",
    });
  } catch (err) {
    console.warn(`Error in UpdateEmail API ${err}`);
    res.send({
      message: "opFail",
    });
  }
});

userAPI.post("/users/UpdatePassword/:uuid", Gate, async (req, res) => {
  let uuid = req.params.uuid;
  let password = req.body;
  try {
    password = bcrypt.hashSync(password, SaltRounds);
    await UserModel.updateOne(
      { _id: { $eq: uuid } }, // Correct usage of $eq for comparison
      { password: password.password }
    );
    const newUserDataAfterUpdate = await UserModel.findOne({
      _id: { $eq: uuid },
    });
    res.send({
      userData: newUserDataAfterUpdate,
      message: "opSuccess",
    });
  } catch (err) {
    console.warn(`Error in UpdatePassword API ${err}`);
    res.send({
      message: "opFail",
    });
  }
});

module.exports = userAPI;
