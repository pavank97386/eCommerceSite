const userSchema = require('../model/users')

const getAllUserDetails = async (req,res)=>{
        try{
            const getAllUserData = await userSchema.find({},{name:1,age:1,role:1,_id:0})
            return res.send(getAllUserData)
             
        }catch(err){
            console.log("something went wrong while getting user admin side")
        }
}

module.exports = {
    getAllUserDetails   
}