const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        validate:{
            validator:function(value){
                return value >= 18 && value<= 100;
            },
            messgae:'Age should be btw 18 to 100'
        }
    },
      email: {
        type: String,
        required: true, 
    },
    password: {
        type: String,
        required: true,
    },
    role:{
        type:String,
        required:true,
        enum:['admin','user']
    }
})

const users = mongoose.model('Users',userSchema);
module.exports = users
 