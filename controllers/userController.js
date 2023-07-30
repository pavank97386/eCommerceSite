
const userSchema = require('../model/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getUser = (req, res) => {
    userSchema.find()
        .then(rep => {
            res.send(rep)
            console.log("fetch User", rep)
        })
        .catch = (err) => {
            console.log("getUser Error", err)
        }
};

const createUser = async (req, res) => {
    try {
        const { name, age, email, password } = req.body
        const userFound = await userSchema.findOne({ email: email })
        if (userFound) {
            res.send("user already exist")
        }
        const encryptPassword = await bcrypt.hash(password, 10)

        const insertUser = new userSchema({
            name,
            age,
            email,
            password: encryptPassword
        })
        insertUser.save()
            .then(response => {
                res.send("success")
            })
            .catch = (err) => {
                res.send(">>>", err)
            }
    }
    catch (err) {
        console.log("Error while create user", err)
    }

};

const updateUser = async(req,res)=>{
    try{

    }catch(err){
        console.log(">>>failed to update ")
    }
}
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userFound = await userSchema.findOne({ email: email })
        if (!userFound) {
            res.send("userNotFound")
        }
        const passwordCheck = await bcrypt.compare(password, userFound.password)
        if (!passwordCheck) {
            res.send("password missmatched")
        }
        const token = jwt.sign({ email: userFound.email, name: userFound.name }, process.env.SECRET, { expiresIn: '1h' })
        res.json(token)
    }
    catch (err) {
        console.log("errr", err)
    }
}

module.exports = {
    getUser,
    createUser,
    login,
    updateUser
};