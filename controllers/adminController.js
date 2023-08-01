const userSchema = require('../model/users')

const getAllUserDetails = async (req, res) => {
    try {
        const getAllUserData = await userSchema.find({}, { name: 1, age: 1, role: 1, _id: 0 })
        return res.send(getAllUserData)

    } catch (err) {
        console.log("something went wrong while getting user admin side")
    }
}

const deleteUserProfile = async (req, res) => {
    try {
        const { email } = req.body
        const user = await userSchema.findOne({ email })
        if (user !== null) {
            const response = await userSchema.deleteOne({ email })
            if (response.deletedCount > 0) {
                return res.send("profile removed successfully")
            }
            return res.send("something went wronf while removing")
        }
        return res.send("user not found")
    } catch (error) {
        console.log("error while user deletion ", error);
    }
}
module.exports = {
    getAllUserDetails,
    deleteUserProfile
}