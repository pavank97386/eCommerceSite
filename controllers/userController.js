
const userSchema = require('../model/users')

const getUser = (req, res) => { 
    userSchema.find()
    .then(rep=>{
        res.send(rep)
        console.log("fetch User",rep)
    })
    .catch=(err)=>{
        console.log("getUser Error",err)
    }
  };
  
  const createUser = (req, res) => {
    const {name,age,email,password} = req.body
    const insertUser = new userSchema({
        name,
        age,
        email,password
    })
    insertUser.save()
    .then(response=>{
        res.send("success")
    })
    .catch=(err)=>{
        res.send(">>>",err)
    }
  };
  
  module.exports = {
    getUser,
    createUser,
  };