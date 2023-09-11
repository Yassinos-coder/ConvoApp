const { Router } = require("express");
const UserModel = require('../Models/UserDBModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require("fs");
const SaltRounds = 10;
const {Gate} = require('../Helpers/apiAUTH')

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
            newUserData.username = newUserData.username.toLowerCase()
            newUserData.email = newUserData.email.toLowerCase()
            newUserData.password = bcrypt.hashSync(newUserData.password, SaltRounds)
            fs.mkdirSync(`./uploads/userData/${newUserData.username}`, {recursive:true})
            const addUser = new UserModel(newUserData)
            const userData = await addUser.save()
            res.send({
                userData : userData,
                message : 'userCreated!'
            })
        }
    } catch (err) {
        console.warn(`Error in newUserCreation API => ${err}`)
        res.send({
            message: 'ErrorTryAgain'
        })
    }
})

userAPI.post('/users/login', async(req,res) => {
    let loginData = req.body
    try {
        const  DoesUserAlreadyExists = await UserModel.findOne({username: loginData.username})
        if (DoesUserAlreadyExists) {
            let result = bcrypt.compareSync(loginData.password, DoesUserAlreadyExists.password)
            let userToken = jwt.sign(DoesUserAlreadyExists.date_of_creation, process.env.SECRET_SERVICE)
            if (result) {
                await UserModel.updateOne({_id: DoesUserAlreadyExists._id}, {user_presence: 'Online'})
                res.send({
                    userData: DoesUserAlreadyExists,
                    giveAccess: result,
                    userToken : userToken, 
                })
            } else {
                res.send({message: 'wrongPass!'})
            }
        } else {
            res.send({
                message: 'userNoExist'
            })
        }

    } catch (err) {
        console.warn(`Error in Login API ${err}`)
        res.send({
            message:'ErrorTryAgain'
        })
    }
})

userAPI.post('/users/changeStatus/:uuid', Gate ,async(req, res) => {
    let uuid = req.params.uuid
    try {
        await UserModel.updateOne({_id: uuid}, {user_presence: 'Offline'})
        res.send({message: 'OpSuccess'})
    } catch (err) {
        console.warn(`Error in changeStatus API ${err} `)
        res.send({message: 'OpFailed'})
    }
})

userAPI.get('/users/GetUserStatus/:username', Gate, async(req, res) => {
    let username = req.params.uuid
    try {
        const result = await UserModel.findOne({username: username})
        res.send({
            message: 'opSuccess',
            userStatus : result.user_presence
        })
    } catch (err) {
        console.warn(`Error in GetUserStatus API ${err}`)
    }
})

userAPI.get('/users/GetAllUsers', Gate, async(req, res) => {
    try {
        const result = await UserModel.find({}, '_id user_presence');
        res.send({
            message: 'opSuccess',
            AllUsers: result
        })        
    } catch (err) {
        console.warn(`Error in GetAllUsers API ${err}`)
    }
})

module.exports = userAPI