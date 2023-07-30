const mongoose = require('mongoose')

const otp_user_schema = new mongoose.Schema({
    otp:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    }
})

const otp_users =  mongoose.model('Otp_users',otp_user_schema)

module.exports= otp_users;