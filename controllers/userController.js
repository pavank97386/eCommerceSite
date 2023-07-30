
const userSchema = require('../model/users')
const otp_users = require('../model/otp_user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { createHashPassword } = require('../util/userFunctions')

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
        const { name, age, email, password,role } = req.body
        const userFound = await userSchema.findOne({ email: email })
        if (userFound) {
            res.send("user already exist")
        }
        const encryptPassword = await createHashPassword(password)

        const insertUser = new userSchema({
            name,
            age,
            email,
            password: encryptPassword,
            role:role || "user"
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
        res.send(err)
        console.log("Error while create user", err)
    }

};

const updateUser = async (req, res) => {
    try {

    } catch (err) {
        console.log(">>>failed to update ")
    }
}

const updatePassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        if (!otp) {
            res.send("otp missing")
        }
        otp_users.findOneAndDelete({ email: email, otp: otp })
            .then(async resp => {
                if (resp == null) {
                    return res.send("invalid otp")
                }
                const hashedPassword = await createHashPassword(newPassword) 
                const response = await userSchema.updateOne({ email }, { $set: { password: hashedPassword } })
                if (response.modifiedCount > 0) {
                    res.send("password updated successfully")
                } else {
                    res.send("Something went wrong while updating password")
                }

            })


    } catch (err) {
        console.log("error password updated", err)
    }
}

const genOtp = async (req, res) => {
    []
    try {
        const email = req.params.emailId
        otp_users.findOne({ email: email })
            .then(resp => {
                if (!resp && resp == null) {
                    const otp = Math.floor(100000 + Math.random(100000) * 100000)
                    const saveOtp = new otp_users({ email, otp })
                    saveOtp.save()
                        .then(resp => {
                            res.send("otp gen successfully")
                            console.log("saved >>>", resp)
                        })
                        .catch(err => {
                            console.log("errr genotp", err)
                        })
                } else {
                    console.log("already otp geneated and stored ")
                    res.send("already otp geneated and stored ")
                }
            }).catch(err => {
                console.log(">>>>>>>>>>>>>>getOtp", err)
            })


    }
    catch (err) {
        console.log(">>>>>>>>>otp gen", err)
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
        const token = jwt.sign({ email: userFound.email, name: userFound.name,role:userFound.role|| "user" }, process.env.SECRET, { expiresIn: '1h' })
        res.json(token)
    }
    catch (err) {
        console.log("errr", err)
    }
}

const getAllOtp = async (req, res) => {
    try {
        otp_users.find()
            .then(resp => {
                res.send(resp)
            }).catch(err => {
                console.log(">>>>>>>>>", err)
            })
    } catch (err) {
        console.log(">>>>>>>>>>>fetch all otp", err)
    }
}

module.exports = {
    getUser,
    createUser,
    login,
    updateUser,
    genOtp,
    updatePassword,
    getAllOtp
};