const { Router } = require("express");
const UserModel = require('../Models/UserDBModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require("fs");
const SaltRounds = 10;

const userAPI = Router()

userAPI.post('/users/newUserCreation', async(req, res) => {
    let newUserData = req.body
    try {
        const DoesUserAlreadyExists = await UserModel.findOne({username: newUserData.username})
        if (DoesUserAlreadyExists) {
            res.send({
                message: 'usernameTaken'
            })
        } else {
            newUserData.password = bcrypt.hashSync(newUserData.password, SaltRounds)
            const addUser = new UserModel(newUserData)
            const userData = await addUser.save()
            res.send({
                userData : userData,
                message : 'userCreated!'
            })
        }
    } catch (err) {
        console.error(`Error in newUserCreation API => ${err}`)
        res.send({
            message: 'ErrorTryAgain'
        })
    }
})

module.exports = userAPI