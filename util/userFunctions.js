const bcrypt = require('bcrypt')


exports.createHashPassword = async (password) => {
    return await bcrypt.hash(password, 10)
}