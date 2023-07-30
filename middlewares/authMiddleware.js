const jwt = require('jsonwebtoken')

const authenticateToken = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    jwt.verify(token.split(" ")[1], process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "invalid token" })
        }
        req.userID = decoded.name
        next()
    })
}

module.exports = ({
    authenticateToken
})