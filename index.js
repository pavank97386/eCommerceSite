const express = require('express');
const app = express()
require('dotenv').config()
const connectDb = require('./config/db');
const port = process.env.PORT || 3000
const users = require('./routes/users')
const admin = require('./routes/admin')

app.use(express.json())

app.use('/users', users);
app.use('/admin',admin)


const connectServer = async () => {
    try {
        await connectDb();
        app.listen(port, () => {
            console.log("started", port)
        })
    }
    catch (err) {
        console.log(">>>>>>>>>>>", err)
    }
}

connectServer()
